<?php
/**
 * Simple Hostinger Database Connection Test
 * Upload this file to your Hostinger hosting and access it via browser
 */

// Set error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection parameters
$host = 'localhost';
$db_name = 'u770934494_User_Info';
$username = 'u770934494_Shared_Base';
$password = 'Mirza.Ali!1';

echo "<h1>Hostinger Database Connection Test</h1>";

try {
    // Create PDO connection
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<p style='color: green; font-weight: bold;'>SUCCESS: Connected to the database successfully!</p>";
    
    // Display server info
    echo "<h3>Server Information:</h3>";
    echo "<pre>";
    echo "Server Version: " . $conn->getAttribute(PDO::ATTR_SERVER_VERSION) . "\n";
    echo "Connection Status: " . $conn->getAttribute(PDO::ATTR_CONNECTION_STATUS) . "\n";
    echo "</pre>";
    
    // Check if users table exists
    $tables = $conn->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h3>Database Tables:</h3>";
    if (count($tables) > 0) {
        echo "<ul>";
        foreach ($tables as $table) {
            echo "<li>$table</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>No tables found in the database.</p>";
    }
    
} catch(PDOException $e) {
    echo "<p style='color: red; font-weight: bold;'>Connection failed: " . $e->getMessage() . "</p>";
}
?>
