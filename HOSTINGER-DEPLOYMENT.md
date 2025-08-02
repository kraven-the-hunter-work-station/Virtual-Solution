# Virtual Solutions - Hostinger Deployment Guide

This guide provides step-by-step instructions for deploying the Virtual Solutions website to Hostinger hosting.

## Before Deployment

1. Make sure your code is finalized and all features are working locally.
2. Run the build script to prepare the deployment package:
   - Double-click `build-for-hostinger.bat`, or
   - Right-click `build-for-hostinger.ps1` and select "Run with PowerShell"

## Deployment Steps

### 1. Access Your Hostinger Account

1. Log in to your Hostinger control panel
2. Go to the "Hosting" section
3. Select your hosting package

### 2. Upload Files

#### Using File Manager

1. Open File Manager in Hostinger control panel
2. Navigate to the public_html folder (or your desired directory)
3. Delete any existing files if you're replacing a previous version
4. Click "Upload" and select all files from your local "deploy" folder
5. Make sure to preserve the directory structure

#### Using FTP (Alternative)

1. Connect to your Hostinger server using FTP credentials
2. Navigate to the public_html folder (or your desired directory)
3. Upload all files from your local "deploy" folder
4. Preserve the directory structure

### 3. Configure Email Settings

1. Navigate to the Server folder on your Hostinger account
2. Edit the `email_config.php` file:
   ```php
   return [
       // SMTP Settings
       'smtp' => [
           'enabled' => true,
           'host' => 'smtp.hostinger.com', // Use Hostinger's SMTP server
           'port' => 587,
           'secure' => 'tls',
           'auth' => true,
           'username' => 'your-email@your-domain.com', // Your Hostinger email
           'password' => 'your-password', // Your email password
       ],
       
       // Contact form email settings
       'contact_form' => [
           'to' => 'recipient@your-domain.com', // Where to send form submissions
           'from' => 'contact-form@your-domain.com', // From address
           'subject_prefix' => 'New Contact Form - ',
       ],
       
       // Debug settings
       'debug' => [
           'log_email_attempts' => true,
       ]
   ];
   ```

### 4. Set Proper Permissions

1. In File Manager, right-click on the "Server" folder and select "Change Permissions"
2. Set permissions to 755 for directories
3. Set permissions to 644 for files
4. For the `email_config.php` file, consider setting permissions to 600 for security

### 5. Verify .htaccess Configuration

Make sure the `.htaccess` file is present in the root directory with the proper React routing configuration:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 6. Test Your Website

1. Access your website domain
2. Verify all pages load correctly
3. Test the contact form by submitting a test message
4. Check that emails are being sent properly

## Troubleshooting

### Contact Form Issues

If the contact form is not working:

1. Check the server error logs in Hostinger control panel
2. Verify the Server/contact.php file exists and has proper permissions
3. Ensure email_config.php has the correct SMTP settings
4. Try using Hostinger's built-in email service instead of external SMTP

### Page Not Found Errors

If you see 404 errors when refreshing pages:

1. Verify the .htaccess file exists in the root directory
2. Make sure mod_rewrite is enabled on your Hostinger account
3. Contact Hostinger support if the issue persists

### Server 500 Errors

If you see Internal Server Error (500):

1. Check PHP version compatibility (Hostinger supports PHP 7.4+)
2. Review server error logs in Hostinger control panel
3. Temporarily enable error display by adding this to Server/config.php:
   ```php
   ini_set('display_errors', 1);
   error_reporting(E_ALL);
   ```

## Regular Maintenance

1. Keep a backup of your deployment files
2. Periodically check server logs for errors
3. Update your dependencies and rebuild as needed

For additional support, contact Hostinger customer service or refer to their knowledge base.
