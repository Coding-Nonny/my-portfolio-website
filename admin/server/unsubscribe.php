<?php
if($_SERVER['REQUEST_METHOD'] !== "POST"){
    echo "you can't access the file";
    exit();
}
include("connection.php");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "../PHPMailer/PHPMailer/src/Exception.php";
require "../PHPMailer/PHPMailer/src/PHPMailer.php";
require "../PHPMailer/PHPMailer/src/SMTP.php";

date_default_timezone_get();

$id = $_POST['id'];

$select = "SELECT * FROM subscribers WHERE id = ?";
$stmt = mysqli_stmt_init($connect);
if(!mysqli_stmt_prepare($stmt,$select)){
    echo $connect->error;
    exit();
}
mysqli_stmt_bind_param($stmt,"i",$id);
if(!mysqli_stmt_execute($stmt)){
    echo $connect->error;
    exit();
}

$result = mysqli_stmt_get_result($stmt);
if($result->num_rows == 0){
    echo "No user found";
    exit();
}

$row = $result->fetch_assoc();

require_once(__DIR__ . '../../../assets/php/config.php');

if (!defined('MAIL_KEY')) {
    http_response_code(500);
    exit('MAIL key is not defined.');
}

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'theophilusnonny@gmail.com';
$mail->Password = MAIL_KEY;
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
// Set the "From" email address and name
$mail->setFrom('theophilusnonny@gmail.com', 'Coding Nonny');
$mail->addAddress($row['email']);
$mail->isHTML(true);
$mail->Subject = 'Subscription';
$mail->Body = '<!DOCTYPE html>
<html>
<head>
    <title>My Mailer</title>
    <style>
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        html{
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body style="display: flex;justify-content: center;width: 100%;font-family: Arial, sans-serif;
font-size: 14px;
line-height: 1.5;
background-color:#241f2b;
color: #ded7e9;
padding: 20px;height: 100%;font-weight: 700;">
    <div class="mail">
        <h1 style="font-size: 24px;
    color: #241f2b;
    margin-bottom: 20px; background: #31d275;padding: 10px;text-align: center;border-radius: 20px;">Nonny.com</h1>
    <p style="margin-bottom: 20px; color: #31d275;">You request to unsubscribe from our newsletter has been completed, you will no longer get mail notification when new contents are posted. If you wish to subscribe, visit website and subscribe.</p>
    <p style="margin-bottom: 20px;">If you have any questions or feedback, feel free to reply to this email or contact us through our website.</p>
    <button style="display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 900;
    color: #ded7e9;
    background-color: #0a509b;
    border: none;
    border-radius: 5px;
    cursor: pointer;"><a href="" style="text-decoration: none;color:#ded7e9">visit website</a></button>
    </div>
</body>
</html>
';
$mail->send();
if (!$mail) {
    echo "failed sending mail";
    exit();
}

$delete = $connect->query("DELETE FROM subscribers WHERE id = {$id}");
if($delete){
    echo "done";
    exit();
}
echo("failed");