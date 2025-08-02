<?php
// Include database connection
require_once 'db-config.php';

// Set headers to handle CORS and JSON responses
header("Access-Control-Allow-Origin: *"); // In production, replace * with your domain
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// If it's an OPTIONS request (preflight), return 200 status
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get JSON data from request
$json_data = file_get_contents('php://input');
$data = json_decode($json_data);

// If no data or not a POST request, return error
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !$data) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method or data format'
    ]);
    exit();
}

// Determine action (sign-up or sign-in)
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'signup':
        handleSignup($data);
        break;
    case 'signin':
        handleSignin($data);
        break;
    case 'contact':
        handleContactForm($data);
        break;
    default:
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid action specified'
        ]);
        break;
}

/**
 * Handle user signup
 * 
 * @param object $data User data from request
 */
function handleSignup($data) {
    global $pdo;
    
    // Validate required fields
    if (!isset($data->firstName) || !isset($data->lastName) || !isset($data->email) || !isset($data->password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Required fields missing'
        ]);
        return;
    }
    
    // Sanitize inputs
    $firstName = htmlspecialchars(strip_tags($data->firstName));
    $lastName = htmlspecialchars(strip_tags($data->lastName));
    $email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
    $password = $data->password; // Will be hashed below
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email format'
        ]);
        return;
    }
    
    try {
        // Check if email already exists
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
        $stmt->execute([$email]);
        
        if ($stmt->fetchColumn() > 0) {
            http_response_code(409); // Conflict
            echo json_encode([
                'success' => false,
                'message' => 'Email already registered'
            ]);
            return;
        }
        
        // Hash password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        // Insert new user
        $stmt = $pdo->prepare("
            INSERT INTO users (first_name, last_name, email, password, created_at) 
            VALUES (?, ?, ?, ?, NOW())
        ");
        
        $stmt->execute([$firstName, $lastName, $email, $hashedPassword]);
        
        // Return success
        http_response_code(201); // Created
        echo json_encode([
            'success' => true,
            'message' => 'Registration successful',
            'user' => [
                'firstName' => $firstName,
                'lastName' => $lastName,
                'email' => $email
            ]
        ]);
        
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Registration failed due to a server error'
        ]);
    }
}

/**
 * Handle user signin
 * 
 * @param object $data User credentials
 */
function handleSignin($data) {
    global $pdo;
    
    // Validate required fields
    if (!isset($data->email) || !isset($data->password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Email and password are required'
        ]);
        return;
    }
    
    // Sanitize inputs
    $email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
    $password = $data->password;
    
    try {
        // Get user by email
        $stmt = $pdo->prepare("SELECT id, first_name, last_name, email, password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        // If no user found or password doesn't match
        if (!$user || !password_verify($password, $user['password'])) {
            http_response_code(401); // Unauthorized
            echo json_encode([
                'success' => false,
                'message' => 'Invalid email or password'
            ]);
            return;
        }
        
        // Generate a simple session token (consider using JWT for a more robust solution)
        $token = bin2hex(random_bytes(32));
        
        // Store the token (in a real app, store in a sessions table)
        // This is simplified for this example
        
        // Return success with user info
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'id' => $user['id'],
                'firstName' => $user['first_name'],
                'lastName' => $user['last_name'],
                'email' => $user['email']
            ],
            'token' => $token
        ]);
        
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Login failed due to a server error'
        ]);
    }
}

/**
 * Handle contact form submissions
 * 
 * @param object $data Contact form data
 */
function handleContactForm($data) {
    global $pdo;
    
    // Validate required fields
    if (!isset($data->firstName) || !isset($data->lastName) || !isset($data->email) || !isset($data->message)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Required fields missing'
        ]);
        return;
    }
    
    // Sanitize inputs
    $firstName = htmlspecialchars(strip_tags($data->firstName));
    $lastName = htmlspecialchars(strip_tags($data->lastName));
    $email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
    $service = isset($data->service) ? htmlspecialchars(strip_tags($data->service)) : '';
    $company = isset($data->company) ? htmlspecialchars(strip_tags($data->company)) : '';
    $budget = isset($data->budget) ? htmlspecialchars(strip_tags($data->budget)) : '';
    $message = htmlspecialchars(strip_tags($data->message));
    
    try {
        // Insert contact submission
        $stmt = $pdo->prepare("
            INSERT INTO contact_submissions (first_name, last_name, email, service, company, budget, message, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
        ");
        
        $stmt->execute([$firstName, $lastName, $email, $service, $company, $budget, $message]);
        
        // Return success
        echo json_encode([
            'success' => true,
            'message' => 'Contact form submission successful'
        ]);
        
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Contact form submission failed due to a server error'
        ]);
    }
}
?>
