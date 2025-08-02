<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include email service
require_once 'email-service.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Database configuration - UPDATED WITH YOUR ACTUAL DATABASE NAME
$host = 'localhost';
$db_username = 'u770934494_Shared_Base';
$db_password = 'Mirza.Ali!1';
$database = 'u770934494_User_Info';

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (!$input || !isset($input['name']) || !isset($input['email']) || !isset($input['password'])) {
        throw new Exception('Missing required fields');
    }
    
    // Sanitize input
    $name = trim($input['name']);
    $email = trim(strtolower($input['email']));
    $password = $input['password'];
    
    // Validation
    if (strlen($name) < 2) {
        throw new Exception('Name must be at least 2 characters long');
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Please enter a valid email address');
    }
    
    if (strlen($password) < 6) {
        throw new Exception('Password must be at least 6 characters long');
    }
    
    // Connect to database with detailed error reporting
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $db_username, $db_password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        // Log detailed connection error
        error_log("Database connection failed: " . $e->getMessage());
        throw new Exception("Database connection failed. Error: " . $e->getMessage() . " | Host: $host | DB: $database | User: $db_username");
    }
    
    // Check if users table exists, create if not
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        throw new Exception('Email already registered');
    }
    
    // Hash password
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
    $stmt->execute([$name, $email, $passwordHash]);
    
    $userId = $pdo->lastInsertId();
    
    // Send welcome email using the email service
    $email_sent = false;
    try {
        $emailService = new EmailService();
        $email_sent = $emailService->sendWelcomeEmail($email, $name);
    } catch (Exception $email_error) {
        // Log email error but don't fail the signup
        error_log("Welcome email failed: " . $email_error->getMessage());
    }
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Account created successfully! You can now sign in.' . ($email_sent ? ' Welcome email sent!' : ''),
        'user' => [
            'id' => $userId,
            'name' => $name,
            'email' => $email
        ],
        'email_sent' => $email_sent
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
