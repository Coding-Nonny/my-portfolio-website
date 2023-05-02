<?php
if (!isset($_SESSION['user'])) {
    header("location: login.php");
  }
?>
<div class="comment-review">
  <h1>Comment Review</h1>
  <div class="btns" style="margin: 1rem;">
        <button type="button" class="prev" style="background: #31d275;padding:6px;border:none;outline:none">Previous</button>
        <button type="button" class="next" style="background: #31d275;padding:6px;border:none;outline:none">Next</button>
    </div>
  <table>
    <tr>
      <th>#</th>
      <th>Username</th>
      <th>Comment</th>
      <th>Date</th>
      <th>Blog Id</th>
      <th>Approve</th>
      <th>Delete</th>
    </tr>
    <?php
    require_once("server/connection.php");
    $fetch = 2 + 2;

    // check if "posts" parameter is set and not empty
    if (isset($_GET['limit']) && $_GET['limit'] !== '') {

        // parse "posts" parameter as integer
        $posts = intval($_GET['limit']);

        // set $fetch based on "posts" value
        if ($posts <= 2) {
            $fetch = 2 + 2;
        } elseif ($posts > 2) {
            // limit maximum value of $fetch to 100
            $fetch = min($posts + 2, 100);
        }
             // limit $fetch to number of available posts in the database
        $select1 = $connect->query("SELECT COUNT(*) FROM blog_comment");
        $num_posts = $select1->fetch_row()[0];
        $fetch = min($fetch, $num_posts);

       
    }
    $select = $connect->query("SELECT * FROM blog_comment ORDER BY id_blog DESC LIMIT $fetch");
    $count = 0;
    if ($select->num_rows > 0) :
      if ($count < $select->num_rows) {
        $count++;
      }
      $approve = "";
      while ($row = $select->fetch_assoc()) :
        if ($row['status'] == 1) {
          $approve = "Approved";
        } else {
          $approve = "Approve";
        }
    ?>
        <tr>
          <th><?= $count++ ?></th>
          <td>
            <p><?= $row['username'] ?></p>
          </td>
          <td class="content">
            <p><?= $row['comment_text'] ?></p>
          </td>
          <td><?= $row['comment_date'] ?></td>
          <td><?= $row['blog_id'] ?></td>
          <td><button class="edit" data-id="<?= $row['id_blog'] ?>"><?= $approve ?></button></td>
          <td><button class="delete" data-id="<?= $row['id_blog'] ?>">Delete</button></td>
        </tr>
      <?php endwhile; ?>
    <?php else : ?>
      <h1>No Data</h1>
    <?php endif; ?>
  </table>
  <div class="btns" style="margin: 1rem;">
        <button type="button" class="prev" style="background: #31d275;padding:6px;border:none;outline:none">Previous</button>
        <button type="button" class="next" style="background: #31d275;padding:6px;border:none;outline:none">Next</button>
    </div>
</div>
<script src="./script/jquery.js"></script>
<script>
  $("body").on("click", ".edit", function() {
    let id = $(this).data("id");
    if (confirm("Approve this comment?")) {
      $.ajax({
        url: "server/comment_approve.php",
        type: "POST",
        data: {
          id: id
        },
        success: (data) => {
          alert(data);
        }
      })
    }
  })


  $("body").on("click", ".delete", function() {
    let id = $(this).data("id");
    if (confirm("Delete this comment?")) {
      $.ajax({
        url: "server/comment_delete.php",
        type: "POST",
        data: {
          id: id
        },
        success: (data) => {
         if(data == "approved"){
          alert(data);
         }
        }
      })
    }
  })

  const nextButton = document.querySelectorAll(".next");
const prevButton = document.querySelectorAll(".prev");
if (nextButton && prevButton) {
  nextButton.forEach((nextBtn)=>{
    nextBtn.addEventListener("click", () => {
    // get current "posts" parameter from URL
    const params = new URLSearchParams(window.location.search);
    const currentPosts = parseInt(params.get("limit")) || 0;

    // check if current "posts" value is valid
    if (isNaN(currentPosts) || currentPosts < 0) {
      console.error("Invalid 'limit' parameter:", currentPosts);
      return;
    }

    // calculate new "posts" value
    const newPosts = Math.min(currentPosts + 2, <?= $fetch ?>);

    // redirect to new URL with updated "posts" parameter
    if (newPosts !== currentPosts) {
      const url = new URL(window.location.href);
      url.searchParams.set("limit", newPosts);
      window.location.href = url.toString();
    }
  });
  })

  prevButton.forEach((prevBtn) =>{
    prevBtn.addEventListener("click", () => {
    // get current "posts" parameter from URL
    const params = new URLSearchParams(window.location.search);
    const currentPosts = parseInt(params.get("limit")) || 0;

    // check if current "posts" value is valid
    if (isNaN(currentPosts) || currentPosts < 0) {
      console.error("Invalid 'posts' parameter:", currentPosts);
      return;
    }

    // calculate new "posts" value
    const newPosts = Math.max(currentPosts - 2, 0);

    // redirect to new URL with updated "posts" parameter
    if (newPosts !== currentPosts) {
      const url = new URL(window.location.href);
      url.searchParams.set("limit", newPosts);
      window.location.href = url.toString();
    }
  });
  })
}

</script>