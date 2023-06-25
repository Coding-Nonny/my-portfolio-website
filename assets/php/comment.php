<?php
date_default_timezone_get();
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
    http_response_code(403);
    exit();
}
$name = $_POST['name'];
$email = $_POST['email'];
$comment = $_POST['comment'];
$blog = $_POST['blog_id'];
$img = $_POST['image'];
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
$select = "SELECT * FROM blog_comment WHERE email = ?";
$stmt1 = mysqli_stmt_init($connect);
mysqli_stmt_prepare($stmt1, $select);
if (!mysqli_stmt_bind_param($stmt1, "s", $email)) {
    echo $connect->error;
    exit();
}
if (!mysqli_stmt_execute($stmt1)) {
    echo $connect->error;
    exit();
}
$res = mysqli_stmt_get_result($stmt1);

if($res->num_rows == 0){
// Extract the base64-encoded image data
$dataParts = explode(',', $img);

// Check if the data parts array has at least two elements
if (count($dataParts) < 2) {
    echo "Invalid image data";
    exit();
};
$data = $dataParts[1];
// Decode the base64-encoded image data
$imageDataDecoded = base64_decode($data);

// Generate a unique filename for the image
$newImg = $name . "_" . time() . ".png";

// Specify the file path to save the image
$filePath = "../user/" . $newImg;

// Save the image to the file path
if (!file_put_contents($filePath, $imageDataDecoded)) {
    echo "$newImg - was not saved successfully.";
    exit();
}

$date = date("d-F-Y H:i:s A");
$insert = "INSERT INTO blog_comment (username, email, img, comment_text, blog_id, comment_date) VAlUES (?,?,?,?,?,?)";
$stmt = mysqli_stmt_init($connect);
mysqli_stmt_prepare($stmt, $insert);
if (!mysqli_stmt_bind_param($stmt, "ssssis", $name, $email, $newImg, $comment, $blog, $date)) {
    echo $connect->error;
    exit();
}
if (!mysqli_stmt_execute($stmt)) {
    echo $connect->error;
    exit();
}
echo "submitted";
exit;
}
$row = $res->fetch_assoc();
$newImg = $row['img'];
$date = date("d-F-Y H:i:s A");
$insert = "INSERT INTO blog_comment (username, email, img, comment_text, blog_id, comment_date) VAlUES (?,?,?,?,?,?)";
$stmt = mysqli_stmt_init($connect);
mysqli_stmt_prepare($stmt, $insert);
if (!mysqli_stmt_bind_param($stmt, "ssssis", $name, $email, $newImg, $comment, $blog, $date)) {
    echo $connect->error;
    exit();
}
if (!mysqli_stmt_execute($stmt)) {
    echo $connect->error;
    exit();
}
echo "submitted";
$connect->close();