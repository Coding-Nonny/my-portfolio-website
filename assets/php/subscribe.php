<?php
date_default_timezone_get();
include_once("../../admin/server/connection.php");

if($_SERVER['REQUEST_METHOD'] !== "POST"){
    http_response_code(403);
    echo $connect->error;
    exit();
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "../PHPMailer/PHPMailer/src/Exception.php";
require "../PHPMailer/PHPMailer/src/PHPMailer.php";
require "../PHPMailer/PHPMailer/src/SMTP.php";

$email = htmlspecialchars($_POST['email']);

if(empty($email)){
    echo "Please enter email address and try again";
    echo $connect->error;
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "$email -  is not valid email address";
    echo $connect->error;
    exit();
}

$select = "SELECT * FROM subscribers WHERE email = ?";
$stmt = mysqli_stmt_init($connect);
if(!mysqli_stmt_prepare($stmt,$select)){
    echo $connect->error;
    mysqli_stmt_close($stmt1);
    exit();
}
mysqli_stmt_bind_param($stmt,"s",$email);
if(!mysqli_stmt_execute($stmt)){
    echo $connect->error;
    mysqli_stmt_close($stmt1);
    exit();
}
$result = mysqli_stmt_get_result($stmt);
if($result->num_rows > 0){
    echo "You have already subscribed";
    mysqli_stmt_close($stmt1);
    exit();
}
$date = date("d-F-Y H:i:s A");
$insert = "INSERT INTO subscribers (email, date_subscribed) VALUES (?, ?)";
$stmt1 = mysqli_stmt_init($connect);
if(!mysqli_stmt_prepare($stmt1,$insert)){
    echo $connect->error;
    exit();
}
mysqli_stmt_bind_param($stmt1,"ss",$email, $date);
if(!mysqli_stmt_execute($stmt1)){
    echo $connect->error;
    mysqli_stmt_close($stmt1);
    exit();
}

if (!defined('MAIL_KEY')) {
    http_response_code(500);
    exit('MAIL key is not defined.');
}
$mail = new PHPMailer(true);
$mail->isSMTP(true);
$mail->Host = 'mail host';
$mail->SMTPAuth = true;
$mail->Username = 'your email address';
$mail->Password = MAIL_KEY;
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
// Set the "From" email address and name
$mail->setFrom('your email address', 'your name');
$mail->addAddress($email);
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
    margin-bottom: 20px; background: #31d275;padding: 10px;text-align: center;border-radius: 20px;">Coding Nonny</h1>
    <p style="margin-bottom: 20px; color: #31d275;">Thanks for subscribing to my newsletter, You will get email notifications when new contents are posted. If you wish to unsubscribe, reply (unsubscribe me) to this email.</p>
    <p style="margin-bottom: 20px;">If you have any questions or feedback, feel free to reply to this email or contact us through our website.</p>
    <button style="display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 900;
    color: #ded7e9;
    background-color: #0a509b;
    border: none;
    border-radius: 5px;
    cursor: pointer;"><a href="'.BASE_URL.'" style="text-decoration: none;color:#ded7e9">visit website</a></button>
    </div>
</body>
</html>
';
$mail->send();
if (!$mail) {
    echo "failed sending mail";
    $connect->close();
    exit();
}
echo "subscribed";
$connect->close();