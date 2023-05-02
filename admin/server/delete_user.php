<?php
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo "you don't have permission to access this page";
    exit();
}
include("connection.php");
$id = $_POST['id'];
$select = $connect->query("SELECT * FROM user WHERE user_id = {$id}");
$row = $select->fetch_assoc();
if (file_exists("../profile/" . $row['img'] . "")) {
    if (!unlink("../profile/" . $row['img'] . "")) {
        echo "failed removing file";
        exit();
    }
}
$delete = $connect->query("DELETE FROM user WHERE user_id = {$id}");
if ($delete) {
    echo "user deleted";
    exit();
}
echo "failed";
