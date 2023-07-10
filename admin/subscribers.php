<?php
if (!isset($_SESSION['user'])) {
  header("location: login.php");
}
?>
<input type="search" name="search" id="search" placeholder="Search subscribers">
<div class="btns" style="margin: 1rem;">
  <button type="button" class="prev" style="background: #31d275;padding:6px;border:none;outline:none">Previous</button>
  <button type="button" class="next" style="background: #31d275;padding:6px;border:none;outline:none">Next</button>
</div>
<table>
  <tr>
    <th>#</th>
    <th>Email</th>
    <th>Date</th>
    <th>Action</th>
  </tr>
  <?php
  require_once("server/connection.php");
  $fetch = 2 + 2;
  $__user = "";
  $select = "";
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
    $select1 = $connect->query("SELECT COUNT(*) FROM subscribers");
    $num_posts = $select1->fetch_row()[0];
    $fetch = min($fetch, $num_posts);
  }
  if (isset($_GET['email']) && $_GET['email'] !== '') {
    $__user = strtolower($_GET['email']);
    $select = $connect->query("SELECT * FROM subscribers WHERE email = '{$__user}' ORDER BY id DESC LIMIT $fetch");
  } else {
    $select = $connect->query("SELECT * FROM subscribers ORDER BY id DESC LIMIT $fetch");
  }

  $count = 0;
  if ($select->num_rows > 0) :
    if ($count < $select->num_rows) {
      $count++;
    }
    $replied = "";
    while ($row = $select->fetch_assoc()) :
  ?>
      <tr>
        <th><?= $count++ ?></th>
        <td class="email" data-id="<?= $row['id'] ?>"><?= $row['email'] ?></td>
        <td class="content">
          <p><?= $row['date_subscribed'] ?></p>
        </td>
        <td><button class="unsub delete" data-id="<?= $row['id'] ?>">unsubscribe</button></td>
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
<script src="./script/jquery.js"></script>
<script>
  $(document).ready(() => {
    const message = new AlertNotify(10000, "top-right", "#000000");
    $(".unsub").on("click", async function() {
      let id = $(this).data("id");
      if (await message.alert_Confirm("Do you want to unsubscribe this user?")) {
        $.ajax({
          url: "./server/unsubscribe.php",
          type: "POST",
          data: {
            id: id
          },
          success: async (suc) => {
            if (suc == "done") {
              message.alert_message(suc, "success");
              await new Promise((resolve) =>
                setTimeout(resolve, 3000)
              );
              location.reload();
              return;
            }
            message.alert_message(suc, "warning");
          }
        })
      }
    })

    const nextButton = document.querySelectorAll(".next");
    const prevButton = document.querySelectorAll(".prev");
    if (nextButton && prevButton) {
      nextButton.forEach((nextBtn) => {
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

      prevButton.forEach((prevBtn) => {
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

    $("#search").on("input keydown paste", function(e) {
      if (e.keyCode === 13) {
        let value = $(this).val();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(value) !== true) {
          message.alert_message('Email is invalid', "warning");
        } else {
          let url = new URL(window.location.href);
          if (url.searchParams.has('email')) {
            url.searchParams.delete("email");
            history.pushState(null, '', url.href);
            location.href += `&email=${encodeURIComponent(value)}`;
          } else {
            location.href += `&email=${encodeURIComponent(value)}`;
          }

        }
      }
    })
  })
</script>