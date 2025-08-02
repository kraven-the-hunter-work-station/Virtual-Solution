<?php
require_once 'db-config.php';

try {
    // Create users table if it doesn't exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        profile_image VARCHAR(255),
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    // Test user credentials
    $test_user = [
        'first_name' => 'Test',
        'last_name' => 'User',
        'email' => 'test@example.com',
        'password' => 'Test123!@#', // This will be hashed
        'role' => 'user'
    ];

    // Hash the password
    $password_hash = password_hash($test_user['password'], PASSWORD_DEFAULT);

    // Check if test user already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$test_user['email']]);
    
    if (!$stmt->fetch()) {
        // Insert test user
        $stmt = $pdo->prepare("INSERT INTO users (first_name, last_name, email, password_hash, role) 
                              VALUES (?, ?, ?, ?, ?)");
        
        $stmt->execute([
            $test_user['first_name'],
            $test_user['last_name'],
            $test_user['email'],
            $password_hash,
            $test_user['role']
        ]);
        
        echo "Test user created successfully!\n";
        echo "Email: " . $test_user['email'] . "\n";
        echo "Password: " . $test_user['password'] . "\n";
    } else {
        echo "Test user already exists!\n";
        echo "Email: " . $test_user['email'] . "\n";
        echo "Password: " . $test_user['password'] . "\n";
    }

} catch (PDOException $e) {
    die("Database Error: " . $e->getMessage());
}
?>
