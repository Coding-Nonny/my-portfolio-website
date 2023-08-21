<?php
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
   http_response_code(403);
    exit();
}
include("connection.php");
$id = $_POST['id'];
$select = $connect->query("SELECT * FROM blog WHERE id = {$id}");
$row = $select->fetch_assoc();

if (file_exists("../blog/" . $row['files'] . "")) {
    if (!unlink("../blog/" . $row['files'] . "")) {
        echo "failed removing file";
        exit();
    }
}
$delete = $connect->query("DELETE FROM blog WHERE id = {$id}");

if ($delete) {
    $delete1 = $connect->query("DELETE FROM blog_comment WHERE blog_id = {$id}");
    if ($delete1) {
        echo "done";
        $connect->close();
        exit();
    }
}
echo "failed";
$connect->close();