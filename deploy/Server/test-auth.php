<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Test users for development
$test_users = [
    [
        'id' => 1,
        'first_name' => 'Test',
        'last_name' => 'User',
        'email' => 'test@example.com',
        'password' => password_hash('Test123!@#', PASSWORD_DEFAULT),
        'role' => 'user'
    ],
    [
        'id' => 2,
        'first_name' => 'Admin',
        'last_name' => 'User',
        'email' => 'admin@test.com',
        'password' => password_hash('Admin123!@#', PASSWORD_DEFAULT),
        'role' => 'admin'
    ]
];

// Get JSON input
$json = file_get_contents('php://input');
$data = json_decode($json);

if (!$data || !isset($data->action)) {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit();
}

switch ($data->action) {
    case 'login':
        if (!isset($data->email) || !isset($data->password)) {
            echo json_encode(['success' => false, 'message' => 'Email and password required']);
            exit();
        }

        $user = array_filter($test_users, function($u) use ($data) {
            return $u['email'] === $data->email && 
                   password_verify($data->password, $u['password']);
        });

        if (empty($user)) {
            echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
            exit();
        }

        $user = reset($user);
        unset($user['password']);

        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => $user
        ]);
        break;

    case 'get_cart':
        if (!isset($data->user_id)) {
            echo json_encode(['success' => false, 'message' => 'User ID required']);
            exit();
        }

        // Simulate cart count
        echo json_encode([
            'success' => true,
            'total_items' => rand(0, 5)
        ]);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
}
?>
