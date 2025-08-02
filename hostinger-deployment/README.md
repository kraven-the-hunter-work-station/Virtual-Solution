# AdsVision Marketing - Hostinger Deployment Guide

This folder contains all the files needed to deploy your AdsVision Marketing website to Hostinger.

## 📁 Folder Structure

```
hostinger-deployment/
├── public_html/           # Upload this folder's contents to your Hostinger public_html directory
│   ├── index.html         # Main React app HTML file
│   ├── assets/           # CSS and JS bundles
│   ├── contact.php       # PHP contact form handler (fallback)
│   └── .htaccess         # Apache configuration for routing and security
├── server/               # Node.js server files (if using Node.js hosting)
│   ├── index.js          # Built server application
│   ├── package.json      # Server dependencies
│   └── .env.example      # Environment variables template
├── database-setup.sql    # MySQL database schema
└── README.md            # This file
```

## 🚀 Deployment Steps (Existing Database)

Since you already have a database set up, the deployment process is streamlined:

### Step 1: Database Configuration

1. **Check your existing database:**
   - Upload `check-database.php` to test your database connection
   - Visit `yourdomain.com/check-database.php` to see your current tables
2. **Add contact form table (if needed):**
   - If you don't have a `contact_submissions` table, run the SQL from `database-setup.sql`
   - Or modify `contact.php` to use your existing contact table structure

### Step 2: Upload Website Files

1. **Access File Manager or use FTP:**
   - In Hostinger control panel, go to "Files" → "File Manager"
   - Or use an FTP client like FileZilla
2. **Upload files:**
   - Upload ALL contents of the `public_html/` folder to your domain's `public_html` directory
   - Make sure `.htaccess` file is uploaded (it might be hidden)

### Step 3: Configure Contact Form

**Update `contact.php` with your database credentials:**
```php
// Update these lines with your actual database details:
$host = 'localhost';                    // Usually localhost for Hostinger
$username = 'your_actual_db_user';
$password = 'your_actual_db_password';
$database = 'your_actual_db_name';
```

**Email is already configured for Gmail:**
- ✅ Emails will go to: `mradvision.cop@gmail.com`
- ✅ From address: `noreply@adsvisionmarketing.com`

**Option B: Node.js Server (If you have Node.js hosting)**

1. **Upload server files to a separate directory**
2. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update with your actual database and email credentials
4. **Start the server:**
   ```bash
   npm start
   ```

### Step 4: SSL Configuration (Recommended)

1. **Enable SSL in Hostinger:**
   - Go to "Security" → "SSL"
   - Enable free SSL certificate
2. **Uncomment HTTPS redirect in `.htaccess`:**
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

## 🔧 Configuration Details

### Database Configuration

Your MySQL database should have these credentials format:
- **Host:** `localhost`
- **Database:** Your created database name
- **Username:** Your database username  
- **Password:** Your database password

### Email Configuration

For contact forms to work, configure either:

1. **PHP Mail (Simple):**
   - Uses server's built-in mail function
   - Already configured in `contact.php`

2. **SMTP (More reliable):**
   - Hostinger SMTP: `smtp.hostinger.com:587`
   - Use your domain email credentials

### Environment Variables (for Node.js option)

Create a `.env` file in the server directory:
```env
DATABASE_URL=mysql://username:password@localhost/database_name
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=your_email@yourdomain.com
SMTP_PASS=your_email_password
NODE_ENV=production
```

## 🧪 Testing Your Deployment

1. **Visit your website:** `https://yourdomain.com`
2. **Test the contact form:**
   - Fill out the contact form
   - Check your email for notifications
   - Verify data is saved in the database (via phpMyAdmin)

## 🔍 Troubleshooting

### Contact Form Not Working
- Check database credentials in `contact.php`
- Verify database table exists
- Check error logs in Hostinger control panel

### Website Not Loading
- Verify all files uploaded correctly
- Check `.htaccess` file exists
- Ensure index.html is in root directory

### Email Not Sending
- Verify email credentials
- Check spam folder
- Try different email service (Gmail, SendGrid)

## 📞 Support

If you need help with:
- **Hostinger-specific issues:** Contact Hostinger support
- **Website modifications:** Contact your developer
- **Database issues:** Check phpMyAdmin error logs

## 🔄 Updates

To update your website:
1. Run `npm run build` in your development environment
2. Upload new files from `dist/public/` to your `public_html` directory
3. Clear any caches

---

**Note:** This deployment is optimized for Hostinger's shared hosting environment. The PHP contact form provides a reliable fallback that works well with Hostinger's infrastructure.
