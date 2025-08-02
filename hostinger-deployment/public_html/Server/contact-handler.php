<?php
/**
 * Hostinger Contact Handler - Production Version
 * This handles contact form submissions for Virtual Solutions
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

// Log request for debugging
error_log("Contact form request received at: " . date('Y-m-d H:i:s'));

try {
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    // Validate required fields
    if (!$data || !isset($data['firstName']) || !isset($data['lastName']) || 
        !isset($data['email']) || !isset($data['message'])) {
        throw new Exception('Missing required fields');
    }
    
    $firstName = htmlspecialchars($data['firstName']);
    $lastName = htmlspecialchars($data['lastName']);
    $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars($data['message']);
    
    if (!$email) {
        throw new Exception('Invalid email address');
    }
    
    // Email configuration for Hostinger
    $to = 'contact@virtualsolutionspath.com';
    $subject = 'New Contact Form Message from ' . $firstName . ' ' . $lastName;
    
    // Create email content
    $emailContent = "
New contact form submission:

Name: {$firstName} {$lastName}
Email: {$email}
Message:
{$message}

Submitted: " . date('Y-m-d H:i:s') . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "
    ";
    
    // Email headers
    $headers = [
        'From: noreply@virtualsolutionspath.com',
        'Reply-To: ' . $email,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Priority: 1',
        'X-MSMail-Priority: High'
    ];
    
    // Send email
    $mailSent = mail($to, $subject, $emailContent, implode("\r\n", $headers));
    
    if ($mailSent) {
        // Log successful submission
        error_log("Contact form email sent successfully to: {$to}");
        
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you within 24 hours.'
        ]);
    } else {
        throw new Exception('Failed to send email');
    }
    
} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly at contact@virtualsolutionspath.com'
    ]);
}
?>
