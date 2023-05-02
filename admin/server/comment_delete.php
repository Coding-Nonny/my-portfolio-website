<?php
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo "you don't have permission to access this page";
    exit();
}
include("connection.php");
$id = $_POST['id'];
$delete = $connect->query("DELETE FROM blog_comment WHERE id_blog = {$id}");

if($delete){
    echo "done";
    exit();
}
echo "failed";