<?php
// Set appropriate headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow cross-origin requests
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get the JSON data from the request
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Check if we have valid data
if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
    exit;
}

// Extract form data
$name = filter_var($data['name'], FILTER_SANITIZE_STRING);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$message = filter_var($data['message'], FILTER_SANITIZE_STRING);
$subject = isset($data['subject']) ? filter_var($data['subject'], FILTER_SANITIZE_STRING) : 'New website message';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Set up email parameters
$to = 'your-email@example.com'; // Replace with your email address
$headers = [
    'From: ' . $name . ' <' . $email . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Format the email body
$email_body = "Name: $name\r\n";
$email_body .= "Email: $email\r\n\r\n";
$email_body .= "Message:\r\n$message\r\n";

// Try to send the email using PHP's mail function
$mail_result = mail($to, $subject, $email_body, implode("\r\n", $headers));

// Return the result
if ($mail_result) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    error_log("PHP mail function failed");
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
?>
