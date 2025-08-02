<?php
// Simple connection test
echo "Testing database connection...\n";

$host = 'localhost';
$username = 'u770934494_Shared_Base';
$password = 'Mirza.Ali!1';
$database = 'u770934494_User_Info';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    echo "✅ Connection successful!\n";
} catch (PDOException $e) {
    echo "❌ Connection failed: " . $e->getMessage() . "\n";
}
?>
