<?php
// Database Connection Tester
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>🔧 Database Connection Test</h1>";

// Test different possible configurations
$test_configs = [
    [
        'name' => 'Current Config',
        'host' => 'localhost',
        'username' => 'u770934494_shared_user',
        'password' => '1qWERTYUIOP!',
        'database' => 'u770934494_shared_users'
    ],
    [
        'name' => 'Alternative 1 (without prefix)',
        'host' => 'localhost',
        'username' => 'shared_user',
        'password' => '1qWERTYUIOP!',
        'database' => 'shared_users'
    ],
    [
        'name' => 'Alternative 2 (main account)',
        'host' => 'localhost',
        'username' => 'u770934494_main',
        'password' => '1qWERTYUIOP!',
        'database' => 'u770934494_main'
    ],
    [
        'name' => 'Alternative 3 (different prefix)',
        'host' => 'localhost',
        'username' => 'u770934494_ads',
        'password' => '1qWERTYUIOP!',
        'database' => 'u770934494_ads'
    ]
];

foreach ($test_configs as $config) {
    echo "<h2>Testing: {$config['name']}</h2>";
    echo "<strong>Host:</strong> {$config['host']}<br>";
    echo "<strong>Username:</strong> {$config['username']}<br>";
    echo "<strong>Database:</strong> {$config['database']}<br>";
    echo "<strong>Password:</strong> " . str_repeat('*', strlen($config['password'])) . "<br>";
    
    try {
        $pdo = new PDO(
            "mysql:host={$config['host']};dbname={$config['database']};charset=utf8", 
            $config['username'], 
            $config['password']
        );
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        echo "<p style='color: green;'>✅ <strong>Connection Successful!</strong></p>";
        
        // Test creating a table
        try {
            $pdo->exec("CREATE TABLE IF NOT EXISTS test_table (id INT AUTO_INCREMENT PRIMARY KEY, test_field VARCHAR(50))");
            echo "<p style='color: green;'>✅ Table creation works</p>";
            
            // Clean up test table
            $pdo->exec("DROP TABLE IF EXISTS test_table");
            echo "<p style='color: green;'>✅ Table operations work</p>";
            
        } catch (Exception $table_error) {
            echo "<p style='color: orange;'>⚠️ Table creation failed: " . $table_error->getMessage() . "</p>";
        }
        
        echo "<hr style='border: 2px solid green;'>";
        echo "<h3 style='color: green;'>🎯 USE THIS CONFIGURATION!</h3>";
        echo "<pre style='background: #f0f8f0; padding: 10px;'>";
        echo "\$host = '{$config['host']}';\n";
        echo "\$username = '{$config['username']}';\n";
        echo "\$password = '{$config['password']}';\n";
        echo "\$database = '{$config['database']}';\n";
        echo "</pre>";
        break; // Stop at first successful connection
        
    } catch (PDOException $e) {
        echo "<p style='color: red;'>❌ <strong>Connection Failed:</strong> " . $e->getMessage() . "</p>";
    }
    
    echo "<hr>";
}

echo "<h2>📋 What to do next:</h2>";
echo "<ol>";
echo "<li>If you see a green '✅ Connection Successful!' above, copy those credentials</li>";
echo "<li>Update your contact.php, signup.php, and login.php files with the working credentials</li>";
echo "<li>If ALL connections failed, check your Hostinger control panel for the correct database details</li>";
echo "<li><strong>Delete this file after testing for security!</strong></li>";
echo "</ol>";

echo "<h2>🔍 How to find correct credentials in Hostinger:</h2>";
echo "<ol>";
echo "<li>Login to Hostinger control panel</li>";
echo "<li>Go to 'Databases' → 'MySQL Databases'</li>";
echo "<li>Look for your database name and username</li>";
echo "<li>Note: Username format is usually 'cpanel_username_database_user'</li>";
echo "<li>Database format is usually 'cpanel_username_database_name'</li>";
echo "</ol>";
?>
