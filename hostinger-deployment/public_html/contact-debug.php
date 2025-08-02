<?php
// Simple Contact Form Debug Version
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Log request details
error_log("Contact form debug - Request received");
error_log("Request method: " . $_SERVER['REQUEST_METHOD']);
error_log("Content type: " . ($_SERVER['CONTENT_TYPE'] ?? 'not set'));

try {
    // Get input
    $raw_input = file_get_contents('php://input');
    error_log("Raw input: " . $raw_input);
    
    $input = json_decode($raw_input, true);
    error_log("Decoded input: " . print_r($input, true));
    
    if (!$input) {
        throw new Exception('No JSON data received');
    }
    
    // Simple validation
    $required_fields = ['firstName', 'lastName', 'email', 'message'];
    foreach ($required_fields as $field) {
        if (!isset($input[$field]) || empty(trim($input[$field]))) {
            throw new Exception("Missing required field: $field");
        }
    }
    
    // Basic database test
    $host = 'localhost';
    $username = 'u770934494_shared_user';
    $password = '1qWERTYUIOP!';
    $database = 'u770934494_shared_users';
    
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Test table creation
    $pdo->exec("CREATE TABLE IF NOT EXISTS contact_submissions_test (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Test insert
    $stmt = $pdo->prepare("INSERT INTO contact_submissions_test (first_name, last_name, email, message) VALUES (?, ?, ?, ?)");
    $result = $stmt->execute([
        trim($input['firstName']),
        trim($input['lastName']),
        trim($input['email']),
        trim($input['message'])
    ]);
    
    error_log("Database insert result: " . ($result ? 'success' : 'failed'));
    
    echo json_encode([
        'success' => true,
        'message' => 'Contact form submitted successfully (debug mode)',
        'debug' => [
            'database_insert' => $result,
            'received_fields' => array_keys($input)
        ]
    ]);
    
} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage(),
        'debug' => [
            'php_version' => phpversion(),
            'error_file' => $e->getFile(),
            'error_line' => $e->getLine()
        ]
    ]);
}
?>
