<?php
$baseURL = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'];
// this file is used by all db connection files and mail sending files
define('API_KEY', 'github secret key');
define('MAIL_KEY', 'your mail key');
define('BASE_URL', $baseURL);
define("USER", "db username");
define("PASSWORD","db password");
define("DB","db name");
?>