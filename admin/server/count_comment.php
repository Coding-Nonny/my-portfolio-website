<?php
if ($_SERVER['REQUEST_METHOD'] !== "GET") {
    echo "you don't have permission to access this page";
    exit();
}
include("connection.php");
$count = $connect->query("SELECT * FROM blog_comment WHERE status = 0 ");

if($count){
    echo $count->num_rows;
    $connect->close();
    exit();
}
echo "failed";
$connect->close();