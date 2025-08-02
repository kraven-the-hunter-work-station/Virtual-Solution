# Hostinger Database Integration Guide

This guide will help you set up and connect your application to a Hostinger MySQL database for sign-up, sign-in, and contact form functionality.

## Prerequisites

1. A Hostinger hosting account with MySQL database access
2. FTP or File Manager access to upload files to your hosting
3. Knowledge of your Hostinger database credentials (host, name, username, password)

## Step 1: Set Up Your Database in Hostinger

1. Log in to your Hostinger control panel
2. Navigate to the "Databases" section
3. Create a new MySQL database or use an existing one
4. Create a database user if needed and assign it to your database
5. Make note of your database credentials:
   - Database Host (usually "localhost")
   - Database Name
   - Database Username
   - Database Password

## Step 2: Update Configuration Files

1. Open the `src/config/hostinger-config.php` file
2. Replace the placeholder values with your actual Hostinger database credentials:
   ```php
   'db' => [
       'host'     => 'localhost',         // Usually 'localhost' for Hostinger
       'name'     => 'u123456789_dbname', // Your actual database name
       'user'     => 'u123456789_user',   // Your database username
       'password' => 'YourPassword',      // Your database password
       'charset'  => 'utf8mb4',
       'port'     => 3306
   ],
   ```
3. Update the email settings if needed:
   ```php
   'email' => [
       'admin_email'  => 'your-email@example.com', // Your actual email
       'from_email'   => 'noreply@yourdomain.com',
       'from_name'    => 'Virtual Solutions',
   ],
   ```

## Step 3: Upload Files to Hostinger

Upload the following files to your Hostinger hosting using FTP or File Manager:

- `src/config/db-config.php`
- `src/config/hostinger-config.php`
- `src/config/user-auth.php`
- `src/config/contact-handler.php`
- `src/config/database-setup.sql`
- `src/config/install-database.php`

Place them in a directory of your choice, such as `public_html/src/config/`.

## Step 4: Create Database Tables

1. Access the database installer by visiting:
   ```
   https://yourdomain.com/src/config/install-database.php
   ```
2. Follow the on-screen instructions to create the necessary database tables
3. Verify that the tables were created successfully

## Step 5: Update Frontend API Paths

In your `ContactPage.tsx` file, update the API path to match your Hostinger file structure:

```jsx
// Example
const response = await fetch('/src/config/contact-handler.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});
```

If you placed the PHP files in a different location, update the path accordingly.

## Step 6: Test the Integration

1. Submit the contact form on your website
2. Check your database to see if the submission was recorded
3. Verify if you received the email notification

## Troubleshooting

### Database Connection Issues

- Verify your database credentials in `hostinger-config.php`
- Check if the database user has sufficient privileges
- Confirm that your hosting supports external connections if needed

### Form Submission Errors

- Check the browser console for any JavaScript errors
- Look for PHP errors in your hosting error logs
- Verify that the form data is being sent correctly

### Email Notification Problems

- Check your spam/junk folder
- Verify the mail configuration on your Hostinger server
- Consider using a more robust email solution like PHPMailer if needed

## Security Considerations

1. **Protect Sensitive Files**: Ensure that configuration files with database credentials are not publicly accessible.
2. **Input Validation**: Always validate and sanitize user input on both client and server sides.
3. **Use HTTPS**: Ensure your website uses HTTPS to encrypt data in transit.
4. **Regular Updates**: Keep all dependencies and server software up to date.

## Need Help?

If you encounter any issues with this integration, please contact your hosting provider's support team or a web developer for assistance.
