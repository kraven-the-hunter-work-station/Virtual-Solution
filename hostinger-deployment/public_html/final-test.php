<?php
// Final credential test based on your Hostinger setup
echo "🔧 Hostinger Database Connection Test\n";
echo "=====================================\n\n";

// YOUR EXACT CREDENTIALS - please verify these in your Hostinger cPanel
$credentials = [
    'host' => 'localhost',
    'username' => 'u770934494_Shared_Base',  // ← Verify this exact format in cPanel
    'password' => 'Mirza.Ali!1',              // ← Verify this exact password
    'database' => 'u770934494_User_Info'      // ← Verify this exact database name
];

echo "Testing with your provided credentials:\n";
foreach ($credentials as $key => $value) {
    echo "  $key: $value\n";
}
echo "\n";

try {
    $dsn = "mysql:host={$credentials['host']};dbname={$credentials['database']};charset=utf8";
    $pdo = new PDO($dsn, $credentials['username'], $credentials['password']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ CONNECTION SUCCESSFUL!\n\n";
    
    // Test if we can see tables
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "📋 Tables in database:\n";
    if (empty($tables)) {
        echo "  (No tables found - this is normal for a new database)\n";
    } else {
        foreach ($tables as $table) {
            echo "  - $table\n";
        }
    }
    
    echo "\n🎯 YOUR WORKING CREDENTIALS:\n";
    echo "Host: {$credentials['host']}\n";
    echo "Username: {$credentials['username']}\n";
    echo "Password: {$credentials['password']}\n";
    echo "Database: {$credentials['database']}\n";
    
} catch (PDOException $e) {
    echo "❌ CONNECTION FAILED!\n";
    echo "Error: " . $e->getMessage() . "\n\n";
    
    echo "🔍 TROUBLESHOOTING STEPS:\n";
    echo "1. Double-check your cPanel Database section\n";
    echo "2. Verify the exact username format (case-sensitive)\n";
    echo "3. Confirm the password is exactly: Mirza.Ali!1\n";
    echo "4. Make sure the database name is correct\n";
    echo "5. Ensure the database user has permissions to the database\n";
    
    // Common error patterns
    if (strpos($e->getMessage(), 'Access denied') !== false) {
        echo "\n⚠️  ACCESS DENIED ERRORS usually mean:\n";
        echo "   - Wrong username format\n";
        echo "   - Wrong password\n";
        echo "   - User not assigned to database\n";
    }
    
    if (strpos($e->getMessage(), 'Unknown database') !== false) {
        echo "\n⚠️  UNKNOWN DATABASE ERROR means:\n";
        echo "   - Database name is incorrect\n";
        echo "   - Database doesn't exist\n";
    }
}
?>
