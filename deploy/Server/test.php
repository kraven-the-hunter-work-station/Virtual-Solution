<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

echo json_encode([
    'success' => true,
    'message' => 'Server is working!',
    'time' => date('Y-m-d H:i:s')
]);
