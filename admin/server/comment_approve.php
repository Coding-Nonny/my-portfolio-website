<?php
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
   http_response_code(403);
    exit();
}
include("connection.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "../PHPMailer/PHPMailer/src/Exception.php";
require "../PHPMailer/PHPMailer/src/PHPMailer.php";
require "../PHPMailer/PHPMailer/src/SMTP.php";

$id = $_POST['id'];
 $file = "";
 $title = "";
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
        $title = $row1['title'];
        $title = str_replace(" ","-",$title);
        $title = strtolower($title);
        $file_explode = explode(".", $row1['files']);
                $end = end($file_explode);
                if ($end == "mp4" || $end == "gif" || $end == "mpeg-4") {
                    $file = '<video src="'.BASE_URL.'/admin/blog/' . $row1['files'] . '" width="150" height="150" controls></video>';
                } elseif($end == "jpg" || $end == "jpeg" || $end == "png" || $end == "svg" || $end == "webp") {
                    $file = ' <img src="'.BASE_URL.'/admin/blog/' . $row1['files'] . '" alt="content file" width="150" height="150">';
                }else{
                    echo "unsuppoerted file type";
                }

        if (!defined('MAIL_KEY')) {
            http_response_code(500);
            $connect->close();
            exit('MAIL key is not defined.');
        }

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'mail host';
        $mail->SMTPAuth = true;
        $mail->Username = 'email address';
        $mail->Password = MAIL_KEY;
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        // Set the "From" email address and name
        $mail->setFrom('email address', 'name');
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
            margin-bottom: 20px; background: #31d275;padding: 10px;text-align: center;border-radius: 20px;">Coding Nonny</h1>
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
            cursor: pointer;"><a href="'.BASE_URL.'/article/'.$row1['id'].'/'.$title.'" style="text-decoration: none;color:#ded7e9">view blog</a></button>
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
        echo "approved";
         $connect->close();
    }
}