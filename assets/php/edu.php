<?php

include_once("../../admin/server/connection.php");
if ($_SERVER['REQUEST_METHOD'] !== "GET") {
    http_response_code(403);
    $connect->close();
    exit();
}

$select = $connect->query("SELECT * FROM blog WHERE category = 'education' ORDER BY id DESC");

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
    $connect->close();
} else {
    $emptyPost = array();
    echo json_encode($emptyPost);
    $connect->close();
}