<?php
// Quick Database Connection Test
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>🔧 Database Connection Test</h1>";

// Your current credentials
$host = 'localhost';
$username = 'u770934494_Shared_Base';
$password = 'Mirza.Ali!1';
$database = 'u770934494_User_Info';

echo "<h2>Testing Current Credentials:</h2>";
echo "<strong>Host:</strong> $host<br>";
echo "<strong>Username:</strong> $username<br>";
echo "<strong>Database:</strong> $database<br>";
echo "<strong>Password:</strong> " . str_repeat('*', strlen($password)) . "<br><br>";

try {
    echo "Attempting connection...<br>";
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<h2 style='color: green;'>✅ Connection Successful!</h2>";
    
    // Test table access
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h3>Available Tables:</h3>";
    echo "<ul>";
    foreach ($tables as $table) {
        echo "<li>$table</li>";
    }
    echo "</ul>";
    
    // Test users table
    if (in_array('users', $tables)) {
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
        $count = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
        echo "<p>✅ Users table has $count records</p>";
    }
    
    // Test contact_submissions table
    if (in_array('contact_submissions', $tables)) {
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM contact_submissions");
        $count = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
        echo "<p>✅ Contact submissions table has $count records</p>";
    }
    
    echo "<h2 style='color: green;'>🎯 Your database is working perfectly!</h2>";
    echo "<p>The sign-up and contact forms should work now.</p>";
    
} catch (PDOException $e) {
    echo "<h2 style='color: red;'>❌ Connection Failed</h2>";
    echo "<p><strong>Error:</strong> " . $e->getMessage() . "</p>";
    
    echo "<h3>🔍 Troubleshooting Steps:</h3>";
    echo "<ol>";
    echo "<li><strong>Check username:</strong> Go to Hostinger control panel → Databases → MySQL Databases</li>";
    echo "<li><strong>Verify database name:</strong> Look for the exact database name in your control panel</li>";
    echo "<li><strong>Check password:</strong> Make sure it's exactly: <code>Mirza.Ali!1</code></li>";
    echo "<li><strong>User permissions:</strong> Ensure the user has access to this specific database</li>";
    echo "</ol>";
    
    echo "<h3>📋 Common Issues:</h3>";
    echo "<ul>";
    echo "<li>Username might be different (like <code>u770934494_main</code>)</li>";
    echo "<li>Database might be named differently</li>";
    echo "<li>User might not have permissions for this database</li>";
    echo "</ul>";
}

echo "<hr>";
echo "<p><strong>🛡️ Security Note:</strong> Delete this file after testing!</p>";
?>
