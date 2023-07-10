<?php
if ($_SERVER['REQUEST_METHOD'] !== "GET") {
    echo "you don't have permission to access this page";
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
$searchParam = $_GET['param'];
$searchWords = explode(" ", $searchParam);

$likeQueries = [];
$params = array();

foreach ($searchWords as $word) {
    $word = htmlspecialchars($word, ENT_QUOTES);
    $likeQueries[] = "title LIKE ? OR category LIKE ? OR writer LIKE ? OR content LIKE ? OR date_created LIKE ? OR id LIKE ?";
    $params = array_merge($params, array_fill(0, 6, '%' . mysqli_real_escape_string($connect, $word) . '%'));
}

$toSearch = implode(' OR ', $likeQueries);

$stmt = mysqli_prepare($connect, "SELECT * FROM blog WHERE $toSearch");

if (!$stmt) {
    echo $connect->error;
    exit();
}

mysqli_stmt_bind_param($stmt, str_repeat('s', count($params)), ...$params);

if (!mysqli_stmt_execute($stmt)) {
    echo $connect->error;
    exit();
}

$result = mysqli_stmt_get_result($stmt);

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
} else {
    $emptyPost = array();
    echo json_encode($emptyPost);
}
$connect->close();