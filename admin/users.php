<?php

if (!isset($_SESSION['user'])) {
    header("location: dash.php");
}
?>

<?php
require_once("server/connection.php");
$user;
$users = $connect->query("SELECT * FROM user WHERE user_id = '{$_SESSION['user']}'");
$user = $users->fetch_assoc();
?>
<div class="setting">
    <div class="users">
        <h1>Users</h1>
        <button class="create">Create</button>
    </div>
    <div class="btns" style="margin: 1rem;">
        <button type="button" class="prev" style="background: #31d275;padding:6px;border:none;outline:none">Previous</button>
        <button type="button" class="next" style="background: #31d275;padding:6px;border:none;outline:none">Next</button>
    </div>
    <table>
        <tr>
            <th>#</th>
            <th>Username</th>
            <th>Image</th>
            <th>Edit</th>
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
    $select1 = $connect->query("SELECT COUNT(*) FROM user");
    $num_posts = $select1->fetch_row()[0];
    $fetch = min($fetch, $num_posts);
  }
        $select = $connect->query("SELECT * FROM user ORDER BY user_id DESC LIMIT $fetch");
        $username = "";
        $count = 0;
        if ($select->num_rows > 0) :
            if ($count < $select->num_rows) {
                $count++;
            }
            while ($row = $select->fetch_assoc()) :
                $username = $row['username'];
        ?>
                <tr>
                    <th><?= $count++ ?></th>
                    <td>
                        <p><?= $row['username'] ?></p>
                    </td>
                    <td class="content">
                        <img src="profile/<?= $row['img'] ?>" alt="" width="50" height="50" />
                    </td>
                    <td><button class="edit" data-id="<?= $row['user_id'] ?>">Edit</button></td>
                    <td><button class="delete" data-id="<?= $row['user_id'] ?>">Delete</button></td>
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
    <form action="" id="users">
        <input type="text" value="<?= $user["username"] ?>" name="username" placeholder="username">
        <input type="text" name="password" placeholder="password (leave blank for auto generated password) leave blank on update if you don't want change password">
        <input type="text" name="type" value="" class="new" readonly>
        <input type="text" name="id" value="" class="user-id" readonly>
        <input type="file" name="img" id="">
        <div class="down">
            <button>Continue</button>
            <button class="cancel">Cancel</button>
        </div>
    </form>
</div>
<script src="./script/jquery.js"></script>
<script>
    $(".create").on("click", () => {
        $("#users").css("display", "flex");
        $('.new').val("new");
        $('.user-id').val("");
    });
    $(".cancel").on("click", (e) => {
        e.preventDefault();
        document.querySelector("#users").reset();
        $("#users").css("display", "none");
    });
    $("body").on("click", " .setting .edit", function() {
        $("#users").css("display", "flex");
        $('.new').val("update");
        let v = $(this).data("id");
        $('.user-id').val(v);
    });

    $("form").on("submit", function(e) {
        e.preventDefault();
        let formData = new FormData(this);
        $.ajax({
            url: "server/add_update.php",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: (data) => {
                if (data == "done") {
                    location.reload();
                } else {
                    alert(data)
                }
            },
            error: (jxr, xhr, error) => {
                console.log("error: " + error);
            }
        })
    })

    $("body").on("click", "td .delete", function() {
        let id = $(this).data("id");
        if (confirm("Delete this user?")) {
            $.ajax({
                url: "server/delete_user.php",
                type: "POST",
                data: {
                    id: id
                },
                success: (data) => {
                    alert(data);
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
</script>