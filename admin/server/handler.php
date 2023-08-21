<?php
date_default_timezone_set("Africa/Lagos");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "../PHPMailer/PHPMailer/src/Exception.php";
require "../PHPMailer/PHPMailer/src/PHPMailer.php";
require "../PHPMailer/PHPMailer/src/SMTP.php";
require_once(__DIR__ . '../../../assets/php/config.php');

if (!defined('MAIL_KEY')) {
    http_response_code(500);
    exit('MAIL key is not defined.');
}
class Server
{
    private $db;

    public function __construct()
    {
        include("connection.php");
        $this->db = $connect;
    }

    public function postManager($type, $title, $name, $id, $category, $text, $file, $file_tmp, $file_size)
    {
        switch ($type) {
            case 'new':
                /* check if file is empty when a new post is created */
                if (!isset($file) || empty($file)) {
                    return "Creating a new blog post requires image or video";
                }
                /* check if input fields are empty */
                if (empty($text) || empty($title) || empty($name) || empty($category)) {
                    return "fiil out all fields and try again";
                }
                /* check for known video and image extensions */
                $ext_array = ["jpg", "png", "jpeg", "svg", "webp", "mp4", "mpeg-4", "gif"];
                $file_explode = explode(".", $file);
                $end = end($file_explode);
                if (!in_array($end, $ext_array)) {
                    return "unsupported file type, please choose a jpg, png, svg, jpeg, webp, mp4, mpeg-4, gif file";
                }
                /* check if file is size is greater than 100mb */
                if ($file_size > 100 * 1024 * 1024) {
                    return "file must not be bigger than 100mb";
                }
                $newText = $text;
                $newText = str_replace("<", "&lt;", $newText);
                $newText = str_replace(">", "&gt;", $newText);
                $newText = str_replace("<br/&gt;", "<br/>", $newText);
                $date = date("d-F-Y H:i:s A");
                /* rename files  and move to folder location */
                $dateFile = date("Y-M-D") . "_" . rand(time(), 11111111);
                $img = $dateFile . "_" . $file;
                if (!move_uploaded_file($file_tmp, "../blog/" . $img)) {
                    return "Error moving file";
                }
                /* insert to database using prepared statement */
                $stmt = mysqli_stmt_init($this->db);
                $new_post = "INSERT INTO blog (title, category, writer, content, files, date_created) VALUES (?,?,?,?,?,?)";
                mysqli_stmt_prepare($stmt, $new_post);
                mysqli_stmt_bind_param($stmt, "ssssss", $title, $category, $name, $newText, $img, $date);
                if (!mysqli_stmt_execute($stmt)) {
                    $stmt->close();
                    return $this->db->error;
                }
                $subscribers = $this->db->query("SELECT email FROM subscribers");
                if ($subscribers->num_rows == 0) {
                    return "posted";
                }
                $stmtb = mysqli_stmt_init($this->db);
                $select_blog = "SELECT * FROM blog WHERE files = ?";
                if (!mysqli_stmt_prepare($stmtb,  $select_blog)) {
                    return $this->db->error;
                }
                mysqli_stmt_bind_param($stmtb, "s", $img);
                if (!mysqli_stmt_execute($stmtb)) {
                    $this->db->close();
                    return $this->db->error;
                }
                $result = mysqli_stmt_get_result($stmtb);
                $idb = $result->fetch_assoc();
                $newTitle = $title;
                $newTitle = str_replace(" ", "-", $newTitle);
                $newTitle = strtolower($newTitle);
                $mail = new PHPMailer(true);
                $mail->isSMTP();
                $mail->Host = 'mail host';
                $mail->SMTPAuth = true;
                $mail->Username = 'your email address';
                $mail->Password = MAIL_KEY;
                $mail->SMTPSecure = 'ssl';
                $mail->Port = 465;

                // Set the "From" email address and name 
                $mail->setFrom('your email address', 'your name');

                // Loop through subscribers and send an email to each
                while ($subscriber = $subscribers->fetch_assoc()) {
                    $mail->clearAddresses();
                    $mail->addAddress($subscriber['email']);

                    $mail->isHTML(true);
                    $mail->Subject = 'New Content';
                    $mail->Body = '<!DOCTYPE html>
                     <html>
                     <head>
                         <title>Mail By Coding Nonny</title>
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
                         <p style="margin-bottom: 20px;">Hello,</p>
                         <p style="margin-bottom: 20px; color: #31d275;">A new content was uploaded. Follow the link below to view content.</p>
                         <p style="margin-bottom: 20px; color: #31d275;">Category: ' . $category . ', Title: <b>(' . $title . ')</b></p>
                         <p style="margin-bottom: 20px;">If you have any questions or feedback, feel free to reply to this email or contact us through our website.</p>
                         <button style="display: inline-block;
                         padding: 10px 20px;
                         font-size: 16px;
                         font-weight: 900;
                         color: #ded7e9;
                         background-color: #0a509b;
                         border: none;
                         border-radius: 5px;
                         cursor: pointer;"><a href="' . BASE_URL . '/article/' . $idb["id"] . '/' . $newTitle . '" style="text-decoration: none;color:#ded7e9">view blog</a></button>
                         <small>You are getting this mail because you subscribed to my newsletter. If you want to unsubscribe, reply "unsubscribe me" to this mail.</small>
                         </div>
                     </body>
                     </html>
                     ';
                    $mail->send();
                    if (!$mail) {
                        $stmt->close();
                        $this->db->close();
                        return "failed sending mail";
                    }
                }
                $stmt->close();
                $this->db->close();
                return "posted";
                break;
            case 'update':
                /* check if fields are empty on post update */
                if (empty($text) || empty($title) || empty($name)) {
                    return "all fields are required";
                }
                $select = $this->db->query("SELECT * FROM blog WHERE id = {$id}");
                if ($select->num_rows > 0) {
                    $row = $select->fetch_assoc();
                    if (isset($file) && !empty($file)) {
                        if (file_exists("../blog/" . $row['files'])) {
                            unlink("../blog/" . $row['files']);
                        }
                        $ext_array = ["jpg", "png", "jpeg", "svg", "mp4", "mpeg-4", "gif"];
                        $file_explode = explode(".", $file);
                        $end = end($file_explode);
                        if (!in_array($end, $ext_array)) {
                            return "unsupported file type, please choose a video or image file";
                        }

                        if ($file_size > 100 * 1024 * 1024) {
                            return "file must not be bigger than 100mb";
                        }
                        if (empty($category)) {
                            $dateFile = date("Y-M-D") . "_" . rand(time(), 11111111);
                            $img = $dateFile . "_" . $file;
                            if (!move_uploaded_file($file_tmp, "../blog/" . $img)) {
                                return "Error moving file";
                            }
                            $stmt = mysqli_stmt_init($this->db);
                            $update = "UPDATE blog SET title = ?, writer = ?, content = ?, files = ? where id = ?";
                            mysqli_stmt_prepare($stmt, $update);
                            mysqli_stmt_bind_param($stmt, "ssssi", $title, $name, $text, $img, $id);
                            if (!mysqli_stmt_execute($stmt)) {
                                $this->db->close();
                                return $this->db->error;
                            }
                        }
                        if (!empty($category)) {

                            $dateFile = date("Y-M-D") . "_" . rand(time(), 11111111);
                            $img = $dateFile . "_" . $file;
                            if (!move_uploaded_file($file_tmp, "../blog/" . $img)) {
                                return "Error moving file";
                            }
                            $img = $dateFile . "_" . $file;
                            $stmt = mysqli_stmt_init($this->db);
                            $update = "UPDATE blog SET title = ?, category = ?, writer = ?, content = ?, files = ? WHERE id = ?";
                            mysqli_stmt_prepare($stmt, $update);
                            mysqli_stmt_bind_param($stmt, "sssssi", $title, $category, $name, $text, $img, $id);
                            if (!mysqli_stmt_execute($stmt)) {
                                $this->db->close();
                                return "error";
                            }
                        }
                        $this->db->close();
                        return "posted";
                    }
                    if (!isset($file) || empty($file)) {
                        if (empty($category)) {
                            $stmt = mysqli_stmt_init($this->db);
                            $update = "UPDATE blog SET title = ?, writer = ?, content = ? where id = ?";
                            mysqli_stmt_prepare($stmt, $update);
                            mysqli_stmt_bind_param($stmt, "sssi", $title, $name, $text, $id);
                            if (!mysqli_stmt_execute($stmt)) {
                                $this->db->close();
                                return $this->db->error;
                            }
                        }
                        if (!empty($category)) {
                            $stmt = mysqli_stmt_init($this->db);
                            $update = "UPDATE blog SET title = ?, category = ?, writer = ?, content = ? where id = ?";
                            mysqli_stmt_prepare($stmt, $update);
                            mysqli_stmt_bind_param($stmt, "ssssi", $title, $category, $name, $text, $id);
                            if (!mysqli_stmt_execute($stmt)) {
                                $this->db->close();
                                return $this->db->error;
                            }
                        }
                        $this->db->close();
                        return "posted";
                    }
                }
                return "post not found";
                break;
            default:
                return "howdy?";
                break;
        }
    }

    public function User($type, $username, $id, $password, $img, $img_tmp, $img_size)
    {
        if ($type == "new") {
            if (empty($username) || empty($password)) {
                return "username and password are required";
            }
            if (!isset($img) || empty($img)) {
                return " profile image required";
            }
            if (!preg_match("!^[A-Z a-z']+$!", $username)) {
                return "Name cannot contain numbers and symbols";
            }
            $ext_array = ["jpg", "png", "svg", "jpeg"];
            $file_explode = explode(".", $img);
            $end = end($file_explode);
            if (!in_array($end, $ext_array)) {
                return "unsupported file type, please choose a jpg, png, svg, jpeg file";
            }

            if ($img_size > 100 * 1024 * 1024) {
                return "file must not be bigger than 100mb";
            }
            $date = date("d-F-Y H:i:s A");
            $dateFile = rand(time(), 11111111);
            $imgNew = $dateFile . "_" . $img;
            if (!move_uploaded_file($img_tmp, "../profile/" . $imgNew)) {
                return "Error moving file";
            }
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = mysqli_stmt_init($this->db);
            $new_post = "INSERT INTO user (username, passcode, img, date_created) VALUES (?,?,?,?)";
            mysqli_stmt_prepare($stmt, $new_post);
            mysqli_stmt_bind_param($stmt, "ssss", $username, $hash, $imgNew, $date);
            if (!mysqli_stmt_execute($stmt)) {
                $this->db->close();
                return $this->db->error;
            }
            $this->db->close();
            return "done";
        }

        if ($type == "update") {
            if (empty($username)) {
                return "username is required";
            }
            if (isset($img) && !empty($img) && !empty($password)) {
                if (!preg_match("!^[A-Z a-z']+$!", $username)) {
                    return "Name cannot contain numbers and symbols";
                }
                $ext_array = ["jpg", "png", "svg", "jpeg"];
                $file_explode = explode(".", $img);
                $end = end($file_explode);
                if (!in_array($end, $ext_array)) {
                    return "unsupported file type, please choose a jpg, png, svg, jpeg file";
                }
                if ($img_size > 100 * 1024 * 1024) {
                    return "file must not be bigger than 100mb";
                }
                $selectU = $this->db->query("SELECT * FROM user WHERE user_id != {$id} AND username = '$username'");
                if ($selectU->num_rows > 0) {
                    $this->db->close();
                    return "username already in user choose another one";
                }
                $select = $this->db->query("SELECT * FROM user WHERE user_id = {$id}");
                $link = $select->fetch_assoc();
                if (file_exists("../profile/" . $link['img'])) {
                    unlink("../profile/" . $link['img']);
                }
                $dateFile = rand(time(), 11111111);
                $imgNew = $dateFile . "_" . $img;
                if (!move_uploaded_file($img_tmp, "../profile/" . $imgNew)) {
                    return "Error moving file";
                }
                $update = "UPDATE user SET username = ?, passcode = ?, img = ? WHERE user_id = ?";
                $hash = password_hash($password, PASSWORD_DEFAULT);
                $stmt = mysqli_stmt_init($this->db);
                mysqli_stmt_prepare($stmt, $update);
                mysqli_stmt_bind_param($stmt, "ssss", $username, $hash, $imgNew, $id);
                if (!mysqli_stmt_execute($stmt)) {
                    $this->db->close();
                    return "error";
                }
                $this->db->close();
                return "done";
            }
            if (isset($img) && !empty($img) && empty($password)) {
                if (!preg_match("!^[A-Z a-z']+$!", $username)) {
                    return "Name cannot contain numbers and symbols";
                }
                $ext_array = ["jpg", "png", "svg", "jpeg"];
                $file_explode = explode(".", $img);
                $end = end($file_explode);
                if (!in_array($end, $ext_array)) {
                    return "unsupported file type, please choose a jpg, png, svg, jpeg file";
                }
                if ($img_size > 100 * 1024 * 1024) {
                    return "file must not be bigger than 100mb";
                }
                $selectU = $this->db->query("SELECT * FROM user WHERE user_id != {$id} AND username = '$username'");
                if ($selectU->num_rows > 0) {
                    $this->db->close();
                    return "username already in use choose another one";
                }
                $select = $this->db->query("SELECT * FROM user WHERE user_id = {$id}");
                $link = $select->fetch_assoc();
                if (file_exists("../profile/" . $link['img'])) {
                    unlink("../profile/" . $link['img']);
                }
                $dateFile = rand(time(), 11111111);
                $imgNew = $dateFile . "_" . $img;
                if (!move_uploaded_file($img_tmp, "../profile/" . $imgNew)) {
                    return "Error moving file";
                }
                $update = "UPDATE user SET username = ?, img = ? WHERE user_id = ?";
                $stmt = mysqli_stmt_init($this->db);
                mysqli_stmt_prepare($stmt, $update);
                mysqli_stmt_bind_param($stmt, "sss", $username, $imgNew, $id);
                if (!mysqli_stmt_execute($stmt)) {
                    return $this->db->error;
                    $this->db->close();
                }
                $this->db->close();
                return "done";
            }
            if (!isset($img) || empty($img) && empty($password)) {
                if (!preg_match("!^[A-Z a-z']+$!", $username)) {
                    return "Name cannot contain numbers and symbols";
                }
                $selectU = $this->db->query("SELECT * FROM user WHERE user_id != {$id} AND username = '$username'");
                if ($selectU->num_rows > 0) {
                    $this->db->close();
                    return "username already in user choose another one";
                }
                $update1 = "UPDATE user SET username = ? WHERE user_id = ?";
                $stmt1 = mysqli_stmt_init($this->db);
                mysqli_stmt_prepare($stmt1, $update1);
                mysqli_stmt_bind_param($stmt1, "ss", $username, $id);
                if (!mysqli_stmt_execute($stmt1)) {
                    $this->db->close();
                    return $this->db->error;
                }
                $this->db->close();
                return "done";
            }
            if (!isset($img) || empty($img) && !empty($password)) {
                if (!preg_match("!^[A-Z a-z']+$!", $username)) {
                    return "Name cannot contain numbers and symbols";
                }
                $selectU = $this->db->query("SELECT * FROM user WHERE user_id != {$id} AND username = '$username'");
                if ($selectU->num_rows > 0) {
                    return "username already in user choose another one";
                }
                $hash = password_hash($password, PASSWORD_DEFAULT);
                $update1 = "UPDATE user SET username = ?, passcode = ? WHERE user_id = ?";
                $stmt1 = mysqli_stmt_init($this->db);
                mysqli_stmt_prepare($stmt1, $update1);
                mysqli_stmt_bind_param($stmt1, "sss", $username, $hash, $id);
                if (!mysqli_stmt_execute($stmt1)) {
                    return $this->db->error;
                    $this->db->close();
                }

                $this->db->close();
                return "done";
            }

            $this->db->close();
            return $this->db->error;
        }
    }

    public function login($username, $password)
    {
        if (empty($username) || empty($password)) {
            return "Fill all fields and try again";
        }

        $select = "SELECT * FROM user WHERE username = ?";
        $stmt = mysqli_stmt_init($this->db);

        if (!mysqli_stmt_prepare($stmt, $select)) {
            return "Database error. Please try again later.";
        }

        mysqli_stmt_bind_param($stmt, "i", $username);

        if (!mysqli_stmt_execute($stmt)) {
            return "Database error. Please try again later.";
        }

        $result = mysqli_stmt_get_result($stmt);

        if ($result->num_rows == 0) {
            return var_dump($result);
            $this->db->close();
        }

        $row = $result->fetch_assoc();

        if (!password_verify($password, $row['passcode'])) {
            return "Incorrect password";
            $this->db->close();
        }

        // Start a session and store user information
        session_start();
        $_SESSION['user'] = $row['user_id'];

        // Close the database connection
        mysqli_stmt_close($stmt);
        $this->db->close();

        return "Logged in";
    }
}
