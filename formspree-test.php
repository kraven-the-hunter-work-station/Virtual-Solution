<?php
// Simple script to test Formspree connection
echo "Testing Formspree connection...\n";

$url = 'https://formspree.io/f/xwkgdrgy';
$formData = [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'message' => 'This is a test message from the server',
    '_subject' => 'Test Message'
];

// Initialize cURL session
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $formData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/json',
    'Content-Type: application/x-www-form-urlencoded',
    'Origin: http://localhost:8000'
]);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

// Execute request
echo "Sending request...\n";
$response = curl_exec($ch);
$error = curl_error($ch);
$errno = curl_errno($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

echo "Response status: " . $status . "\n";

if ($error) {
    echo "cURL Error: " . $error . "\n";
    echo "cURL Error Number: " . $errno . "\n";
} else {
    echo "Response:\n" . $response . "\n";
}

// Close cURL session
curl_close($ch);
?>
