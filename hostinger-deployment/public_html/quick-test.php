<?php
// Quick connection test with your exact credentials
$host = 'localhost';
$db_username = 'u770934494_Shared_Base';
$db_password = 'Mirza.Ali!1';
$database = 'u770934494_User_Info';

echo "Testing connection with:\n";
echo "Host: $host\n";
echo "Username: $db_username\n";
echo "Password: $db_password\n";
echo "Database: $database\n\n";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $db_username, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ SUCCESS! Database connection established.\n";
    
    // Test creating users table
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    echo "✅ Users table ready.\n";
    
    // Test creating contact_submissions table
    $pdo->exec("CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(100),
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    echo "✅ Contact submissions table ready.\n";
    echo "\n🎉 All tables created successfully! Your database is ready.\n";
    
} catch (PDOException $e) {
    echo "❌ Connection failed: " . $e->getMessage() . "\n";
}
?>
