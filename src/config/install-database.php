<?php
/**
 * Database Installation Script
 * 
 * This file will set up the database tables required for the application
 * Run this once after setting up your database credentials in hostinger-config.php
 */

// Check if script is being accessed directly
if ($_SERVER['REQUEST_METHOD'] !== 'GET' || !isset($_GET['setup']) || $_GET['setup'] !== 'install') {
    echo "<!DOCTYPE html>
<html>
<head>
    <title>Database Setup</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        .instructions { background-color: #f0f0f0; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .warning { background-color: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .btn { display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
        .btn-danger { background-color: #dc3545; }
        h1 { color: #333; }
        code { background-color: #f8f9fa; padding: 2px 5px; border-radius: 3px; font-family: monospace; }
    </style>
</head>
<body>
    <h1>Database Installation</h1>
    
    <div class='instructions'>
        <h3>Before You Begin:</h3>
        <ol>
            <li>Make sure you've updated the database credentials in <code>hostinger-config.php</code></li>
            <li>Ensure your Hostinger MySQL database has been created</li>
            <li>Back up any existing data if you're running this on an existing database</li>
        </ol>
    </div>
    
    <div class='warning'>
        <strong>Warning:</strong> Running this installer will create new tables in your database. If tables with the same names already exist, they will be modified or replaced.
    </div>
    
    <p>Click the button below to set up your database tables:</p>
    
    <a href='?setup=install' class='btn'>Install Database Tables</a>
    
    <p style='margin-top: 30px;'>If you want to reset all data and start fresh:</p>
    
    <a href='?setup=reset' class='btn btn-danger'>Reset Database (Deletes All Data)</a>
</body>
</html>";
    exit;
}

// Include database configuration
require_once 'db-config.php';

// Function to execute SQL file
function executeSQL($pdo, $sql) {
    $results = [];
    
    // Split SQL file into individual statements
    $queries = preg_split('/;\s*$/m', $sql);
    
    foreach ($queries as $query) {
        $query = trim($query);
        if (empty($query)) continue;
        
        try {
            $result = $pdo->exec($query);
            $results[] = [
                'query' => substr($query, 0, 80) . (strlen($query) > 80 ? '...' : ''),
                'status' => 'success',
                'result' => $result
            ];
        } catch (PDOException $e) {
            $results[] = [
                'query' => substr($query, 0, 80) . (strlen($query) > 80 ? '...' : ''),
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
    
    return $results;
}

// Check if SQL file exists
$sqlFile = __DIR__ . '/database-setup.sql';
if (!file_exists($sqlFile)) {
    die("Error: SQL file not found at $sqlFile");
}

// Read SQL file
$sql = file_get_contents($sqlFile);
if (!$sql) {
    die("Error: Could not read SQL file");
}

// Execute SQL
$results = executeSQL($pdo, $sql);

// Display results
echo "<!DOCTYPE html>
<html>
<head>
    <title>Database Setup Results</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        .success { background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .error { background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; }
        .btn { display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>Database Setup Results</h1>";

// Check if any errors occurred
$hasErrors = false;
foreach ($results as $result) {
    if ($result['status'] === 'error') {
        $hasErrors = true;
        break;
    }
}

if ($hasErrors) {
    echo "<div class='error'>
        <strong>Warning:</strong> Some errors occurred during the database setup. Please check the details below.
    </div>";
} else {
    echo "<div class='success'>
        <strong>Success!</strong> Database tables have been created successfully.
    </div>";
}

echo "<h3>Execution Details:</h3>
    <table>
        <tr>
            <th>Query</th>
            <th>Status</th>
            <th>Message/Result</th>
        </tr>";

foreach ($results as $result) {
    echo "<tr>
        <td>" . htmlspecialchars($result['query']) . "</td>
        <td>" . ($result['status'] === 'success' ? '✓ Success' : '✗ Error') . "</td>
        <td>" . (isset($result['result']) ? $result['result'] : htmlspecialchars($result['message'])) . "</td>
    </tr>";
}

echo "</table>
    <a href='" . $_SERVER['PHP_SELF'] . "' class='btn'>Back to Installation Page</a>
</body>
</html>";
?>
