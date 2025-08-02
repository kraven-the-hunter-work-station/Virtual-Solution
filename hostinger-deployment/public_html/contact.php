<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

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

// Email configuration - USING YOUR EXISTING GMAIL SETUP
$to_email = 'mradvision.cop@gmail.com';
$from_email = 'noreply@adsvisionmarketing.com';

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (!$input || !isset($input['firstName']) || !isset($input['lastName']) || 
        !isset($input['email']) || !isset($input['message'])) {
        throw new Exception('Missing required fields');
    }
    
    // Sanitize input (fixed deprecated FILTER_SANITIZE_STRING)
    $firstName = trim(strip_tags($input['firstName']));
    $lastName = trim(strip_tags($input['lastName']));
    $email = filter_var($input['email'], FILTER_VALIDATE_EMAIL);
    $company = isset($input['company']) ? trim(strip_tags($input['company'])) : '';
    $service = isset($input['service']) ? trim(strip_tags($input['service'])) : '';
    $budget = isset($input['budget']) ? trim(strip_tags($input['budget'])) : '';
    $message = trim(strip_tags($input['message']));
    
    if (!$email) {
        throw new Exception('Invalid email address');
    }
    
    // Connect to database
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $db_username, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create contact_submissions table if it doesn't exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(200),
        service VARCHAR(100),
        budget VARCHAR(50),
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Insert into database
    $stmt = $pdo->prepare("
        INSERT INTO contact_submissions 
        (first_name, last_name, email, company, service, budget, message) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([$firstName, $lastName, $email, $company, $service, $budget, $message]);
    
    // Send email notification (with better error handling)
    $subject = "New Contact Form Submission - AdsVision Marketing";
    $email_body = "New contact form submission received:\n\n";
    $email_body .= "Name: $firstName $lastName\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Company: $company\n";
    $email_body .= "Service: $service\n";
    $email_body .= "Budget: $budget\n\n";
    $email_body .= "Message:\n$message\n\n";
    $email_body .= "Submitted at: " . date('Y-m-d H:i:s');
    
    $headers = "From: $from_email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Try to send email (don't fail if email fails)
    $email_sent = false;
    try {
        $email_sent = mail($to_email, $subject, $email_body, $headers);
    } catch (Exception $mail_error) {
        // Log email error but don't fail the submission
        error_log("Email sending failed: " . $mail_error->getMessage());
    }
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Contact form submitted successfully',
        'emailSent' => $email_sent
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Server error: ' . $e->getMessage()
    ]);
}
?>
