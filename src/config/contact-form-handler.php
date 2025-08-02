<?php
// Set appropriate headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 1);
error_log("Contact form handler started");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Log raw input data
    error_log("Raw input data: " . print_r($input, true));
    
    $firstName = isset($input['firstName']) ? htmlspecialchars(trim($input['firstName'])) : '';
    $lastName = isset($input['lastName']) ? htmlspecialchars(trim($input['lastName'])) : '';
    $email = isset($input['email']) ? htmlspecialchars(trim($input['email'])) : '';
    $message = isset($input['message']) ? htmlspecialchars(trim($input['message'])) : '';
    
    // Log processed values
    error_log("Processed values - Name: $firstName $lastName, Email: $email");

    // Input validation
    if (empty($firstName) || empty($lastName) || empty($email) || empty($message)) {
        $missingFields = [];
        if (empty($firstName)) $missingFields[] = 'firstName';
        if (empty($lastName)) $missingFields[] = 'lastName';
        if (empty($email)) $missingFields[] = 'email';
        if (empty($message)) $missingFields[] = 'message';
        
        error_log("Missing fields: " . implode(', ', $missingFields));
        echo json_encode(['success' => false, 'message' => 'All fields are required. Missing: ' . implode(', ', $missingFields)]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
        exit;
    }

    // Your business email where you want to receive messages
    $toEmail = 'contact@virtualsolutionspath.com';
    $fullName = $firstName . ' ' . $lastName;
    
    // Email subject
    $subject = 'New Contact Form Message from ' . $fullName;
    
    // Email body
    $body = "
New message from your website contact form:

Name: $fullName
Email: $email

Message:
$message

---
Sent from Virtual Solutions Path Contact Form
Time: " . date('Y-m-d H:i:s') . "
IP: " . $_SERVER['REMOTE_ADDR'] . "
";

    // Email headers
    $headers = [
        'From: noreply@virtualsolutionspath.com',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    // Try to send email using PHP's mail function
    error_log("Attempting to send email to: $toEmail");
    error_log("Subject: $subject");
    error_log("Headers: " . implode("\n", $headers));
    
    $mailSent = mail($toEmail, $subject, $body, implode("\r\n", $headers));
    
    if ($mailSent) {
        error_log("Email sent successfully to $toEmail");
        echo json_encode([
            'success' => true, 
            'message' => 'Thank you for your message! We will get back to you within 2 hours during business hours.'
        ]);
    } else {
        error_log("Failed to send email using mail() function");
        
        // Fallback: Use Formspree as backup service
        error_log("Attempting fallback with Formspree");
        
        $formspreeUrl = 'https://formspree.io/f/xwkgdrgy'; // You can replace this with your Formspree form ID
        
        $formData = [
            'name' => $fullName,
            'email' => $email,
            'message' => $message,
            '_subject' => $subject,
            '_replyto' => $email,
            '_gotcha' => '' // Spam protection
        ];
        
        $ch = curl_init($formspreeUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($formData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        
        $response = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        
        if ($status >= 200 && $status < 300) {
            error_log("Formspree fallback successful");
            echo json_encode([
                'success' => true, 
                'message' => 'Thank you for your message! We will get back to you within 2 hours during business hours.'
            ]);
        } else {
            error_log("Both email methods failed. Status: $status, Error: $error");
            echo json_encode([
                'success' => false, 
                'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly at contact@virtualsolutionspath.com'
            ]);
        }
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
}
?>
