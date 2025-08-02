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
error_log("Received contact form data: " . print_r($data, true));

// Check if required fields are present
if (!isset($data->firstName) || !isset($data->lastName) || 
    !isset($data->email) || !isset($data->message)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Required fields missing: firstName, lastName, email, and message are required'
    ]);
    exit();
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
    // Insert contact submission into database
    $stmt = $pdo->prepare("
        INSERT INTO contact_submissions (first_name, last_name, email, service, company, budget, message, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    ");
    
    $stmt->execute([$firstName, $lastName, $email, $service, $company, $budget, $message]);
    
    // Optional: Send notification email to admin
    $adminEmail = "mradvision.cop@gmail.com"; // Replace with your admin email
    $subject = "New Contact Form Submission: {$service}";
    
    $emailBody = "
        New contact form submission received:
        
        Name: {$firstName} {$lastName}
        Email: {$email}
        Service: {$service}
        Company: {$company}
        Budget: {$budget}
        
        Message:
        {$message}
        
        Submitted on: " . date('Y-m-d H:i:s') . "
    ";
    
    // Simple email headers
    $headers = "From: noreply@" . $_SERVER['SERVER_NAME'] . "\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Attempt to send notification email
    $mailSent = mail($adminEmail, $subject, $emailBody, $headers);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Contact form submission successful',
        'notificationSent' => $mailSent
    ]);
    
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Contact form submission failed due to a server error: ' . $e->getMessage()
    ]);
}
?>
