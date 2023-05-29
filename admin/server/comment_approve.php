<?php
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo "you don't have permission to access this page";
    exit();
}
include("connection.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "../PHPMailer/PHPMailer/src/Exception.php";
require "../PHPMailer/PHPMailer/src/PHPMailer.php";
require "../PHPMailer/PHPMailer/src/SMTP.php";

$id = $_POST['id'];
$select2 = $connect->query("SELECT * FROM blog_comment WHERE id_blog = {$id} and status = 1");
if ($select2->num_rows > 0) {
    echo "comment already approved";
    exit();
}
$update = $connect->query("UPDATE blog_comment SET status = 1 WHERE id_blog = {$id}");
if ($update) {
    $select = $connect->query("SELECT * FROM blog_comment WHERE id_blog = {$id}");
    if ($select->num_rows > 0) {
        $row = $select->fetch_assoc();
        $select1 = $connect->query("SELECT * FROM blog WHERE id = {$row['blog_id']}");
        $row1 = $select1->fetch_assoc();
        $file = "";
        if (strstr(mime_content_type('../blog/' . $row1['files']), 'video')) {
            $file = '<video src="../blog/' . $row1['files'] . '"></video>';
        } else {
            $file =  '<img src="../blog/' . $row1['files'] . '" alt="" width="200">';
        }

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
        $mail->Subject = 'Comment Approval';
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
            <p style="margin-bottom: 20px;">Hello, ' . $row['username'] . '</p>
            <p style="margin-bottom: 20px; color: #31d275;">Your comment on this blog post has been approved, we are happy to have you. You can always visit our website for more contents or subscribe to our newsletter to get mail notification when new contents are posted.</p>
           ' . $file . '
            <p style="margin-bottom: 20px; color: #31d275;">' . $row1['category'] . ' (' . $row1['title'] . ')</p>
            <p style="margin-bottom: 20px;">If you have any questions or feedback, feel free to reply to this email or contact us through our website.</p>
            <button style="display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: 900;
            color: #ded7e9;
            background-color: #0a509b;
            border: none;
            border-radius: 5px;
            cursor: pointer;"><a href="" style="text-decoration: none;color:#ded7e9">view blog</a></button>
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
        echo "approved";
    }
}
