<?php
// PHP Environment Test for Hostinger
// Upload this file and visit yourdomain.com/test-environment.php to check server capabilities

echo "<h1>🔧 Server Environment Test</h1>";
echo "<h2>PHP Information</h2>";
echo "<strong>PHP Version:</strong> " . phpversion() . "<br>";
echo "<strong>Server Software:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "<strong>Document Root:</strong> " . $_SERVER['DOCUMENT_ROOT'] . "<br>";

echo "<h2>📧 Email Functions</h2>";
if (function_exists('mail')) {
    echo "✅ PHP mail() function is available<br>";
} else {
    echo "❌ PHP mail() function is NOT available<br>";
}

echo "<h2>🗄️ Database Support</h2>";
if (extension_loaded('pdo_mysql')) {
    echo "✅ MySQL PDO extension is loaded<br>";
} else {
    echo "❌ MySQL PDO extension is NOT loaded<br>";
}

if (extension_loaded('mysqli')) {
    echo "✅ MySQLi extension is loaded<br>";
} else {
    echo "❌ MySQLi extension is NOT loaded<br>";
}

echo "<h2>🔐 Security</h2>";
echo "<strong>HTTPS:</strong> " . (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? '✅ Enabled' : '❌ Not enabled') . "<br>";

echo "<h2>📁 File Permissions</h2>";
echo "<strong>Current directory is writable:</strong> " . (is_writable('.') ? '✅ Yes' : '❌ No') . "<br>";

echo "<h2>🌐 Headers Support</h2>";
if (function_exists('apache_get_modules')) {
    $modules = apache_get_modules();
    echo "<strong>mod_rewrite:</strong> " . (in_array('mod_rewrite', $modules) ? '✅ Enabled' : '❌ Not enabled') . "<br>";
    echo "<strong>mod_headers:</strong> " . (in_array('mod_headers', $modules) ? '✅ Enabled' : '❌ Not enabled') . "<br>";
} else {
    echo "<em>Apache module information not available</em><br>";
}

echo "<h2>🎯 Test Contact Form</h2>";
echo '<form method="POST" style="margin-top: 20px; padding: 20px; border: 1px solid #ccc;">
    <h3>Quick Contact Test</h3>
    <input type="text" name="test_name" placeholder="Your Name" required style="margin: 5px; padding: 10px; width: 200px;"><br>
    <input type="email" name="test_email" placeholder="Your Email" required style="margin: 5px; padding: 10px; width: 200px;"><br>
    <textarea name="test_message" placeholder="Test message" required style="margin: 5px; padding: 10px; width: 200px; height: 60px;"></textarea><br>
    <button type="submit" name="test_submit" style="margin: 5px; padding: 10px 20px; background: #007cba; color: white; border: none;">Test Submit</button>
</form>';

if (isset($_POST['test_submit'])) {
    echo "<h3>✅ Form Submission Test Result:</h3>";
    echo "<strong>Name:</strong> " . htmlspecialchars($_POST['test_name']) . "<br>";
    echo "<strong>Email:</strong> " . htmlspecialchars($_POST['test_email']) . "<br>";
    echo "<strong>Message:</strong> " . htmlspecialchars($_POST['test_message']) . "<br>";
    echo "<em>Form processing is working correctly!</em><br>";
}

echo "<hr><p><strong>Note:</strong> Delete this file after testing for security purposes.</p>";
?>
