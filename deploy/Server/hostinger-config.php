<?php
/**
 * Hostinger Database Configuration
 * 
 * This file contains the configuration for connecting to a Hostinger MySQL database
 * Update the values with your actual Hostinger database credentials
 */

// Database credentials - UPDATED WITH ACTUAL HOSTINGER CREDENTIALS
return [
    // Database connection settings
    'db' => [
        'host'     => 'localhost',         // Usually 'localhost' for Hostinger MySQL databases
        'name'     => 'u770934494_User_Info', // Your database name
        'user'     => 'u770934494_Shared_Base',   // Your database username
        'password' => 'Mirza.Ali!1', // Your database password
        'charset'  => 'utf8mb4',
        'port'     => 3306                 // Default MySQL port
    ],
    
    // Email settings for notifications
    'email' => [
        'admin_email'  => 'mradvision.cop@gmail.com', // Admin email to receive notifications
        'from_email'   => 'noreply@yourdomain.com',   // From email address for system emails
        'from_name'    => 'Virtual Solutions',         // From name for system emails
    ],
    
    // System settings
    'system' => [
        'debug'        => false,  // Set to true to enable detailed error messages (disable in production)
        'timezone'     => 'UTC',  // Default timezone for date/time functions
        'log_path'     => __DIR__ . '/logs/',  // Path for error logs
        'session_time' => 3600    // Session timeout in seconds (1 hour)
    ]
];
?>
