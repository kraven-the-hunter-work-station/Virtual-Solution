<?php
// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('error_log', 'auth_errors.log');

// Set CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Log the request
error_log("Auth request received: " . date('Y-m-d H:i:s'));

// Handle preflight CORS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Test users database
$users = [
    [
        'id' => 1,
        'firstName' => 'Test',
        'lastName' => 'User',
        'email' => 'test@example.com',
        'password' => 'test123', // In production, this would be hashed
        'role' => 'user'
    ],
    [
        'id' => 2,
        'firstName' => 'Admin',
        'lastName' => 'User',
        'email' => 'admin@test.com',
        'password' => 'admin123',
        'role' => 'admin'
    ]
];

// Get POST data
$raw_data = file_get_contents('php://input');
error_log("Received data: " . $raw_data);

$data = json_decode($raw_data);

if (!$data) {
    error_log("Invalid JSON data received");
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request data'
    ]);
    exit();
}

// Find user by email
$user = null;
foreach ($users as $u) {
    if ($u['email'] === $data->email) {
        $user = $u;
        break;
    }
}

// Check credentials
if ($user && $user['password'] === $data->password) {
    // Remove sensitive data
    unset($user['password']);
    
    // Generate a simple token
    $token = bin2hex(random_bytes(32));
    
    $response = [
        'status' => 'success',
        'message' => 'Login successful',
        'user' => $user,
        'token' => $token
    ];
    
    error_log("Login successful for user: " . $user['email']);
} else {
    $response = [
        'status' => 'error',
        'message' => 'Invalid email or password'
    ];
    
    error_log("Login failed - Invalid credentials");
}

echo json_encode($response);
