<?php
// Database Table Checker for Existing Database
// Upload this file and visit yourdomain.com/check-database.php

header('Content-Type: text/html; charset=UTF-8');

// Database configuration - UPDATE WITH YOUR HOSTINGER CREDENTIALS
$host = 'localhost';
$username = 'u770934494_shared_user';     // Updated
$password = '1qWERTYUIOP!';                // Updated  
$database = 'u770934494_shared_users';     // Updated

echo "<h1>🔍 Database Structure Checker</h1>";
echo "<p>This tool helps you see what tables already exist in your database.</p>";

try {
    // Connect to database
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<h2>✅ Database Connection Successful</h2>";
    echo "<strong>Database:</strong> $database<br>";
    
    // Show all tables
    echo "<h2>📋 Existing Tables</h2>";
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    if (empty($tables)) {
        echo "<p>❌ No tables found in database.</p>";
        echo "<p>💡 You can run the SQL from database-setup.sql to create the contact_submissions table.</p>";
    } else {
        echo "<ul>";
        foreach ($tables as $table) {
            echo "<li><strong>$table</strong>";
            
            // Check if it looks like a contact table
            if (stripos($table, 'contact') !== false || stripos($table, 'submission') !== false || stripos($table, 'form') !== false) {
                echo " <span style='color: green;'>← Potential contact table</span>";
                
                // Show structure of potential contact tables
                echo "<ul>";
                $stmt2 = $pdo->query("DESCRIBE `$table`");
                $columns = $stmt2->fetchAll(PDO::FETCH_ASSOC);
                foreach ($columns as $column) {
                    echo "<li>{$column['Field']} ({$column['Type']})</li>";
                }
                echo "</ul>";
            }
            echo "</li>";
        }
        echo "</ul>";
    }
    
    // Check if contact_submissions table exists
    echo "<h2>🎯 Contact Form Table Status</h2>";
    $stmt = $pdo->query("SHOW TABLES LIKE 'contact_submissions'");
    if ($stmt->rowCount() > 0) {
        echo "<p>✅ <strong>contact_submissions</strong> table exists!</p>";
        
        // Show structure
        echo "<h3>Table Structure:</h3>";
        $stmt = $pdo->query("DESCRIBE contact_submissions");
        $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo "<table border='1' style='border-collapse: collapse; margin: 10px 0;'>";
        echo "<tr><th>Field</th><th>Type</th><th>Null</th><th>Key</th><th>Default</th></tr>";
        foreach ($columns as $column) {
            echo "<tr>";
            echo "<td>{$column['Field']}</td>";
            echo "<td>{$column['Type']}</td>";
            echo "<td>{$column['Null']}</td>";
            echo "<td>{$column['Key']}</td>";
            echo "<td>{$column['Default']}</td>";
            echo "</tr>";
        }
        echo "</table>";
        
        // Count existing records
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM contact_submissions");
        $count = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
        echo "<p><strong>Existing records:</strong> $count</p>";
        
    } else {
        echo "<p>❌ <strong>contact_submissions</strong> table does not exist.</p>";
        echo "<p>💡 <strong>Action needed:</strong> Run the SQL from database-setup.sql to create this table.</p>";
        
        echo "<h3>SQL to create table:</h3>";
        echo "<pre style='background: #f4f4f4; padding: 10px; border-radius: 5px;'>";
        echo "CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(200),
    service VARCHAR(100),
    budget VARCHAR(50),
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);";
        echo "</pre>";
    }
    
    echo "<hr>";
    echo "<h2>🔧 Next Steps</h2>";
    echo "<ol>";
    echo "<li>If you see the contact_submissions table above, you're ready to go!</li>";
    echo "<li>If not, copy and run the SQL from database-setup.sql in phpMyAdmin</li>";
    echo "<li>Update the database credentials in contact.php</li>";
    echo "<li>Test your contact form</li>";
    echo "<li><strong>Delete this file after checking for security</strong></li>";
    echo "</ol>";
    
} catch (PDOException $e) {
    echo "<h2>❌ Database Connection Failed</h2>";
    echo "<p><strong>Error:</strong> " . $e->getMessage() . "</p>";
    echo "<p><strong>Check:</strong></p>";
    echo "<ul>";
    echo "<li>Database credentials are correct</li>";
    echo "<li>Database server is running</li>";
    echo "<li>Database name exists</li>";
    echo "<li>User has proper permissions</li>";
    echo "</ul>";
}

echo "<hr><p><em>🛡️ Security Note: Delete this file after use</em></p>";
?>
