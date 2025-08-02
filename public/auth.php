<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Log the request
file_put_contents('auth.log', date('Y-m-d H:i:s') . ' - Request received' . PHP_EOL, FILE_APPEND);

// Handle preflight CORS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Test user
$test_user = [
    'id' => 1,
    'email' => 'test@example.com',
    'password' => 'test123',
    'first_name' => 'Test',
    'last_name' => 'User'
];

// Get POST data
$raw_data = file_get_contents('php://input');
file_put_contents('auth.log', date('Y-m-d H:i:s') . ' - Received data: ' . $raw_data . PHP_EOL, FILE_APPEND);

$data = json_decode($raw_data);

// Check credentials
if ($data && isset($data->email) && isset($data->password)) {
    if ($data->email === $test_user['email'] && $data->password === $test_user['password']) {
        $response = [
            'success' => true,
            'user' => array_diff_key($test_user, ['password' => '']),
            'message' => 'Login successful'
        ];
    } else {
        $response = [
            'success' => false,
            'message' => 'Invalid credentials'
        ];
    }
} else {
    $response = [
        'success' => false,
        'message' => 'Missing email or password'
    ];
}

echo json_encode($response);
file_put_contents('auth.log', date('Y-m-d H:i:s') . ' - Sent response: ' . json_encode($response) . PHP_EOL, FILE_APPEND);
