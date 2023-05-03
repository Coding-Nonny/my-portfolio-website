<?php
if ($_SERVER['REQUEST_METHOD'] !== "GET") {
    http_response_code(403);
    exit();
}
try {
    $database = "localhost";
    $user = "root";
    $password = "";
    $name = "dashboard";
    $connect = new mysqli($database, $user, $password, $name);
    if ($connect->error) {
        throw new Exception("connection failed" . $connect->error);
    }
} catch (Exception $error) {
    echo $error->getMessage();
}

$select = $connect->query("SELECT * FROM blog ORDER BY id DESC");

if ($select->num_rows > 0) {
    $blogData = array();

    while ($blogRow = $select->fetch_assoc()) {
        $blogId = $blogRow['id'];

        $selectComments = $connect->query("SELECT * FROM blog_comment WHERE blog_id = {$blogId} and status = 1");
        $commentData = array();

        while ($commentRow = $selectComments->fetch_assoc()) {
            $commentData[] = $commentRow;
        }

        $blogRow['comment'] = $commentData;
        $blogData[] = $blogRow;
    }

    echo json_encode($blogData);
} else {
    $emptyPost = array();
    echo json_encode($emptyPost);
}
