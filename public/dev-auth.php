<?php
// Development only auth system - DO NOT USE IN PRODUCTION

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('error_log', 'dev_auth.log');

// Set CORS headers specifically for localhost:5173
if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === 'http://localhost:5173') {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');
} else {
    error_log('Invalid origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? 'none'));
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Invalid origin']);
    exit();
}

header('Content-Type: application/json');

// Log the request
error_log("\n--- New Request ---");
error_log("Time: " . date('Y-m-d H:i:s'));
error_log("Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Origin: " . ($_SERVER['HTTP_ORIGIN'] ?? 'none'));

// Handle preflight CORS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Development test account
$DEV_USER = [
    'id' => 999,
    'firstName' => 'Dev',
    'lastName' => 'User',
    'email' => 'dev@local',
    'password' => 'dev123',  // In production, never store plain text passwords
    'role' => 'admin'
];

// Get POST data
$raw_data = file_get_contents('php://input');
error_log("Received data: " . $raw_data);

$data = json_decode($raw_data);

if (!$data) {
    error_log("Invalid JSON received");
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request data'
    ]);
    exit();
}

// Super simple login check
if ($data->email === $DEV_USER['email'] && $data->password === $DEV_USER['password']) {
    // Create a development session
    $dev_user = $DEV_USER;
    unset($dev_user['password']); // Don't send password back
    
    $response = [
        'status' => 'success',
        'message' => 'Development login successful',
        'user' => $dev_user,
        'token' => 'dev_' . bin2hex(random_bytes(16)),
        'dev_mode' => true
    ];
    
    error_log("Development login successful for: " . $dev_user['email']);
} else {
    $response = [
        'status' => 'error',
        'message' => 'Invalid credentials. Use dev@local / dev123 for development'
    ];
    error_log("Login failed - Invalid credentials provided");
}

echo json_encode($response);
