<?php
// Credential Verification Script
// This will help verify all files have consistent database credentials

echo "<h1>🔍 Database Credential Verification</h1>";

// Expected credentials
$expected = [
    'host' => 'localhost',
    'username' => 'u770934494_Shared_Base',
    'password' => 'Mirza.Ali!1',
    'database' => 'u770934494_User_Info'
];

echo "<h2>Expected Credentials:</h2>";
foreach ($expected as $key => $value) {
    echo "<strong>" . ucfirst($key) . ":</strong> $value<br>";
}

echo "<hr>";

// Files to check
$files_to_check = [
    'contact.php',
    'signup.php', 
    'login.php',
    'test-connection.php'
];

echo "<h2>Checking Files:</h2>";

foreach ($files_to_check as $file) {
    if (file_exists($file)) {
        echo "<h3>📄 $file</h3>";
        $content = file_get_contents($file);
        
        // Check each credential
        $found_issues = false;
        
        // Check host
        if (strpos($content, "\$host = 'localhost'") !== false) {
            echo "✅ Host: localhost<br>";
        } else {
            echo "❌ Host: NOT FOUND or INCORRECT<br>";
            $found_issues = true;
        }
        
        // Check username
        if (strpos($content, "\$username = 'u770934494_Shared_Base'") !== false) {
            echo "✅ Username: u770934494_Shared_Base<br>";
        } else {
            echo "❌ Username: NOT FOUND or INCORRECT<br>";
            $found_issues = true;
        }
        
        // Check password
        if (strpos($content, "\$password = 'Mirza.Ali!1'") !== false) {
            echo "✅ Password: Mirza.Ali!1<br>";
        } else {
            echo "❌ Password: NOT FOUND or INCORRECT<br>";
            $found_issues = true;
        }
        
        // Check database
        if (strpos($content, "\$database = 'u770934494_User_Info'") !== false) {
            echo "✅ Database: u770934494_User_Info<br>";
        } else {
            echo "❌ Database: NOT FOUND or INCORRECT<br>";
            $found_issues = true;
        }
        
        if (!$found_issues) {
            echo "<strong style='color: green;'>✅ ALL CREDENTIALS CORRECT</strong><br>";
        } else {
            echo "<strong style='color: red;'>❌ CREDENTIALS NEED FIXING</strong><br>";
        }
        
        echo "<br>";
    } else {
        echo "<h3>❌ $file - FILE NOT FOUND</h3>";
    }
}

echo "<hr>";
echo "<h2>🎯 Next Steps:</h2>";
echo "1. Upload all files to your Hostinger hosting<br>";
echo "2. Run test-connection.php to verify database connection<br>";
echo "3. Test sign-up and login functionality<br>";
echo "4. Remove this verification file and test-connection.php for security<br>";
?>
