<?php
/**
 * Local Authentication Mock
 * 
 * This file provides a mock authentication implementation for local development
 * when a proper MySQL connection cannot be established.
 */

// Set headers to handle CORS and JSON responses
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// If it's an OPTIONS request (preflight), return 200 status
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        'success' => false,
        'message' => 'Only POST method is allowed'
    ]);
    exit();
}

// Get JSON data from request
$json_data = file_get_contents('php://input');
$data = json_decode($json_data);

// If no data received, check for form data
if (!$data) {
    $data = (object) $_POST;
}

// Log the received data for debugging
error_log("Received auth request: " . print_r($data, true));

// Define test users (these would normally be in the database)
$test_users = [
    [
        'id' => 1,
        'email' => 'test@example.com',
        'password' => '$2y$10$Nar7dF6HfGXmGDX9yN3Zau.CFcQOZZP2nXRwQH4K4iprRjCCGPyx.', // Hashed 'Test1234!'
        'first_name' => 'Test',
        'last_name' => 'User',
        'role' => 'user'
    ],
    [
        'id' => 2,
        'email' => 'admin@example.com',
        'password' => '$2y$10$Nar7dF6HfGXmGDX9yN3Zau.CFcQOZZP2nXRwQH4K4iprRjCCGPyx.', // Hashed 'Test1234!'
        'first_name' => 'Admin',
        'last_name' => 'User',
        'role' => 'admin'
    ]
];

// Get action from data or query string
$action = isset($data->action) ? $data->action : (isset($_GET['action']) ? $_GET['action'] : '');

if (!$action) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'No action specified'
    ]);
    exit();
}

// Handle different actions
switch ($action) {
    case 'login':
        handleLogin($data, $test_users);
        break;
    case 'signup':
        handleSignup($data);
        break;
    case 'check':
        checkSession($data);
        break;
    case 'logout':
        handleLogout();
        break;
    default:
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid action'
        ]);
}

/**
 * Mock login function
 */
function handleLogin($data, $test_users) {
    // Validate required fields
    if (!isset($data->email) || !isset($data->password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Email and password are required'
        ]);
        return;
    }
    
    // Find matching user
    $found_user = null;
    foreach ($test_users as $user) {
        if ($user['email'] === $data->email) {
            $found_user = $user;
            break;
        }
    }
    
    // Check if user exists and password matches
    if ($found_user && password_verify($data->password, $found_user['password'])) {
        // Generate token
        $token = bin2hex(random_bytes(32));
        $expiry = date('Y-m-d H:i:s', strtotime('+30 days'));
        
        // Return success response
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'id' => $found_user['id'],
                'firstName' => $found_user['first_name'],
                'lastName' => $found_user['last_name'],
                'email' => $found_user['email'],
                'role' => $found_user['role']
            ],
            'token' => $token,
            'expires' => $expiry
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email or password'
        ]);
    }
}

/**
 * Mock signup function
 */
function handleSignup($data) {
    // In a mock implementation, we'll just pretend the signup worked
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'user' => [
            'id' => 3,
            'firstName' => $data->firstName ?? 'New',
            'lastName' => $data->lastName ?? 'User',
            'email' => $data->email ?? 'new@example.com'
        ],
        'token' => bin2hex(random_bytes(32)),
        'expires' => date('Y-m-d H:i:s', strtotime('+30 days'))
    ]);
}

/**
 * Mock session check
 */
function checkSession($data) {
    // In a mock implementation, we'll just pretend the token is valid
    if (isset($data->token)) {
        echo json_encode([
            'success' => true,
            'message' => 'Session is valid',
            'user' => [
                'id' => 1,
                'firstName' => 'Test',
                'lastName' => 'User',
                'email' => 'test@example.com'
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid or missing token'
        ]);
    }
}

/**
 * Mock logout function
 */
function handleLogout() {
    echo json_encode([
        'success' => true,
        'message' => 'Logout successful'
    ]);
}
