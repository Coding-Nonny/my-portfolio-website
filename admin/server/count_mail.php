<?php
if ($_SERVER['REQUEST_METHOD'] !== "GET") {
    echo "you don't have permission to access this file";
    exit();
}
include("connection.php");
$count = $connect->query("SELECT * FROM mail WHERE status = 0 ");

if($count){
    echo $count->num_rows;
    exit();
}
echo "failed";