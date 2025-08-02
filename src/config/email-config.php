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
    'smtp_host' => 'smtp.hostinger.com',    // Hostinger SMTP host
    'smtp_port' => 587,                     // SMTP port (usually 587 for TLS)
    'smtp_username' => 'contact@virtualsolutionspath.com', // Your business email
    'smtp_password' => 'YOUR_EMAIL_PASSWORD',    // Your email password (set this up)
    'smtp_secure' => 'tls',                 // Encryption type: 'tls' or 'ssl'
    
    // Email Settings
    'from_email' => 'contact@virtualsolutionspath.com', // Sender email
    'from_name' => 'Virtual Solutions Path',    // Sender name
    'to_email' => 'contact@virtualsolutionspath.com',   // Recipient email
    'to_name' => 'Virtual Solutions Team',      // Recipient name
    
    // Debug Settings
    'debug_level' => 0                      // Debug level: 0 = Off, 1 = Errors, 2 = All Messages
];
