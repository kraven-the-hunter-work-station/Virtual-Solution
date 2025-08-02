<?php
// Set error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set longer timeout for debugging
set_time_limit(30);

// Allow CORS during development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Log errors to file
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/debug.log');

// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'virtual_solutions');
define('DB_USER', 'root');
define('DB_PASS', '');
