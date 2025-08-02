<?php
/**
 * Local Development Test User Setup
 * 
 * This script creates test user accounts for local development only.
 * DO NOT UPLOAD THIS FILE TO YOUR PRODUCTION SERVER!
 */

// Check if running on localhost
$isLocalhost = in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1']) || 
               (isset($_SERVER['SERVER_NAME']) && $_SERVER['SERVER_NAME'] === 'localhost');

if (!$isLocalhost) {
    die('<h1>Access Denied</h1><p>This script can only be run in a local development environment.</p>');
}

// Include database configuration
require_once 'db-config.php';

// Use the PDO connection from db-config.php
$pdo = $GLOBALS['pdo'];

// Set up test user
try {
    // Begin transaction
    $pdo->beginTransaction();
    
    echo '<h1>Setting Up Test Users for Local Development</h1>';
    
    // Add test user 
    $testUser = $pdo->prepare("
        INSERT INTO users (first_name, last_name, email, password, role, status, email_verified)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            first_name = VALUES(first_name),
            last_name = VALUES(last_name),
            password = VALUES(password),
            status = VALUES(status),
            email_verified = VALUES(email_verified)
    ");
    
    // Test normal user
    $testUser->execute([
        'Test', 
        'User', 
        'test@example.com',
        password_hash('Test1234!', PASSWORD_DEFAULT), 
        'user',
        'active',
        1
    ]);
    
    $testUserId = $pdo->lastInsertId() ?: $pdo->query("SELECT id FROM users WHERE email = 'test@example.com'")->fetchColumn();
    
    echo '<div style="color: green; margin: 10px 0;">✓ Test user created</div>';
    
    // Test admin user
    $testUser->execute([
        'Admin', 
        'User', 
        'admin@example.com',
        password_hash('Test1234!', PASSWORD_DEFAULT), 
        'admin',
        'active',
        1
    ]);
    
    $adminId = $pdo->lastInsertId() ?: $pdo->query("SELECT id FROM users WHERE email = 'admin@example.com'")->fetchColumn();
    
    echo '<div style="color: green; margin: 10px 0;">✓ Admin user created</div>';
    
    // Test instructor
    $testUser->execute([
        'Test', 
        'Instructor', 
        'instructor@example.com',
        password_hash('Test1234!', PASSWORD_DEFAULT), 
        'instructor',
        'active',
        1
    ]);
    
    $instructorId = $pdo->lastInsertId() ?: $pdo->query("SELECT id FROM users WHERE email = 'instructor@example.com'")->fetchColumn();
    
    echo '<div style="color: green; margin: 10px 0;">✓ Instructor user created</div>';
    
    // Add profile for test user
    $testProfile = $pdo->prepare("
        INSERT INTO user_profiles (user_id, bio, phone, country)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            bio = VALUES(bio),
            phone = VALUES(phone),
            country = VALUES(country)
    ");
    
    $testProfile->execute([
        $testUserId,
        'This is a test user account for local development.',
        '+1234567890',
        'Test Country'
    ]);
    
    echo '<div style="color: green; margin: 10px 0;">✓ User profile created</div>';
    
    // Create sample courses
    $createCourse = $pdo->prepare("
        INSERT INTO courses (title, description, price, discount_price, category, duration, level, instructor_id, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    // Course 1
    $createCourse->execute([
        'Introduction to Web Development',
        'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
        99.99,
        79.99,
        'web-development',
        '10 hours',
        'beginner',
        $instructorId,
        'published'
    ]);
    
    $courseId1 = $pdo->lastInsertId();
    echo '<div style="color: green; margin: 10px 0;">✓ Course 1 created</div>';
    
    // Course 2
    $createCourse->execute([
        'Advanced React Techniques',
        'Master advanced React patterns, hooks, and state management.',
        149.99,
        129.99,
        'react',
        '15 hours',
        'advanced',
        $instructorId,
        'published'
    ]);
    
    $courseId2 = $pdo->lastInsertId();
    echo '<div style="color: green; margin: 10px 0;">✓ Course 2 created</div>';
    
    // Add course to cart
    $addToCart = $pdo->prepare("
        INSERT INTO user_cart (user_id, course_id)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE added_at = CURRENT_TIMESTAMP
    ");
    
    $addToCart->execute([$testUserId, $courseId1]);
    echo '<div style="color: green; margin: 10px 0;">✓ Course added to cart</div>';
    
    // Add purchased course
    $addPurchase = $pdo->prepare("
        INSERT INTO user_purchases (user_id, course_id, purchase_price, transaction_id)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE purchase_date = CURRENT_TIMESTAMP
    ");
    
    $transactionId = 'TEST-TRX-' . rand(10000, 99999);
    $addPurchase->execute([$testUserId, $courseId2, 129.99, $transactionId]);
    echo '<div style="color: green; margin: 10px 0;">✓ Course purchase recorded</div>';
    
    // Add course progress
    $addProgress = $pdo->prepare("
        INSERT INTO user_course_progress (user_id, course_id, progress_percentage)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            progress_percentage = VALUES(progress_percentage),
            last_accessed = CURRENT_TIMESTAMP
    ");
    
    $addProgress->execute([$testUserId, $courseId2, 35]);
    echo '<div style="color: green; margin: 10px 0;">✓ Course progress added</div>';
    
    // Commit all changes
    $pdo->commit();
    
    // Display test user credentials
    echo '<div style="margin-top: 30px; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;">';
    echo '<h2>Test User Credentials</h2>';
    echo '<table style="width: 100%; border-collapse: collapse;">';
    echo '<tr><th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">User Type</th><th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Email</th><th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Password</th></tr>';
    echo '<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;">Normal User</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">test@example.com</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">Test1234!</td></tr>';
    echo '<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;">Admin</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">admin@example.com</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">Test1234!</td></tr>';
    echo '<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;">Instructor</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">instructor@example.com</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">Test1234!</td></tr>';
    echo '</table>';
    
    echo '<div style="margin-top: 20px; color: red; font-weight: bold;">IMPORTANT: This file should only be used in local development.</div>';
    echo '</div>';
    
} catch (PDOException $e) {
    // Roll back the transaction on error
    $pdo->rollBack();
    
    echo '<div style="color: red; margin: 20px 0;">';
    echo '<h2>Error Creating Test Users</h2>';
    echo '<p>' . $e->getMessage() . '</p>';
    echo '</div>';
    
    // Add debugging information
    echo '<div style="margin-top: 20px; padding: 10px; border: 1px solid #ffcccc; background-color: #fff8f8;">';
    echo '<h3>Troubleshooting</h3>';
    echo '<p>Make sure:</p>';
    echo '<ul>';
    echo '<li>Your database connection is properly configured in db-config.php</li>';
    echo '<li>All required tables have been created using database-setup.sql</li>';
    echo '<li>You have the correct database permissions</li>';
    echo '</ul>';
    echo '</div>';
}
?>

<style>
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
    background-color: #f4f4f4;
}
h1 {
    color: #333;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
}
h2 {
    color: #444;
    margin-top: 0;
}
</style>
