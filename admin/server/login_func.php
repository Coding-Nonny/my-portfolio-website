<?php
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo "you don't have permission to access this page";
    exit();
}
include("handler.php");
$username = $_POST['username'];
$password  = $_POST['password'];
$handle = new Server();

$return = $handle->login($username, $password);

echo $return;
