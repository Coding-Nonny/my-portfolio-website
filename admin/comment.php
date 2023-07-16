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
    <th>Image</th>
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
          <td><img src="../assets/user/<?= $row['img'] ?>" alt="user image" width="50" height="50"></td>
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
 $(document).ready(()=>{
  const message = new AlertNotify(10000, "top-right", "#000000");
  $("body").on("click", ".edit", async function() {
    let id = $(this).data("id");
    if (await message.alert_Confirm("Do you want to approve this comment?")) {
      $.ajax({
        url: "server/comment_approve.php",
        type: "POST",
        data: {
          id: id
        },
        success: async (data) => {
          message.alert_message(data, "");
            await new Promise((resolve) =>
              setTimeout(resolve, 3000)
            );
            location.reload();
        }
      })
    }
  })


  $("body").on("click", ".delete",async function() {
    let id = $(this).data("id");
    if (await message.alert_Confirm("Do you want to delete this comment?")) {
      $.ajax({
        url: "server/comment_delete.php",
        type: "POST",
        data: {
          id: id
        },
        success:async (data) => {
          message.alert_message('Deleted', "success");
            await new Promise((resolve) =>
              setTimeout(resolve, 3000)
            );
            location.reload();
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

 })
</script>