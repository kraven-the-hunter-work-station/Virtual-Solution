<?php
/**
 * Database Connection Configuration
 * Loads configuration from hostinger-config.php if available
 */

// Try to load Hostinger configuration
$config_file = __DIR__ . '/hostinger-config.php';
$config = file_exists($config_file) ? require($config_file) : null;

// Set database parameters from config if available, otherwise use defaults
$host = isset($config['db']['host']) ? $config['db']['host'] : "localhost";
$db_name = isset($config['db']['name']) ? $config['db']['name'] : "your_database_name";
$username = isset($config['db']['user']) ? $config['db']['user'] : "your_database_username";
$password = isset($config['db']['password']) ? $config['db']['password'] : "your_database_password";
$charset = isset($config['db']['charset']) ? $config['db']['charset'] : "utf8mb4";

// Connection options
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    // Create PDO instance
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db_name;charset=$charset",
        $username,
        $password,
        $options
    );
    // Set to use as global connection
    $GLOBALS['pdo'] = $pdo;
    
    // For debugging only - remove in production
    // echo "Database connection established successfully!";
} catch (PDOException $e) {
    // Log error (to error log instead of showing on screen in production)
    error_log("Database Connection Error: " . $e->getMessage());
    die("Database connection failed. Please try again later.");
}
?>
