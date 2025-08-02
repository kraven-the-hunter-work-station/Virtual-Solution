<?php
// Email Test Script for Hostinger
// Run this to test if email sending works on your hosting

echo "<h1>📧 Email Functionality Test</h1>";

// Include email service
require_once 'email-service.php';

// Test email address - change this to your email
$test_email = "mradvision.cop@gmail.com";
$test_name = "Test User";

echo "<h2>Testing Email Configuration...</h2>";

// Check if mail function exists
if (function_exists('mail')) {
    echo "✅ PHP mail() function is available<br>";
} else {
    echo "❌ PHP mail() function is NOT available<br>";
    exit();
}

// Test basic email sending
echo "<h3>1. Testing Basic Email:</h3>";
$basic_subject = "Test Email from AdsVision Marketing";
$basic_message = "This is a test email to verify email functionality.";
$basic_headers = "From: noreply@adsvisionmarketing.com\r\nReply-To: mradvision.cop@gmail.com";

$basic_sent = mail($test_email, $basic_subject, $basic_message, $basic_headers);

if ($basic_sent) {
    echo "✅ Basic email sent successfully!<br>";
} else {
    echo "❌ Basic email failed to send<br>";
}

// Test welcome email service
echo "<h3>2. Testing Welcome Email Service:</h3>";
try {
    $emailService = new EmailService();
    $welcome_sent = $emailService->sendWelcomeEmail($test_email, $test_name);
    
    if ($welcome_sent) {
        echo "✅ Welcome email sent successfully!<br>";
    } else {
        echo "❌ Welcome email failed to send<br>";
    }
} catch (Exception $e) {
    echo "❌ Welcome email error: " . $e->getMessage() . "<br>";
}

echo "<h2>📋 Email Configuration Info:</h2>";
echo "<strong>From Email:</strong> noreply@adsvisionmarketing.com<br>";
echo "<strong>Reply-To:</strong> mradvision.cop@gmail.com<br>";
echo "<strong>Test Email:</strong> $test_email<br>";

echo "<h2>🔧 Troubleshooting Tips:</h2>";
echo "<ul>";
echo "<li>Check your Hostinger cPanel → Email section</li>";
echo "<li>Ensure the domain email is properly configured</li>";
echo "<li>Check spam/junk folder for test emails</li>";
echo "<li>Some hosting providers require SMTP authentication</li>";
echo "<li>Contact Hostinger support if emails are not being delivered</li>";
echo "</ul>";

echo "<h2>📬 Expected Results:</h2>";
echo "If successful, you should receive two emails at <strong>$test_email</strong>:<br>";
echo "1. A basic test email<br>";
echo "2. A beautifully formatted welcome email<br>";

echo "<hr>";
echo "<p><strong>Note:</strong> Delete this test file after verification for security.</p>";
?>
