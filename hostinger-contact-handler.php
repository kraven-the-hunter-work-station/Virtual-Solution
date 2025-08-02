<?php
// Hostinger Business Email Contact Form Handler
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
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
    
    // Validate required fields
    $firstName = trim($input['firstName'] ?? '');
    $lastName = trim($input['lastName'] ?? '');
    $email = trim($input['email'] ?? '');
    $message = trim($input['message'] ?? '');
    
    if (empty($firstName) || empty($lastName) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit();
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit();
    }
    
    // Email configuration for Hostinger Business Email
    $to = 'contact@virtualsolutionspath.com';
    $subject = 'New Contact Form Message from ' . $firstName . ' ' . $lastName;
    
    // Create email body
    $email_body = "You have received a new message from your website contact form:\n\n";
    $email_body .= "Name: " . $firstName . " " . $lastName . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Message:\n" . $message . "\n\n";
    $email_body .= "---\n";
    $email_body .= "This message was sent from Virtual Solutions Path Contact Form\n";
    $email_body .= "Time: " . date('Y-m-d H:i:s') . "\n";
    $email_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    // Email headers for Hostinger Business Email
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Return-Path: contact@virtualsolutionspath.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "X-Originating-IP: " . $_SERVER['REMOTE_ADDR'] . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Try to send email using PHP mail() function
    // This works well with Hostinger business email
    if (mail($to, $subject, $email_body, $headers)) {
        // Log successful submission
        $log_entry = date('Y-m-d H:i:s') . " - SUCCESS - " . $firstName . " " . $lastName . " (" . $email . ") - IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
        error_log($log_entry, 3, 'contact_form_log.txt');
        
        // Send auto-reply to the sender
        $auto_reply_subject = "Thank you for contacting Virtual Solutions Path";
        $auto_reply_body = "Dear " . $firstName . ",\n\n";
        $auto_reply_body .= "Thank you for your message. We have received your inquiry and will get back to you within 2 hours during business hours.\n\n";
        $auto_reply_body .= "Your message:\n" . $message . "\n\n";
        $auto_reply_body .= "Best regards,\n";
        $auto_reply_body .= "Virtual Solutions Path Team\n";
        $auto_reply_body .= "contact@virtualsolutionspath.com";
        
        $auto_reply_headers = "From: contact@virtualsolutionspath.com\r\n";
        $auto_reply_headers .= "Reply-To: contact@virtualsolutionspath.com\r\n";
        $auto_reply_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // Send auto-reply
        mail($email, $auto_reply_subject, $auto_reply_body, $auto_reply_headers);
        
        echo json_encode([
            'success' => true, 
            'message' => 'Thank you for your message! We will get back to you within 2 hours during business hours. Please check your email for a confirmation.'
        ]);
    } else {
        // Log failed submission
        $log_entry = date('Y-m-d H:i:s') . " - FAILED - " . $firstName . " " . $lastName . " (" . $email . ") - IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
        error_log($log_entry, 3, 'contact_form_log.txt');
        
        echo json_encode([
            'success' => false, 
            'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly at contact@virtualsolutionspath.com'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>
