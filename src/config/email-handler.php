<?php
// Set appropriate headers for JSON response
header('Content-Type: application/json');
// Enable error logging
error_log("Email handler script started");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Log raw POST data to help debug
    error_log("Raw POST data: " . print_r($_POST, true));
    
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';
    
    // Log processed values
    error_log("Processed values - Name: $name, Email: $email");

    // Input validation
    if (empty($name) || empty($email) || empty($message)) {
        $missingFields = [];
        if (empty($name)) $missingFields[] = 'name';
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

    // Use Formspree as a reliable email service
    // Create a POST request to Formspree
    $url = 'https://formspree.io/f/mnqrepko'; // Updated with a more reliable endpoint
    
    // Format data for FormSpree
    $formData = [
        'name' => $name,
        'email' => $email,
        'message' => $message,
        '_subject' => 'New Message from Virtual Solutions Path Website',
        '_replyto' => $email, // This helps ensure replies go to the sender
        '_gotcha' => '' // Honeypot for spam protection
    ];
    
    // Initialize cURL session
    $ch = curl_init($url);
    
    // Set cURL options
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $formData);
    
    // Set proper headers for FormSpree
    $headers = [
        'Accept: application/json',
        'Content-Type: application/x-www-form-urlencoded',
        'Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : 'http://localhost:5173')
    ];
    
    // Execute cURL session
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Follow redirects
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable SSL verification for testing
    curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Set timeout to 30 seconds
    
    error_log("About to execute cURL request to Formspree");
    $response = curl_exec($ch);
    $error = curl_error($ch);
    $errno = curl_errno($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if ($errno) {
        error_log("cURL Error Number: " . $errno);
    }
    
    // Log detailed information
    error_log("Formspree submission attempt");
    error_log("Formspree URL: $url");
    error_log("Formspree data: " . print_r($formData, true));
    error_log("Formspree submission - Status: $status");
    error_log("Formspree submission - Response: " . print_r($response, true));
    
    if ($error) {
        error_log("Formspree submission - cURL Error: $error");
    }
    
    // Close cURL session
    curl_close($ch);
    
    // FormSpree returns 200 for success, but may also return 302 for redirects
    if ($status >= 200 && $status < 300 || $status === 302) {
        error_log("Form submission successful with status: $status");
        echo json_encode(['success' => true, 'message' => 'Email sent successfully.']);
    } else {
        error_log("Form submission failed. Status: $status, Response: $response");
        
        // Try to parse the response to get more specific error info
        $responseData = json_decode($response, true);
        $errorDetails = '';
        
        if (json_last_error() === JSON_ERROR_NONE && isset($responseData['error'])) {
            $errorDetails = ' - ' . $responseData['error'];
        }
        
        // Include more specific error information for debugging
        $errorMessage = $error ?: "HTTP Status: $status" . $errorDetails;
        error_log("Error message: " . $errorMessage);
        
        echo json_encode([
            'success' => false, 
            'message' => 'An error occurred while sending the email. Please try again.', 
            'debug' => $errorMessage
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
}
?>
