<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
        exit();
    }
    
    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $message = $input['message'] ?? '';
    
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit();
    }
    
    // Email settings
    $to = 'contact@virtualsolutionspath.com';
    $subject = 'New Contact Form Message from ' . $name;
    
    // Create email body
    $email_body = "You have received a new message from your website contact form:\n\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Message: " . $message . "\n\n";
    $email_body .= "---\n";
    $email_body .= "This message was sent from Virtual Solutions Path Contact Form\n";
    $email_body .= "Time: " . date('Y-m-d H:i:s') . "\n";
    
    // Email headers
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Try to send email
    if (mail($to, $subject, $email_body, $headers)) {
        // Log the successful submission
        $log_entry = date('Y-m-d H:i:s') . " - SUCCESS - " . $name . " (" . $email . ")\n";
        file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        echo json_encode([
            'success' => true, 
            'message' => 'Thank you for your message! We will get back to you within 2 hours during business hours.'
        ]);
    } else {
        // Log the failed submission
        $log_entry = date('Y-m-d H:i:s') . " - FAILED - " . $name . " (" . $email . ")\n";
        file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        echo json_encode([
            'success' => false, 
            'message' => 'Failed to send email. Please try again or contact us directly.'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>
