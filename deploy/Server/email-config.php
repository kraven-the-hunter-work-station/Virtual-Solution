<?php
/**
 * Email Configuration File
 * 
 * IMPORTANT: Replace these values with your actual email credentials
 * For Gmail, you need to use an App Password, not your regular password
 * Create an App Password: https://myaccount.google.com/apppasswords
 */

return [
    // SMTP Server Settings
    'smtp_host' => 'smtp.gmail.com',        // SMTP host (e.g., smtp.gmail.com for Gmail)
    'smtp_port' => 587,                     // SMTP port (usually 587 for TLS)
    'smtp_username' => 'your-email@gmail.com', // Your email address
    'smtp_password' => 'your-app-password',    // Your app password (not your regular password)
    'smtp_secure' => 'tls',                 // Encryption type: 'tls' or 'ssl'
    
    // Email Settings
    'from_email' => 'your-email@gmail.com', // Sender email (usually same as smtp_username)
    'from_name' => 'Your Website',          // Sender name
    'to_email' => 'your-email@gmail.com',   // Recipient email (can be same as from_email)
    'to_name' => 'Admin',                   // Recipient name
    
    // Debug Settings
    'debug_level' => 0                      // Debug level: 0 = Off, 1 = Errors, 2 = All Messages
];
