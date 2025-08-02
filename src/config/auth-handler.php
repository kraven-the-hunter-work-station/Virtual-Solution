<?php
// Include database connection
require_once 'db-config.php';

// Set headers to handle CORS and JSON responses
header("Access-Control-Allow-Origin: *"); // In production, replace * with your domain
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

// Check what action is requested - check both GET and POST/JSON data
$action = isset($_GET['action']) ? $_GET['action'] : '';

// If no action in URL, check in the data
if (!$action && isset($data->action)) {
    $action = $data->action;
}

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
    case 'signup':
        handleSignup($data, $pdo);
        break;
    case 'login':
        handleLogin($data, $pdo);
        break;
    case 'check':
        checkSession($data, $pdo);
        break;
    case 'logout':
        handleLogout($data);
        break;
    default:
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid action'
        ]);
}

/**
 * Handle user signup
 */
function handleSignup($data, $pdo) {
    // Validate required fields
    if (!isset($data->firstName) || !isset($data->lastName) || !isset($data->email) || !isset($data->password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Missing required fields'
        ]);
        return;
    }
    
    // Sanitize inputs
    $firstName = htmlspecialchars(strip_tags($data->firstName));
    $lastName = htmlspecialchars(strip_tags($data->lastName));
    $email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
    $password = $data->password;
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email format'
        ]);
        return;
    }
    
    // Validate password strength (min 8 chars with at least 1 number and 1 uppercase letter)
    if (strlen($password) < 8 || !preg_match('/[0-9]/', $password) || !preg_match('/[A-Z]/', $password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Password must be at least 8 characters long and contain at least one number and one uppercase letter'
        ]);
        return;
    }
    
    try {
        // Check if user already exists
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
        $stmt->execute([$email]);
        
        if ($stmt->fetchColumn() > 0) {
            http_response_code(409); // Conflict
            echo json_encode([
                'success' => false,
                'message' => 'Email is already registered'
            ]);
            return;
        }
        
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        // Insert the new user
        $stmt = $pdo->prepare("
            INSERT INTO users (first_name, last_name, email, password, created_at) 
            VALUES (?, ?, ?, ?, NOW())
        ");
        
        $stmt->execute([$firstName, $lastName, $email, $hashedPassword]);
        
        // Generate a session token
        $userId = $pdo->lastInsertId();
        $token = bin2hex(random_bytes(32));
        $expiry = date('Y-m-d H:i:s', strtotime('+30 days'));
        
        // Store the session
        $stmt = $pdo->prepare("
            INSERT INTO user_sessions (user_id, token, ip_address, user_agent, expires_at)
            VALUES (?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $userId, 
            $token, 
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
            $expiry
        ]);
        
        // Return success response
        echo json_encode([
            'success' => true,
            'message' => 'Registration successful',
            'user' => [
                'id' => $userId,
                'firstName' => $firstName,
                'lastName' => $lastName,
                'email' => $email
            ],
            'token' => $token,
            'expires' => $expiry
        ]);
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Registration failed due to a server error'
        ]);
    }
}

/**
 * Handle user login
 */
function handleLogin($data, $pdo) {
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
        // Find user by email
        $stmt = $pdo->prepare("SELECT id, first_name, last_name, email, password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        // Check if user exists and verify password
        if (!$user || !password_verify($password, $user['password'])) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid email or password'
            ]);
            return;
        }
        
        // Generate a session token
        $token = bin2hex(random_bytes(32));
        $expiry = date('Y-m-d H:i:s', strtotime('+30 days'));
        
        // Store the session
        $stmt = $pdo->prepare("
            INSERT INTO user_sessions (user_id, token, ip_address, user_agent, expires_at)
            VALUES (?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $user['id'], 
            $token, 
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
            $expiry
        ]);
        
        // Update last login time
        $stmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
        $stmt->execute([$user['id']]);
        
        // Return success response
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'id' => $user['id'],
                'firstName' => $user['first_name'],
                'lastName' => $user['last_name'],
                'email' => $user['email']
            ],
            'token' => $token,
            'expires' => $expiry
        ]);
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Login failed due to a server error'
        ]);
    }
}

/**
 * Check if session is valid
 */
function checkSession($data, $pdo) {
    // Check if token is provided
    if (!isset($data->token)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'No authentication token provided'
        ]);
        return;
    }
    
    $token = $data->token;
    
    try {
        // Find session by token
        $stmt = $pdo->prepare("
            SELECT us.id, us.user_id, us.expires_at, u.first_name, u.last_name, u.email 
            FROM user_sessions us
            JOIN users u ON us.user_id = u.id
            WHERE us.token = ? AND us.expires_at > NOW()
        ");
        $stmt->execute([$token]);
        $session = $stmt->fetch();
        
        // Check if session exists and is valid
        if (!$session) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid or expired session'
            ]);
            return;
        }
        
        // Return user data
        echo json_encode([
            'success' => true,
            'message' => 'Session is valid',
            'user' => [
                'id' => $session['user_id'],
                'firstName' => $session['first_name'],
                'lastName' => $session['last_name'],
                'email' => $session['email']
            ],
            'expires' => $session['expires_at']
        ]);
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Session verification failed due to a server error'
        ]);
    }
}

/**
 * Handle logout
 */
function handleLogout($data) {
    // Check if token is provided
    if (!isset($data->token)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'No authentication token provided'
        ]);
        return;
    }
    
    $token = $data->token;
    
    try {
        global $pdo;
        
        // Delete the session
        $stmt = $pdo->prepare("DELETE FROM user_sessions WHERE token = ?");
        $stmt->execute([$token]);
        
        // Return success response
        echo json_encode([
            'success' => true,
            'message' => 'Logout successful'
        ]);
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Logout failed due to a server error'
        ]);
    }
}

/**
 * Add course to cart
 * 
 * @param int $user_id The user ID
 * @param int $course_id The course ID
 * @return void
 */
function addToCart($user_id, $course_id) {
    global $pdo;
    
    try {
        // Check if the course is already in the cart
        $stmt = $pdo->prepare("SELECT id FROM user_cart WHERE user_id = ? AND course_id = ?");
        $stmt->execute([$user_id, $course_id]);
        
        if ($stmt->rowCount() > 0) {
            // Course already in cart
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Course is already in your cart'
            ]);
            return;
        }
        
        // Add course to cart
        $stmt = $pdo->prepare("INSERT INTO user_cart (user_id, course_id) VALUES (?, ?)");
        $stmt->execute([$user_id, $course_id]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Course added to cart successfully'
        ]);
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to add course to cart due to a server error'
        ]);
    }
}

/**
 * Remove course from cart
 * 
 * @param int $user_id The user ID
 * @param int $course_id The course ID
 * @return void
 */
function removeFromCart($user_id, $course_id) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("DELETE FROM user_cart WHERE user_id = ? AND course_id = ?");
        $stmt->execute([$user_id, $course_id]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'success' => true,
                'message' => 'Course removed from cart successfully'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Course was not in your cart'
            ]);
        }
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to remove course from cart due to a server error'
        ]);
    }
}

/**
 * Get user's cart
 * 
 * @param int $user_id The user ID
 * @return void
 */
function getUserCart($user_id) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT c.*, uc.added_at 
            FROM user_cart uc
            JOIN courses c ON uc.course_id = c.id
            WHERE uc.user_id = ?
            ORDER BY uc.added_at DESC
        ");
        $stmt->execute([$user_id]);
        
        $cart_items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'cart_items' => $cart_items,
            'total_items' => count($cart_items)
        ]);
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to retrieve cart due to a server error'
        ]);
    }
}

/**
 * Purchase courses from cart
 * 
 * @param int $user_id The user ID
 * @return void
 */
function purchaseFromCart($user_id) {
    global $pdo;
    
    try {
        // Begin transaction
        $pdo->beginTransaction();
        
        // Get cart items
        $stmt = $pdo->prepare("
            SELECT uc.course_id, c.price, c.discount_price 
            FROM user_cart uc
            JOIN courses c ON uc.course_id = c.id
            WHERE uc.user_id = ?
        ");
        $stmt->execute([$user_id]);
        $cart_items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if (empty($cart_items)) {
            echo json_encode([
                'success' => false,
                'message' => 'Your cart is empty'
            ]);
            return;
        }
        
        $transaction_id = 'TRX' . time() . rand(1000, 9999);
        $purchased_courses = [];
        
        // Add each course to purchases
        foreach ($cart_items as $item) {
            $course_id = $item['course_id'];
            // Use discount price if available, otherwise use regular price
            $price = $item['discount_price'] ?? $item['price'];
            
            $stmt = $pdo->prepare("
                INSERT INTO user_purchases (user_id, course_id, purchase_price, transaction_id) 
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE purchase_date = CURRENT_TIMESTAMP
            ");
            $stmt->execute([$user_id, $course_id, $price, $transaction_id]);
            
            $purchased_courses[] = $course_id;
        }
        
        // Clear the cart after successful purchase
        $stmt = $pdo->prepare("DELETE FROM user_cart WHERE user_id = ?");
        $stmt->execute([$user_id]);
        
        // Commit transaction
        $pdo->commit();
        
        echo json_encode([
            'success' => true,
            'message' => 'Purchase successful',
            'transaction_id' => $transaction_id,
            'purchased_courses' => $purchased_courses
        ]);
        
    } catch (PDOException $e) {
        // Rollback transaction on error
        $pdo->rollBack();
        error_log("Database error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to complete purchase due to a server error'
        ]);
    }
}

/**
 * Get user's purchased courses
 * 
 * @param int $user_id The user ID
 * @return void
 */
function getUserPurchases($user_id) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT c.*, up.purchase_date, up.purchase_price, 
                   COALESCE(ucp.progress_percentage, 0) as progress_percentage,
                   ucp.completion_date
            FROM user_purchases up
            JOIN courses c ON up.course_id = c.id
            LEFT JOIN user_course_progress ucp ON up.user_id = ucp.user_id AND up.course_id = ucp.course_id
            WHERE up.user_id = ?
            ORDER BY up.purchase_date DESC
        ");
        $stmt->execute([$user_id]);
        
        $purchases = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'purchases' => $purchases,
            'total_courses' => count($purchases)
        ]);
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to retrieve purchases due to a server error'
        ]);
    }
}

// Handle the action parameter to determine which function to call
if ($data && property_exists($data, 'action')) {
    switch ($data->action) {
        case 'register':
            registerUser($data);
            break;
        case 'login':
            loginUser($data);
            break;
        case 'verify_session':
            verifySession($data);
            break;
        case 'logout':
            logoutUser($data);
            break;
        case 'add_to_cart':
            if (!property_exists($data, 'user_id') || !property_exists($data, 'course_id')) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'User ID and Course ID are required']);
                break;
            }
            addToCart($data->user_id, $data->course_id);
            break;
        case 'remove_from_cart':
            if (!property_exists($data, 'user_id') || !property_exists($data, 'course_id')) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'User ID and Course ID are required']);
                break;
            }
            removeFromCart($data->user_id, $data->course_id);
            break;
        case 'get_cart':
            if (!property_exists($data, 'user_id')) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'User ID is required']);
                break;
            }
            getUserCart($data->user_id);
            break;
        case 'purchase':
            if (!property_exists($data, 'user_id')) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'User ID is required']);
                break;
            }
            purchaseFromCart($data->user_id);
            break;
        case 'get_purchases':
            if (!property_exists($data, 'user_id')) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'User ID is required']);
                break;
            }
            getUserPurchases($data->user_id);
            break;
        default:
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid action specified']);
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No action specified']);
}
?>
