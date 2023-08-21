<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    exit();
}
header("Access-Control-Allow-Origin: *");

require_once(__DIR__ . '/config.php');

if (!defined('API_KEY')) {
    http_response_code(500);
    exit('API key is not defined.');
}

// Add your API key to the request data
$data['api_key'] = API_KEY;

// Set the target API endpoint
$apiUrl = 'https://api.github.com/user/repos';

// Initialize cURL
$ch = curl_init();

// Set the cURL options
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_HTTPGET, true); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'User-Agent: Nonny-Portfolio-Website', // Replace with your custom User-Agent value
    'Authorization: Bearer ' . API_KEY // Add Authorization header with your API key
));

// Execute the cURL request
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    // Handle the error appropriately
    header('Content-Type: application/json');
    echo array('error' => 'API request failed');
}

// Close cURL
curl_close($ch);

// Return the API response to the client-side
header('Content-Type: application/json');
echo $response;
