<?php
try {
    $database = "localhost";
    $user = "root";
    $password = "";
    $name = "dashboard";
    $connect = new mysqli($database, $user, $password, $name);
    if ($connect->error) {
        throw new Exception("connection failed" . $connect->error);
    }
} catch (Exception $error) {
    echo $error->getMessage();
}
if($_SERVER['REQUEST_METHOD'] !== "POST"){
    http_response_code(403);
    exit();
}
date_default_timezone_get();
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$number = $_POST['number'];

if (empty($name)) {
    echo "enter name and try again";
    exit();
}
if (empty($email)) {
    echo "enter email and try again";
    exit();
}
if (empty($message)) {
    echo "message field is empty";
    exit();
}
if (!preg_match("!^[A-Z a-z']+$!", $name)) {
    echo "! $name - Name cannot contain numbers and symbols";
    exit();
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "$email -  is not valid email address";
    exit();
}
$date = date("d-F-Y H:i:s A");
$insert = "INSERT INTO mail (username, email, phone, mail_text, mail_date) VAlUES (?,?,?,?,?)";
$stmt = mysqli_stmt_init($connect);
mysqli_stmt_prepare($stmt, $insert);
if(!mysqli_stmt_bind_param($stmt, "sssss", $name, $email, $number, $message, $date)){
    echo $connect->error;
    exit();
}
if(!mysqli_stmt_execute($stmt)){
    echo $connect->error;
    exit();
}
echo "submitted";
