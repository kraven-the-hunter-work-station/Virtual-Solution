# Secure Email Handler Setup

This document provides instructions on how to set up and configure the secure email handler for your website's contact form.

## Overview

The email system uses PHPMailer with SMTP authentication to send emails securely. This approach works well on shared hosting providers like Hostinger.

## Configuration Steps

1. **Edit the Email Configuration File**

   Open `src/config/email-config.php` and replace the placeholder values with your actual email credentials:

   ```php
   return [
       // SMTP Server Settings
       'smtp_host' => 'smtp.gmail.com',        // For Gmail
       'smtp_port' => 587,                     // For TLS
       'smtp_username' => 'your-email@gmail.com', // Your email address
       'smtp_password' => 'your-app-password',    // App password (not regular password)
       'smtp_secure' => 'tls',                 // Use 'tls' for port 587, 'ssl' for port 465
       
       // Email Settings
       'from_email' => 'your-email@gmail.com', // Sender email
       'from_name' => 'Your Website',          // Sender name
       'to_email' => 'your-email@gmail.com',   // Recipient email
       'to_name' => 'Admin',                   // Recipient name
       
       // Debug Settings
       'debug_level' => 0                      // 0 = Off, 1 = Errors, 2 = All Messages
   ];
   ```

2. **Gmail App Password Instructions**

   If you're using Gmail, you need to create an App Password:
   
   a. Go to your Google Account settings at https://myaccount.google.com
   b. Select "Security" from the left menu
   c. Under "Signing in to Google," select "2-Step Verification" (enable if not enabled)
   d. Scroll down and select "App passwords"
   e. Create a new app password for "Mail" and "Other (Custom name)"
   f. Use the generated 16-character password as your `smtp_password`

3. **Hostinger Email Settings**

   If you're using Hostinger email hosting:
   
   ```php
   'smtp_host' => 'smtp.hostinger.com',  // Hostinger SMTP server
   'smtp_port' => 587,                   // Hostinger TLS port
   'smtp_username' => 'your-email@yourdomain.com',
   'smtp_password' => 'your-email-password',
   'smtp_secure' => 'tls',
   ```

4. **Testing the Email System**

   After configuring the email settings:
   
   a. Open `secure-email-test.html` in your browser
   b. Fill out the form and submit
   c. Check if you receive the test email

## Troubleshooting

If emails aren't being sent:

1. Check your SMTP credentials and ensure they're correct
2. Verify that your hosting provider allows outgoing SMTP connections
3. Look for error messages in your server's error log
4. Temporarily increase the debug level to 2 in `email-config.php`

## File Structure

- `src/config/email-config.php` - Contains your email credentials
- `src/config/secure-mailer.php` - The main PHP handler for sending emails
- `src/lib/PHPMailer.php` - PHPMailer library
- `src/lib/SMTP.php` - SMTP functionality
- `src/lib/Exception.php` - Error handling

## Security Notes

- The `email-config.php` file contains sensitive information. Make sure it's not accessible from the web.
- Consider adding a `.htaccess` file to your `src/config` directory to prevent direct access to PHP files.
- Always use App Passwords instead of your main password for authentication.

## Compatibility with Hostinger

This email system is fully compatible with Hostinger hosting. If you're using Hostinger's email service:

1. Create an email account through your Hostinger control panel
2. Use those credentials in your `email-config.php` file
3. Make sure to use the correct SMTP server settings as noted above
