<?php
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo "you don't have permission to access this page";
    exit();
}
include("handler.php");
$type = $_POST['type'];
$username = $_POST['username'];
$id = $_POST['id'];
$password = $_POST['password'];
$img = $_FILES["img"]['name'];
$img_tmp = $_FILES['img']['tmp_name'];
$img_size  =  $_FILES['img']['size'];

$handle = new Server();

$return = $handle->User($type, $username, $id, $password, $img, $img_tmp, $img_size);

echo $return;
