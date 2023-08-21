<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set("Africa/Lagos");
include_once("../../admin/server/connection.php");

function isValidName($name) {
    return preg_match("/^[A-Z a-z']+$/", $name);
}

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
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

if (empty($name) || !isValidName($name)) {
    echo "Invalid name. Please enter a valid name.";
    exit();
}

if (empty($email) || !isValidEmail($email)) {
    echo "Invalid email address $email. Please enter a valid email.";
    exit();
}

if (empty($comment)) {
    echo "Comment field is empty.";
    exit();
}

$select = "SELECT * FROM blog_comment WHERE email = ?";
$stmt1 = mysqli_stmt_init($connect);
mysqli_stmt_prepare($stmt1, $select);
mysqli_stmt_bind_param($stmt1, "s", $email);
if (!mysqli_stmt_execute($stmt1)) {
    echo $connect->error;
    mysqli_stmt_close($stmt1);
    exit();
}
$res = mysqli_stmt_get_result($stmt1);
mysqli_stmt_close($stmt1);

if ($res->num_rows == 0) {
    // Extract the base64-encoded image data
    $dataParts = explode(',', $img);

    // Check if the data parts array has at least two elements
    if (count($dataParts) < 2) {
        echo "Invalid image data";
        exit();
    }
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
    $insert = "INSERT INTO blog_comment (username, email, img, comment_text, blog_id, comment_date) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_stmt_init($connect);
    mysqli_stmt_prepare($stmt, $insert);
    mysqli_stmt_bind_param($stmt, "ssssis", $name, $email, $newImg, $comment, $blog, $date);
    if (!mysqli_stmt_execute($stmt)) {
        echo $connect->error;
        mysqli_stmt_close($stmt);
        exit();
    }
    mysqli_stmt_close($stmt);
} else {
    $row = $res->fetch_assoc();
    $newImg = $row['img'];
    $date = date("d-F-Y H:i:s A");
    $insert = "INSERT INTO blog_comment (username, email, img, comment_text, blog_id, comment_date) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_stmt_init($connect);
    mysqli_stmt_prepare($stmt, $insert);
    mysqli_stmt_bind_param($stmt, "ssssis", $name, $email, $newImg, $comment, $blog, $date);
    if (!mysqli_stmt_execute($stmt)) {
        echo $connect->error;
        mysqli_stmt_close($stmt);
        exit();
    }
    mysqli_stmt_close($stmt);
}

$connect->close();
echo "submitted";
exit;
?>
