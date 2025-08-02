<?php
/**
 * Database Connection Test Script
 * 
 * This file tests the connection to your Hostinger database
 * It also checks that the required tables exist
 */

// Set headers
header('Content-Type: text/html; charset=utf-8');

echo '<!DOCTYPE html>
<html>
<head>
    <title>Database Connection Test</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        .success { background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .error { background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .info { background-color: #cce5ff; color: #004085; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        h2 { margin-top: 30px; color: #333; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Database Connection Test</h1>';

// Include database configuration
try {
    require_once 'db-config.php';
    
    echo '<div class="success">
        <strong>Connection Successful!</strong> Successfully connected to the database.
    </div>';

    // Test configuration loading
    $config_file = __DIR__ . '/hostinger-config.php';
    if (file_exists($config_file)) {
        echo '<div class="success">
            <strong>Configuration Found!</strong> Hostinger configuration file exists.
        </div>';
    } else {
        echo '<div class="error">
            <strong>Configuration Missing!</strong> Hostinger configuration file not found at: ' . htmlspecialchars($config_file) . '
        </div>';
    }
    
    // Check database tables
    $requiredTables = ['users', 'contact_submissions', 'user_sessions'];
    $existingTables = [];
    
    echo '<h2>Table Check</h2>';
    echo '<table>
        <tr>
            <th>Table Name</th>
            <th>Status</th>
        </tr>';
    
    foreach ($requiredTables as $table) {
        $stmt = $pdo->prepare("SHOW TABLES LIKE ?");
        $stmt->execute([$table]);
        
        if ($stmt->rowCount() > 0) {
            echo '<tr>
                <td>' . htmlspecialchars($table) . '</td>
                <td style="color: #155724;">✓ Exists</td>
            </tr>';
            $existingTables[] = $table;
        } else {
            echo '<tr>
                <td>' . htmlspecialchars($table) . '</td>
                <td style="color: #721c24;">✗ Missing</td>
            </tr>';
        }
    }
    
    echo '</table>';
    
    // Table structure details if tables exist
    if (!empty($existingTables)) {
        echo '<h2>Table Structure</h2>';
        
        foreach ($existingTables as $table) {
            echo '<h3>' . htmlspecialchars($table) . '</h3>';
            
            // Get table structure
            $stmt = $pdo->prepare("DESCRIBE " . $table);
            $stmt->execute();
            $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo '<table>
                <tr>
                    <th>Field</th>
                    <th>Type</th>
                    <th>Null</th>
                    <th>Key</th>
                    <th>Default</th>
                    <th>Extra</th>
                </tr>';
            
            foreach ($columns as $column) {
                echo '<tr>
                    <td>' . htmlspecialchars($column['Field']) . '</td>
                    <td>' . htmlspecialchars($column['Type']) . '</td>
                    <td>' . htmlspecialchars($column['Null']) . '</td>
                    <td>' . htmlspecialchars($column['Key']) . '</td>
                    <td>' . (is_null($column['Default']) ? 'NULL' : htmlspecialchars($column['Default'])) . '</td>
                    <td>' . htmlspecialchars($column['Extra']) . '</td>
                </tr>';
            }
            
            echo '</table>';
            
            // Count rows
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM " . $table);
            $stmt->execute();
            $count = $stmt->fetchColumn();
            
            echo '<p>Total rows: ' . $count . '</p>';
        }
    }
    
    echo '<div class="info">
        <strong>Next Steps:</strong><br>
        1. If tables are missing, run the <a href="install-database.php">database installer</a>.<br>
        2. Make sure your frontend is correctly configured to connect to these endpoints.
    </div>';
    
} catch (PDOException $e) {
    echo '<div class="error">
        <strong>Connection Error!</strong> Failed to connect to the database.<br>
        Error details: ' . htmlspecialchars($e->getMessage()) . '
    </div>
    
    <div class="info">
        <strong>Troubleshooting:</strong><br>
        1. Verify your database credentials in hostinger-config.php<br>
        2. Make sure your database exists and is accessible<br>
        3. Check if your database user has sufficient privileges<br>
        4. Confirm that your hosting supports the required database connections
    </div>';
}

echo '</body>
</html>';
?>
