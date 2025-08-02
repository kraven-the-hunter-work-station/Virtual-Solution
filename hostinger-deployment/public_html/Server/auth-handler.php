<?php
/**
 * Authentication Handler for Virtual Solutions
 * Handles login and signup requests
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Only POST method is allowed'
    ]);
    exit();
}

// Get action parameter
$action = $_GET['action'] ?? '';

if (!$action) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'No action specified'
    ]);
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid JSON data'
    ]);
    exit();
}

// Mock user database (in production, use real database)
$users = [
    [
        'id' => 1,
        'firstName' => 'Test',
        'lastName' => 'User',
        'email' => 'test@example.com',
        'password' => password_hash('Test1234!', PASSWORD_DEFAULT),
        'role' => 'user'
    ],
    [
        'id' => 2,
        'firstName' => 'Admin',
        'lastName' => 'User',
        'email' => 'admin@virtualsolutionspath.com',
        'password' => password_hash('Admin123!', PASSWORD_DEFAULT),
        'role' => 'admin'
    ]
];

switch ($action) {
    case 'login':
        handleLogin($data, $users);
        break;
    case 'signup':
        handleSignup($data, $users);
        break;
    default:
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid action'
        ]);
}

function handleLogin($data, $users) {
    if (!isset($data['email']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Email and password are required'
        ]);
        return;
    }
    
    $email = strtolower(trim($data['email']));
    $password = $data['password'];
    
    // Find user
    $user = null;
    foreach ($users as $u) {
        if (strtolower($u['email']) === $email) {
            $user = $u;
            break;
        }
    }
    
    if ($user && password_verify($password, $user['password'])) {
        // Generate token
        $token = bin2hex(random_bytes(32));
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'id' => $user['id'],
                'firstName' => $user['firstName'],
                'lastName' => $user['lastName'],
                'email' => $user['email'],
                'role' => $user['role']
            ],
            'token' => $token,
            'expires' => date('Y-m-d H:i:s', strtotime('+30 days'))
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email or password'
        ]);
    }
}

function handleSignup($data, $users) {
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Name, email and password are required'
        ]);
        return;
    }
    
    $name = trim($data['name']);
    $email = strtolower(trim($data['email']));
    $password = $data['password'];
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email address'
        ]);
        return;
    }
    
    // Check if email already exists
    foreach ($users as $u) {
        if (strtolower($u['email']) === $email) {
            http_response_code(409);
            echo json_encode([
                'success' => false,
                'message' => 'Email already registered'
            ]);
            return;
        }
    }
    
    // Validate password
    if (strlen($password) < 8) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Password must be at least 8 characters long'
        ]);
        return;
    }
    
    // Parse name
    $nameParts = explode(' ', $name, 2);
    $firstName = $nameParts[0];
    $lastName = isset($nameParts[1]) ? $nameParts[1] : '';
    
    // In production, save to database
    // For now, just return success
    $newUserId = count($users) + 1;
    $token = bin2hex(random_bytes(32));
    
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'user' => [
            'id' => $newUserId,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'role' => 'user'
        ],
        'token' => $token,
        'expires' => date('Y-m-d H:i:s', strtotime('+30 days'))
    ]);
}
?>
