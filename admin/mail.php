<?php
if (!isset($_SESSION['user'])) {
  header("location: login.php");
}
?>
<div class="mails">
  <h1>Mails</h1>
  <div class="btns" style="margin: 1rem;">
    <button type="button" class="prev" style="background: #31d275;padding:6px;border:none;outline:none">Previous</button>
    <button type="button" class="next" style="background: #31d275;padding:6px;border:none;outline:none">Next</button>
  </div>
  <table>
    <tr>
      <th>#</th>
      <th>From</th>
      <th>Email</th>
      <th>Message</th>
      <th>Date</th>
      <th>Reply</th>
      <th>Delete</th>
    </tr>
    <?php
    require_once("server/connection.php");
    require_once("server/connection.php");
    // set default value for $fetch
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
      $select1 = $connect->query("SELECT COUNT(*) FROM mail");
      $num_posts = $select1->fetch_row()[0];
      $fetch = min($fetch, $num_posts);
    }
    $select = $connect->query("SELECT * FROM mail ORDER BY mail_id DESC LIMIT $fetch");
    $count = 0;
    if ($select->num_rows > 0) :
      if ($count < $select->num_rows) {
        $count++;
      }
      $replied = "";
      while ($row = $select->fetch_assoc()) :
        if ($row['status'] == 1 && $row['reply'] !== "") {
          $replied = "Replied";
        } else {
          $replied = "Reply";
        }
    ?>
        <tr>
          <th><?= $count++ ?></th>
          <td class="from">
            <p data-id="<?= $row['mail_id'] ?>"><?= $row['username'] ?></p>
          </td>
          <td class="email" data-id="<?= $row['mail_id'] ?>"><?= $row['email'] ?></td>
          <td><?= $row['mail_text'] ?></td>
          <td class="content">
            <p><?= $row['mail_date'] ?></p>
          </td>
          <td><button class="edit" data-id="<?= $row['mail_id'] ?>"><?= $replied ?></button></td>
          <td><button class="delete" data-id="<?= $row['mail_id'] ?>">Delete</button></td>
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
  <form action="">
    <h2>Reply form</h2>
    <input type="number" readonly name="id" />
    <input type="text" readonly name="name" />
    <input type="email" name="email" id="email">
    <textarea name="reply" id="" cols="30" rows="10" placeholder="Reply Aa"></textarea>
    <div class="f-down">
      <button class="reply">Reply</button>
      <button class="cancel">Cancel</button>
    </div>
  </form>
</div>
<script src="./script/jquery.js"></script>
<script>
  $(document).ready(() => {
    const message = new AlertNotify(10000, "top-right", "#000000");
    $("body").on("click", ".edit", function() {
      let id = $(this).data("id");
      let name = $(`.from p[data-id=${id}]`).text();
      let email = $(`.email[data-id=${id}]`).text();
      $("input[type=number]").val(id);
      $("input[type=text]").val(name);
      $("input[type=email]").val(email);
      $(".mails form").css("display", "flex");
    })


    $("form").on("submit", function(e) {
      e.preventDefault();
    })


    $("body").on("click", ".cancel", function() {
      $(".mails form").css("display", "none");
      $(".mails form")[0].reset();
    })
    let form = document.querySelector("form");
    $(".reply").on("click", async function() {
      let formData = new FormData(form);
      if (await message.alert_Confirm("Do you want to reply this user?")) {
        $.ajax({
          url: "server/replied.php",
          method: "POST",
          data: formData,
          processData: false,
          contentType: false,
          success: async (data) => {
            if (data == "done") {
              message.alert_message('replied', "success");
              await new Promise((resolve) =>
                setTimeout(resolve, 3000)
              );
              location.reload();
            } else {
              message.alert_message(data, "warning");
            }
          },
          error: (jxr, xhr, error) => {
            console.log("error: " + error);
          }
        })
      }
    })


    $("body").on("click", ".delete", async function() {
      let id = $(this).data("id");
      if (await message.alert_Confirm("Do you want to delete this message?")) {
        $.ajax({
          url: "server/mail_delete.php",
          type: "POST",
          data: {
            id: id
          },
          success: async (data) => {
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
  })
</script>