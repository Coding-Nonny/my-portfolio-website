<?php
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    http_response_code(403);
    echo "You don't have permission to access this page.";
    exit();
}

include("connection.php");

// Validate and sanitize the ID parameter
$id = isset($_POST['id']) ? intval($_POST['id']) : 0;

// Check if the ID is valid (greater than 0)
if ($id <= 0) {
    http_response_code(400);
    echo "Invalid ID.";
    exit();
}

try {
    // Use a prepared statement to prevent SQL injection
    $stmt = $connect->prepare("DELETE FROM blog_comment WHERE id_blog = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    // Check if the deletion was successful
    if ($stmt->affected_rows > 0) {
        echo "done";
    } else {
        http_response_code(404);
        echo "Comment not found or already deleted.";
    }

    // Close the statement
    $stmt->close();
} catch (Exception $e) {
    http_response_code(500);
    echo "An error occurred while processing the request.";
}

// Close the database connection
$connect->close();
