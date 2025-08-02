// server/index.ts
import { config } from "dotenv";
import path4 from "path";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { mysqlTable, varchar, int, datetime } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  service: text("service"),
  budget: text("budget"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var contactSubmissionsMySQL = mysqlTable("contact_submissions", {
  id: int("id").primaryKey().autoincrement(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 200 }),
  service: varchar("service", { length: 100 }),
  budget: varchar("budget", { length: 50 }),
  message: text("message").notNull(),
  createdAt: datetime("created_at").default(/* @__PURE__ */ new Date()).notNull()
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true
});
var insertContactSubmissionMySQLSchema = createInsertSchema(contactSubmissionsMySQL).omit({
  id: true,
  createdAt: true
});

// server/storage.ts
import { drizzle as drizzlePg } from "drizzle-orm/neon-http";
import { drizzle as drizzleMysql } from "drizzle-orm/mysql2";
import { neon } from "@neondatabase/serverless";
import mysql from "mysql2/promise";
import { desc } from "drizzle-orm";
import fs from "fs";
import path from "path";
var PostgreSQLStorage = class {
  db;
  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    const sql = neon(process.env.DATABASE_URL);
    this.db = drizzlePg(sql);
  }
  async createContactSubmission(insertSubmission) {
    const [submission] = await this.db.insert(contactSubmissions).values(insertSubmission).returning();
    return submission;
  }
  async getContactSubmissions() {
    const submissions = await this.db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
    return submissions;
  }
};
var MySQLStorage = class {
  db;
  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    const url = new URL(process.env.DATABASE_URL);
    const connection = mysql.createConnection({
      host: url.hostname,
      port: parseInt(url.port) || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1)
      // Remove leading slash
    });
    this.db = drizzleMysql(connection);
  }
  async createContactSubmission(insertSubmission) {
    const result = await this.db.insert(contactSubmissionsMySQL).values({
      firstName: insertSubmission.firstName,
      lastName: insertSubmission.lastName,
      email: insertSubmission.email,
      company: insertSubmission.company || null,
      service: insertSubmission.service || null,
      budget: insertSubmission.budget || null,
      message: insertSubmission.message,
      createdAt: /* @__PURE__ */ new Date()
    });
    const [insertedRecord] = await this.db.select().from(contactSubmissionsMySQL).orderBy(desc(contactSubmissionsMySQL.id)).limit(1);
    return insertedRecord;
  }
  async getContactSubmissions() {
    const submissions = await this.db.select().from(contactSubmissionsMySQL).orderBy(desc(contactSubmissionsMySQL.createdAt));
    return submissions;
  }
};
var MemStorage = class {
  submissions;
  users;
  // email -> user object
  currentId;
  dataFile = "./data/contacts.json";
  usersFile = "./data/users.json";
  constructor() {
    this.submissions = /* @__PURE__ */ new Map();
    this.users = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.loadFromFile();
    this.loadUsers();
  }
  loadFromFile() {
    try {
      const dataDir = path.dirname(this.dataFile);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      if (fs.existsSync(this.dataFile)) {
        const data = JSON.parse(fs.readFileSync(this.dataFile, "utf8"));
        this.currentId = data.currentId || 1;
        const submissions = data.submissions || [];
        for (const submission of submissions) {
          submission.createdAt = new Date(submission.createdAt);
          this.submissions.set(submission.id, submission);
        }
        console.log(`\u{1F4C1} Loaded ${submissions.length} contact submissions from storage`);
      } else {
        console.log("\u{1F4C1} No existing contact data found, starting fresh");
      }
    } catch (error) {
      console.log("\u26A0\uFE0F Could not load contact data, starting fresh:", error?.message || "Unknown error");
    }
  }
  loadUsers() {
    try {
      const dataDir = path.dirname(this.usersFile);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      if (fs.existsSync(this.usersFile)) {
        const users = JSON.parse(fs.readFileSync(this.usersFile, "utf8"));
        for (const user of users) {
          this.users.set(user.email, user);
        }
        console.log(`\u{1F465} Loaded ${users.length} users from storage`);
      } else {
        console.log("\u{1F465} No existing users found, starting fresh");
      }
    } catch (error) {
      console.log("\u26A0\uFE0F Could not load users, starting fresh:", error?.message || "Unknown error");
    }
  }
  saveToFile() {
    try {
      const data = {
        currentId: this.currentId,
        submissions: Array.from(this.submissions.values())
      };
      fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("\u274C Failed to save contact data:", error?.message || "Unknown error");
    }
  }
  saveUsers() {
    try {
      const users = Array.from(this.users.values());
      fs.writeFileSync(this.usersFile, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error("\u274C Failed to save user data:", error?.message || "Unknown error");
    }
  }
  async createContactSubmission(insertSubmission) {
    const id = this.currentId++;
    const submission = {
      ...insertSubmission,
      id,
      company: insertSubmission.company || null,
      service: insertSubmission.service || null,
      budget: insertSubmission.budget || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.submissions.set(id, submission);
    this.saveToFile();
    console.log("\u{1F4E7} New contact submission received:", {
      name: `${submission.firstName} ${submission.lastName}`,
      email: submission.email,
      company: submission.company,
      service: submission.service,
      budget: submission.budget,
      timestamp: submission.createdAt
    });
    return submission;
  }
  async getContactSubmissions() {
    return Array.from(this.submissions.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  // User management methods
  async createUser(user) {
    const userRecord = {
      ...user,
      id: Date.now()
      // Simple ID generation
    };
    this.users.set(user.email, userRecord);
    this.saveUsers();
    console.log("\u{1F464} New user created:", {
      name: user.name,
      email: user.email,
      timestamp: user.created_at
    });
    return userRecord;
  }
  async getUsers() {
    return Array.from(this.users.values());
  }
  async getUserByEmail(email) {
    return this.users.get(email) || null;
  }
};
function createStorage() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.log("\u26A0\uFE0F No DATABASE_URL found, using in-memory storage");
    return new MemStorage();
  }
  if (databaseUrl.startsWith("mysql://")) {
    console.log("\u{1F5C4}\uFE0F Using MySQL storage for Hostinger");
    return new MySQLStorage();
  } else if (databaseUrl.startsWith("postgresql://") || databaseUrl.startsWith("postgres://")) {
    console.log("\u{1F5C4}\uFE0F Using PostgreSQL storage");
    return new PostgreSQLStorage();
  } else {
    console.log("\u26A0\uFE0F Unknown database URL format, using in-memory storage");
    return new MemStorage();
  }
}
var storage = createStorage();

// server/emailService.ts
import nodemailer from "nodemailer";
var EmailService = class {
  transporter;
  fromEmail;
  toEmail;
  constructor() {
    console.log("\u{1F504} Initializing EmailService...");
    this.fromEmail = process.env.EMAIL_FROM || "noreply@adsvisionmarketing.com";
    this.toEmail = process.env.EMAIL_TO || "mradvision.cop@gmail.com";
    this.initializeTransporter();
  }
  initializeTransporter() {
    const smtpUser = process.env.SMTP_USER || "";
    const smtpPass = process.env.SMTP_PASS || "";
    console.log("\u{1F50D} Email Configuration Check:");
    console.log("\u{1F4E7} SMTP_USER:", smtpUser || "Not set");
    console.log("\u{1F4E7} SMTP_PASS:", smtpPass ? `${smtpPass.length} characters` : "Not set");
    console.log("\u{1F4E7} EMAIL_TO:", this.toEmail);
    if (smtpUser && smtpPass && smtpUser.includes("@gmail.com") && smtpPass.length >= 16) {
      try {
        this.transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });
        console.log("\u2705 Email service initialized in PRODUCTION MODE");
        console.log("\u{1F4E7} Ready to send emails to Gmail inbox!");
        console.log("\u{1F4E7} From:", this.fromEmail);
        console.log("\u{1F4E7} To:", this.toEmail);
      } catch (error) {
        console.log("\u274C Failed to initialize Gmail transporter:", error);
        this.transporter = null;
      }
    } else {
      this.transporter = null;
      console.log("\u{1F4E7} Email service in TEST MODE");
      console.log("\u{1F4E7} Emails will be logged to console");
      if (!smtpUser) console.log("\u274C Missing SMTP_USER");
      if (!smtpPass) console.log("\u274C Missing SMTP_PASS");
      if (smtpPass && smtpPass.length < 16) console.log("\u274C SMTP_PASS too short (needs 16 chars for Gmail App Password)");
    }
  }
  async testConnection() {
    if (!this.transporter) {
      console.log("\u2705 Email service connection verified (TEST MODE)");
      return true;
    }
    try {
      await this.transporter.verify();
      console.log("\u2705 Gmail SMTP connection verified successfully!");
      return true;
    } catch (error) {
      console.log("\u274C Gmail SMTP connection failed:", error);
      return false;
    }
  }
  async sendContactNotification(contactData) {
    console.log("\u{1F50D} DEBUG: sendContactNotification called");
    console.log("\u{1F50D} DEBUG: this.transporter exists?", !!this.transporter);
    const isTestMode = !this.transporter;
    console.log("\u{1F50D} DEBUG: isTestMode =", isTestMode);
    console.log("\u{1F4E7} New contact submission received:", contactData);
    const emailContent = {
      from: `"AdsVision Marketing" <${this.fromEmail}>`,
      to: this.toEmail,
      replyTo: contactData.email,
      subject: `\u{1F514} New Contact Form Submission - ${contactData.firstName} ${contactData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            \u{1F514} New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            <p><strong>Company:</strong> ${contactData.company || "Not specified"}</p>
            <p><strong>Service:</strong> ${contactData.service}</p>
            <p><strong>Budget:</strong> ${contactData.budget}</p>
          </div>

          ${contactData.message ? `
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6;">${contactData.message}</p>
            </div>
          ` : ""}

          <div style="margin-top: 30px; padding: 15px; background-color: #e9ecef; border-radius: 8px;">
            <p style="margin: 0; font-size: 12px; color: #6c757d;">
              \u{1F4C5} Submitted: ${(/* @__PURE__ */ new Date()).toLocaleString()}<br>
              \u{1F4BC} AdsVision Marketing Contact System
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${contactData.firstName} ${contactData.lastName}
Email: ${contactData.email}
Company: ${contactData.company || "Not specified"}
Service: ${contactData.service}
Budget: ${contactData.budget}

Message:
${contactData.message || "No message provided"}

Submitted: ${(/* @__PURE__ */ new Date()).toLocaleString()}
      `
    };
    if (isTestMode) {
      console.log("\u{1F4E7} ===== EMAIL NOTIFICATION (TEST MODE) =====");
      console.log("\u{1F4E7} From:", emailContent.from);
      console.log("\u{1F4E7} To:", emailContent.to);
      console.log("\u{1F4E7} Subject:", emailContent.subject);
      console.log("\u{1F4E7} Reply-To:", emailContent.replyTo);
      console.log("\u{1F4E7} Message Preview:");
      console.log("\u{1F4E7} ----------------------------------------");
      console.log("\u{1F4E7} Name:", `${contactData.firstName} ${contactData.lastName}`);
      console.log("\u{1F4E7} Email:", contactData.email);
      console.log("\u{1F4E7} Company:", contactData.company || "Not specified");
      console.log("\u{1F4E7} Service:", contactData.service);
      console.log("\u{1F4E7} Budget:", contactData.budget);
      console.log("\u{1F4E7} Message:", contactData.message || "No message provided");
      console.log("\u{1F4E7} ========================================");
      console.log("\u2705 Email logged successfully (TEST MODE)");
      console.log("\u2709\uFE0F  To receive real emails, set up Gmail App Password in .env file");
      return true;
    }
    try {
      const info = await this.transporter.sendMail(emailContent);
      console.log("\u2705 Email sent successfully to Gmail inbox!");
      console.log("\u{1F4E7} Message ID:", info.messageId);
      console.log("\u{1F4E7} Recipient:", this.toEmail);
      return true;
    } catch (error) {
      console.log("\u274C Failed to send email:", error);
      console.log("\u{1F4E7} ===== EMAIL NOTIFICATION (FALLBACK) =====");
      console.log("\u{1F4E7} Subject:", emailContent.subject);
      console.log("\u{1F4E7} To:", emailContent.to);
      console.log("\u{1F4E7} Content:", emailContent.text);
      console.log("\u{1F4E7} ==========================================");
      return false;
    }
  }
  async sendWelcomeEmail(userData) {
    if (!this.transporter) {
      console.log("\u26A0\uFE0F No email transporter configured - simulating welcome email send");
      console.log("\u{1F4E7} ==========================================");
      console.log("\u{1F4E7} WELCOME EMAIL (Simulated)");
      console.log("\u{1F4E7} To:", userData.email);
      console.log("\u{1F4E7} Subject: Welcome to AdsVision Marketing! \u{1F389}");
      console.log("\u{1F4E7} Content: Welcome message for", userData.name);
      console.log("\u{1F4E7} ==========================================");
      return false;
    }
    try {
      const emailContent = {
        from: this.fromEmail,
        to: userData.email,
        subject: "Welcome to AdsVision Marketing! \u{1F389}",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Welcome to AdsVision Marketing!</h2>
            <p>Hi ${userData.name},</p>
            <p>Thank you for creating an account with us! We're excited to have you on board.</p>
            <p>Our team is ready to help you transform your business with cutting-edge marketing solutions.</p>
            <p>If you have any questions, feel free to reach out to us.</p>
            <p>Best regards,<br/>The AdsVision Marketing Team</p>
          </div>
        `
      };
      const info = await this.transporter.sendMail(emailContent);
      console.log("\u{1F4E7} Welcome email sent successfully:", info.messageId);
      return true;
    } catch (error) {
      console.log("\u274C Failed to send welcome email:", error);
      return false;
    }
  }
};
var emailService;
function initializeEmailService() {
  emailService = new EmailService();
  return emailService;
}
function getEmailService() {
  if (!emailService) {
    throw new Error("EmailService not initialized. Call initializeEmailService() first.");
  }
  return emailService;
}

// server/sendgridEmailService.ts
import sgMail from "@sendgrid/mail";
var SendGridEmailService = class {
  fromEmail;
  toEmail;
  isInitialized = false;
  constructor() {
    console.log("\u{1F504} Initializing SendGrid Email Service...");
    this.fromEmail = process.env.EMAIL_FROM || "noreply@adsvisionmarketing.com";
    this.toEmail = process.env.EMAIL_TO || "mradvision.cop@gmail.com";
    this.initialize();
  }
  initialize() {
    const apiKey = process.env.SENDGRID_API_KEY;
    console.log("\u{1F50D} SendGrid Configuration Check:");
    console.log("\u{1F4E7} FROM_EMAIL:", this.fromEmail);
    console.log("\u{1F4E7} TO_EMAIL:", this.toEmail);
    console.log("\u{1F4E7} SENDGRID_API_KEY:", apiKey ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}` : "Not set");
    if (apiKey) {
      try {
        sgMail.setApiKey(apiKey);
        this.isInitialized = true;
        console.log("\u2705 SendGrid service initialized in PRODUCTION MODE");
        console.log("\u{1F4E7} Ready to send emails via SendGrid!");
        console.log("\u{1F4E7} From:", this.fromEmail);
        console.log("\u{1F4E7} To:", this.toEmail);
      } catch (error) {
        console.log("\u274C Failed to initialize SendGrid:", error);
        this.isInitialized = false;
      }
    } else {
      this.isInitialized = false;
      console.log("\u{1F4E7} SendGrid service in TEST MODE");
      console.log("\u{1F4E7} Emails will be logged to console");
      console.log("\u274C Missing SENDGRID_API_KEY");
    }
  }
  async sendContactNotification(contactData) {
    const isTestMode = !this.isInitialized;
    console.log("\u{1F4E7} New contact submission received:", contactData);
    const emailContent = {
      from: {
        email: this.fromEmail,
        name: "AdsVision Marketing"
      },
      to: this.toEmail,
      replyTo: contactData.email,
      subject: `\u{1F514} New Contact Form Submission - ${contactData.firstName} ${contactData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            \u{1F514} New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            <p><strong>Company:</strong> ${contactData.company || "Not specified"}</p>
            <p><strong>Service:</strong> ${contactData.service}</p>
            <p><strong>Budget:</strong> ${contactData.budget}</p>
          </div>

          ${contactData.message ? `
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6;">${contactData.message}</p>
            </div>
          ` : ""}

          <div style="margin-top: 30px; padding: 15px; background-color: #e9ecef; border-radius: 8px;">
            <p style="margin: 0; font-size: 12px; color: #6c757d;">
              \u{1F4C5} Submitted: ${(/* @__PURE__ */ new Date()).toLocaleString()}<br>
              \u{1F4BC} AdsVision Marketing Contact System
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${contactData.firstName} ${contactData.lastName}
Email: ${contactData.email}
Company: ${contactData.company || "Not specified"}
Service: ${contactData.service}
Budget: ${contactData.budget}

Message:
${contactData.message || "No message provided"}

Submitted: ${(/* @__PURE__ */ new Date()).toLocaleString()}
      `
    };
    if (isTestMode) {
      console.log("\u{1F4E7} ===== EMAIL NOTIFICATION (TEST MODE) =====");
      console.log("\u{1F4E7} From:", emailContent.from);
      console.log("\u{1F4E7} To:", emailContent.to);
      console.log("\u{1F4E7} Subject:", emailContent.subject);
      console.log("\u{1F4E7} Reply-To:", emailContent.replyTo);
      console.log("\u{1F4E7} Message Preview:");
      console.log("\u{1F4E7} ----------------------------------------");
      console.log("\u{1F4E7} Name:", `${contactData.firstName} ${contactData.lastName}`);
      console.log("\u{1F4E7} Email:", contactData.email);
      console.log("\u{1F4E7} Company:", contactData.company || "Not specified");
      console.log("\u{1F4E7} Service:", contactData.service);
      console.log("\u{1F4E7} Budget:", contactData.budget);
      console.log("\u{1F4E7} Message:", contactData.message || "No message provided");
      console.log("\u{1F4E7} ========================================");
      console.log("\u2705 Email logged successfully (TEST MODE)");
      console.log("\u2709\uFE0F  To receive real emails, set up SendGrid API Key in .env file");
      return true;
    }
    try {
      await sgMail.send(emailContent);
      console.log("\u2705 Email sent successfully via SendGrid!");
      console.log("\u{1F4E7} To:", this.toEmail);
      return true;
    } catch (error) {
      console.log("\u274C Failed to send email via SendGrid:", error);
      console.log("\u{1F4E7} ===== EMAIL NOTIFICATION (FALLBACK) =====");
      console.log("\u{1F4E7} Subject:", emailContent.subject);
      console.log("\u{1F4E7} To:", emailContent.to);
      console.log("\u{1F4E7} Content:", emailContent.text);
      console.log("\u{1F4E7} ==========================================");
      return false;
    }
  }
};
var sendGridService;
function initializeSendGridService() {
  sendGridService = new SendGridEmailService();
  return sendGridService;
}
function getSendGridService() {
  if (!sendGridService) {
    sendGridService = new SendGridEmailService();
  }
  return sendGridService;
}

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      let emailSent = false;
      try {
        emailSent = await getEmailService().sendContactNotification(validatedData);
      } catch (emailError) {
        console.error("\u274C Gmail SMTP email error:", emailError);
        try {
          emailSent = await getSendGridService().sendContactNotification(validatedData);
        } catch (fallbackError) {
          console.error("\u274C SendGrid fallback error:", fallbackError);
        }
      }
      console.log("\u2705 Contact form submitted successfully:", {
        name: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        emailSent,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      res.json({
        success: true,
        submission,
        emailSent
      });
    } catch (error) {
      console.error("\u274C Contact form submission error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation failed", details: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
  app2.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("\u274C Error fetching contact submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.get("/api/contact/count", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json({ count: submissions.length });
    } catch (error) {
      console.error("\u274C Error fetching contact submissions count:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.get("/api/health", async (req, res) => {
    const emailConnectionValid = await getEmailService().testConnection();
    const sendGridConfigured = !!process.env.SENDGRID_API_KEY;
    res.json({
      status: "healthy",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      database: process.env.DATABASE_URL ? "connected" : "in-memory",
      email: {
        smtp: emailConnectionValid ? "connected" : "error",
        sendGrid: sendGridConfigured ? "configured" : "not-configured"
      }
    });
  });
  app2.post("/api/test-email", async (req, res) => {
    try {
      const testData = {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        company: "Test Company",
        service: "Web Development",
        budget: "$5k-$10k",
        message: "This is a test email to verify the email notification system is working correctly."
      };
      let emailSent = false;
      let emailProvider = "";
      try {
        emailSent = await getEmailService().sendContactNotification(testData);
        emailProvider = "Gmail SMTP";
      } catch (gmailError) {
        console.error("\u274C Gmail SMTP test email error:", gmailError);
        try {
          emailSent = await getSendGridService().sendContactNotification(testData);
          emailProvider = "SendGrid";
        } catch (fallbackError) {
          console.error("\u274C SendGrid fallback error:", fallbackError);
        }
      }
      res.json({
        success: emailSent,
        provider: emailProvider || "None",
        message: emailSent ? `Test email sent successfully using ${emailProvider}` : "Failed to send test email with all providers"
      });
    } catch (error) {
      console.error("\u274C Test email error:", error);
      res.status(500).json({ error: "Failed to send test email" });
    }
  });
  app2.post("/api/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          error: "All fields are required"
        });
      }
      if (name.trim().length < 2) {
        return res.status(400).json({
          error: "Name must be at least 2 characters long"
        });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: "Please enter a valid email address"
        });
      }
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password must be at least 6 characters long"
        });
      }
      const existingUser = await storage.getUserByEmail?.(email);
      if (existingUser) {
        return res.status(400).json({
          error: "An account with this email already exists"
        });
      }
      const userData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        // In production, hash this password
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const newUser = await storage.createUser?.(userData);
      if (!newUser) {
        return res.status(500).json({
          error: "Failed to create user account"
        });
      }
      const emailService2 = getEmailService();
      if (emailService2) {
        try {
          const welcomeEmailSent = await emailService2.sendWelcomeEmail({
            name: userData.name,
            email: userData.email
          });
          if (welcomeEmailSent) {
            console.log(`\u{1F4E7} Welcome email sent to ${email}`);
          }
        } catch (emailError) {
          console.error("\u274C Failed to send welcome email:", emailError);
        }
      }
      res.json({
        success: true,
        message: "Account created successfully! Welcome to AdsVision Marketing!",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        }
      });
    } catch (error) {
      console.error("\u274C Signup error:", error);
      res.status(500).json({
        error: "Internal server error. Please try again."
      });
    }
  });
  app2.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Email and password are required"
        });
      }
      const user = await storage.getUserByEmail?.(email.toLowerCase().trim());
      if (!user) {
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password"
        });
      }
      if (user.password !== password) {
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password"
        });
      }
      console.log("\u2705 User logged in:", { email: user.email, name: user.name });
      res.json({
        status: "success",
        message: "Login successful!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.error("\u274C Login error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error"
      });
    }
  });
  app2.post("/api/test-sendgrid", async (req, res) => {
    try {
      const testData = {
        firstName: "SendGrid",
        lastName: "Test",
        email: req.body.email || "test@example.com",
        company: "AdsVision Marketing",
        service: "Email Testing",
        budget: "N/A",
        message: "This is a test email specifically for SendGrid to verify it's working correctly with your configuration."
      };
      const sendGridService2 = getSendGridService();
      const emailSent = await sendGridService2.sendContactNotification(testData);
      if (emailSent) {
        console.log("\u2705 SendGrid test email sent successfully to recipient");
        res.json({
          success: true,
          message: "SendGrid test email sent successfully!"
        });
      } else {
        console.log("\u26A0\uFE0F SendGrid test failed - check configuration");
        res.status(500).json({
          success: false,
          message: "Failed to send SendGrid test email. Check your API key configuration."
        });
      }
    } catch (error) {
      console.error("\u274C SendGrid test error:", error);
      res.status(500).json({
        error: "SendGrid test failed",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var envPath = path4.join(process.cwd(), ".env");
var envResult = config({ path: envPath });
console.log("\u{1F527} Environment loading result:", envResult.parsed);
console.log("\u{1F527} SMTP_USER from process.env:", process.env.SMTP_USER);
console.log("\u{1F527} SMTP_PASS from process.env:", process.env.SMTP_PASS ? "SET" : "NOT SET");
console.log("\u{1F504} Server starting with environment variables loaded... UPDATED");
initializeEmailService();
initializeSendGridService();
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path5 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path5.startsWith("/api")) {
      let logLine = `${req.method} ${path5} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
