<?php

if ($_SERVER['REQUEST_METHOD'] !== "GET") {
    echo "you don't have permission to access this page";
    exit();
}

include_once("../../admin/server/connection.php");


$searchParam = $_GET['param'];
$searchWords = explode(" ", $searchParam);

$exactMatchQueries = [];
$likeQueries = [];
$params = [];

foreach ($searchWords as $word) {
    $word = htmlspecialchars($word, ENT_QUOTES);
    $exactMatchQueries[] = "title = ? OR id = ? OR date_created = ?";
    $likeQueries[] = "title LIKE ? OR category LIKE ? OR writer LIKE ? OR content LIKE ?";
    $params = array_merge($params, array($word, $word, $word), array_fill(0, 4, '%' . mysqli_real_escape_string($connect, $word) . '%'));
}

$exactMatchConditions = implode(' OR ', $exactMatchQueries);
$likeConditions = implode(' OR ', $likeQueries);
$toSearch = "($exactMatchConditions) OR ($likeConditions)";

$stmt = mysqli_prepare($connect, "SELECT * FROM blog WHERE $toSearch");

if (!$stmt) {
    echo $connect->error;
    $connect->close();
    exit();
}

mysqli_stmt_bind_param($stmt, str_repeat('s', count($params)), ...$params);

if (!mysqli_stmt_execute($stmt)) {
    echo $connect->error;
    $connect->close();
    exit();
}

$result = mysqli_stmt_get_result($stmt);
mysqli_stmt_close($stmt);
if ($result->num_rows > 0) {
    $blogData = array();

    while ($blogRow = $result->fetch_assoc()) {
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


