<?php
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo "you don't have permission to access this page";
    exit();
}
include("handler.php");
$type = $_POST['type'];
$title = $_POST['title'];
$name = $_POST['name'];
$id = $_POST['id'];
$category = $_POST['category'];
$text = $_POST['text'];
$file = $_FILES["file"]['name'];
$file_tmp = $_FILES['file']['tmp_name'];
$file_size  =  $_FILES['file']['size'];

$handle = new Server();

$return = $handle->postManager($type, $title, $name, $id, $category, $text, $file, $file_tmp, $file_size);

echo $return;
