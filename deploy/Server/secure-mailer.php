<?php
/**
 * Secure Email Handler using PHPMailer
 * Compatible with Hostinger and other shared hosting providers
 */

// Set appropriate headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Enable error logging
error_log("Secure Email Handler started");

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

// Get the raw POST data (supports both JSON and form data)
$input = file_get_contents('php://input');
$isJson = false;

// Try to decode as JSON
$data = json_decode($input, true);
if (json_last_error() === JSON_ERROR_NONE) {
    $isJson = true;
} else {
    // If not JSON, use regular POST data
    $data = $_POST;
}

// Log the received data
error_log("Received data format: " . ($isJson ? "JSON" : "Form data"));
error_log("Received data: " . print_r($data, true));

// Extract form data with validation
$name = isset($data['name']) ? filter_var($data['name'], FILTER_SANITIZE_STRING) : '';
$email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : '';
$message = isset($data['message']) ? filter_var($data['message'], FILTER_SANITIZE_STRING) : '';
$subject = isset($data['subject']) ? filter_var($data['subject'], FILTER_SANITIZE_STRING) : 'New Website Message';

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    $missingFields = [];
    if (empty($name)) $missingFields[] = 'name';
    if (empty($email)) $missingFields[] = 'email';
    if (empty($message)) $missingFields[] = 'message';
    
    error_log("Missing fields: " . implode(', ', $missingFields));
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required. Missing: ' . implode(', ', $missingFields)]);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    error_log("Invalid email: $email");
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

// Load email configuration from separate file
$config_path = __DIR__ . '/email-config.php';
if (file_exists($config_path)) {
    $config = require $config_path;
    error_log("Email configuration loaded successfully");
} else {
    error_log("Email configuration file not found at: $config_path");
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Email configuration not found.']);
    exit;
}

// Path to PHPMailer classes
$phpmailer_path = __DIR__ . '/../../lib/';

// Check if PHPMailer files exist
if (!file_exists($phpmailer_path . 'PHPMailer.php') || 
    !file_exists($phpmailer_path . 'SMTP.php') || 
    !file_exists($phpmailer_path . 'Exception.php')) {
    error_log("PHPMailer files not found in path: $phpmailer_path");
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail system configuration error.']);
    exit;
}

// Include PHPMailer classes
require_once $phpmailer_path . 'PHPMailer.php';
require_once $phpmailer_path . 'SMTP.php';
require_once $phpmailer_path . 'Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {
    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    // Server settings
    $mail->SMTPDebug = 0;                      // Debug level: 0 = no output, 1 = basic, 2 = verbose
    $mail->isSMTP();                           // Use SMTP
    $mail->Host       = $config['smtp_host'];  // SMTP server
    $mail->SMTPAuth   = true;                  // Enable SMTP authentication
    $mail->Username   = $config['smtp_username']; // SMTP username
    $mail->Password   = $config['smtp_password']; // SMTP password
    $mail->SMTPSecure = $config['smtp_secure'];   // Encryption type
    $mail->Port       = $config['smtp_port'];     // TCP port
    $mail->CharSet    = 'UTF-8';               // Character set

    // Recipients
    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['to_email'], $config['to_name']); // Add a recipient
    $mail->addReplyTo($email, $name);                           // Reply to form submitter

    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    
    // Create HTML body with proper styling
    $htmlBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; padding: 20px; }
            .header { background-color: #f5f5f5; padding: 10px; border-bottom: 1px solid #e1e1e1; }
            .content { padding: 20px 0; }
            .footer { font-size: 12px; color: #777; border-top: 1px solid #e1e1e1; padding-top: 10px; }
            .field { margin-bottom: 10px; }
            .label { font-weight: bold; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Website Message</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Name:</span> ".htmlspecialchars($name)."
                </div>
                <div class='field'>
                    <span class='label'>Email:</span> ".htmlspecialchars($email)."
                </div>
                <div class='field'>
                    <span class='label'>Message:</span><br>
                    ".nl2br(htmlspecialchars($message))."
                </div>
            </div>
            <div class='footer'>
                This message was sent from your website contact form.
            </div>
        </div>
    </body>
    </html>";
    
    // Set HTML body
    $mail->Body = $htmlBody;
    
    // Create plain text alternative
    $textBody = "New Website Message\n\n";
    $textBody .= "Name: $name\n";
    $textBody .= "Email: $email\n";
    $textBody .= "Message:\n$message\n";
    
    $mail->AltBody = $textBody;

    // Send the email
    $mail->send();
    
    // Success response
    error_log("Email sent successfully to {$config['to_email']}");
    echo json_encode(['success' => true, 'message' => 'Email sent successfully.']);
} catch (Exception $e) {
    // Log the error
    error_log("PHPMailer Error: {$mail->ErrorInfo}");
    
    // Error response with detailed message
    echo json_encode([
        'success' => false, 
        'message' => 'Could not send email. Please try again later or contact us directly.',
        'debug' => $mail->ErrorInfo
    ]);
}
