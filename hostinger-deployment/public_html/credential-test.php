<?php
// Comprehensive Database Credential Test
echo "🔍 Testing Multiple Credential Combinations\n";
echo "==========================================\n\n";

$host = 'localhost';
$password = 'Mirza.Ali!1';
$database = 'u770934494_User_Info';

// Different username formats to try
$usernames_to_try = [
    'u770934494_Shared_Base',
    'u770934494_shared_base', 
    'u770934494_SharedBase',
    'u770934494_sharedbase',
    'u770934494_shared_user',
    'u770934494_User_Info'
];

foreach ($usernames_to_try as $username) {
    echo "Testing username: $username\n";
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Test a simple query
        $stmt = $pdo->query("SELECT 1");
        
        echo "✅ SUCCESS with username: $username\n";
        echo "   Database: $database\n";
        echo "   Password: $password\n\n";
        break; // Stop on first success
        
    } catch (PDOException $e) {
        echo "❌ FAILED: " . $e->getMessage() . "\n\n";
    }
}

echo "==========================================\n";
echo "Also testing different database names:\n\n";

// Test different database name formats
$databases_to_try = [
    'u770934494_User_Info',
    'u770934494_user_info',
    'u770934494_UserInfo',
    'u770934494_Shared_Base'
];

$working_username = 'u770934494_Shared_Base'; // Use most likely username

foreach ($databases_to_try as $db_name) {
    echo "Testing database: $db_name\n";
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $working_username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Test a simple query
        $stmt = $pdo->query("SELECT 1");
        
        echo "✅ SUCCESS with database: $db_name\n";
        echo "   Username: $working_username\n";
        echo "   Password: $password\n\n";
        
    } catch (PDOException $e) {
        echo "❌ FAILED: " . $e->getMessage() . "\n\n";
    }
}
?>
