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
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo "you don't have permission to access this page";
    exit();
}
date_default_timezone_get();
$name = $_POST['name'];
$email = $_POST['email'];
$comment = $_POST['comment'];
$blog = $_POST['blog_id'];
if (empty($name)) {
    echo "Enter name and try again";
    exit();
}
if (empty($email)) {
    echo "Enter email and try again";
    exit();
}
if (empty($comment)) {
    echo "comment field is empty";
    exit();
}
if (!preg_match("!^[A-Z a-z']+$!", $name)) {
    echo "Name cannot contain numbers and symbols";
    exit();
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "$email -  is not valid email address";
    exit();
}
$date = date("d-F-Y H:i:s A");
$insert = "INSERT INTO blog_comment (username, email, comment_text, blog_id, comment_date) VAlUES (?,?,?,?,?)";
$stmt = mysqli_stmt_init($connect);
mysqli_stmt_prepare($stmt, $insert);
if (!mysqli_stmt_bind_param($stmt, "sssis", $name, $email, $comment, $blog, $date)) {
    echo $connect->error;
    exit();
}
if (!mysqli_stmt_execute($stmt)) {
    echo $connect->error;
    exit();
}
echo "submitted";
