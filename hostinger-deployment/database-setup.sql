-- MySQL Database Setup for Hostinger (Existing Database)
-- Since you already have a database, you may only need to create these tables
-- Run this script in your Hostinger phpMyAdmin or database management tool

-- Create the users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create the contact_submissions table (if it doesn't already exist)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(200),
    service VARCHAR(100),
    budget VARCHAR(50),
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Optional: Create indexes for better performance (if not already created)
CREATE INDEX IF NOT EXISTS idx_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_user_email ON users(email);

-- Check tables exist and show structure
DESCRIBE users;
DESCRIBE contact_submissions;

-- Show existing tables (to verify your database structure)
SHOW TABLES;

-- Note: The signup.php and login.php files will automatically create the users table
-- if it doesn't exist, but running this SQL ensures proper structure.
