<?php
session_start();
if (!isset($_SESSION['user'])) {
  header("location: login.php");
}
?>
<?php
include_once("server/connection.php");
$user = "";
$session = $_SESSION['user'];
$users = $connect->query("SELECT * FROM user WHERE user_id = '$session' ");
$user = $users->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashborad</title>
  <link rel="shortcut icon" href="../assets/image/logo-no-background.png" type="image/x-icon" />
  <script src="https://kit.fontawesome.com/32f4291d72.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="../assets/style/fonts.css" />
  <link rel="stylesheet" href="./style/style.css" />
  <link rel="stylesheet" href="./style/prism.css">
  <script src="./script/prism.js"></script>
  <script src="https://coding-nonny.github.io/alert-notify/dist/alertify.js"></script>
  <link rel="stylesheet" href="../assets/style/alert.css">
</head>

<body>
  <div class="dashboard">
    <div class="left">
      <div class="dash-user">
        <h2 style="display: none;">N</h2>
        <img src="profile/<?= $user['img'] ?>" alt="user" />
      </div>
      <div class="dash-nav">
        <li onclick="location.href = 'index.php?page=dash'" class="li-dash" title="dashboard">
          <i class="fa fa-tachometer"></i><a href="">Dashboard</a>
        </li>
        <li onclick="location.href = 'index.php?page=post&posts=2'" class="li-post" title="manage posts"><i class="fa fa-newspaper-o"></i><a href="">Posts</a></li>
        <li onclick="location.href = 'index.php?page=subscribers&limit=2'" class="li-subscribers" title="Subscribers"><i class="fa fa-users"></i><a href="">Subscribers</a></li>
        <li onclick="location.href = 'index.php?page=mail&limit=2'" class="li-mail" title="review and reply mails">
          <span style="display:none"></span><i class="fa fa-envelope"></i><a href="">Mails</a>
        </li>
        <li onclick="location.href = 'index.php?page=comment&limit=2'" class="li-comment" title="review comments">
          <span style="display:none"></span><i class="fa fa-comment"></i><a href="">Comments</a>
        </li>
        <li onclick="location.href = 'index.php?page=users&limit=2'" class="li-users" title="add and edit users"><i class="fa fa-user"></i><a href="">Settings</a></li>
        <li title="change theme"><i class="fas fa-sun" id="mode"></i> <a href="" id="dark">Light</a></li>
        <li id="logout" title="log out"><i class="fa fa-sign-out"></i><a href="">Logout</a></li>
      </div>
    </div>
    <br />
    <div class="right">
      <div class="top">
        <div class="dash-head">
          <i class="fa fa-bars"></i>
          <h2>Welcome, <?= ucwords($user['username']) ?></h2>
        </div>
      </div>
      <main>
        <?php $page = isset($_GET['page']) ? $_GET['page'] : 'dash'; ?>
        <?php include $page . '.php' ?>
      </main>
    </div>
  </div>
  <script src="./script/jquery.js"></script>
  <script>
    $('.li-<?php echo isset($_GET['page']) ? $_GET['page'] : '' ?>').addClass('active');
const alert = new AlertNotify(10000, "top-right", "#000000");
    $("#logout").on("click", async function() {
      if(await alert.alert_Confirm("Do you want to logout?")){
        $.ajax({
        url: "./server/logout.php",
        method: "POST",
        success: (data) => {
          if (data == "logout") {
            location.href = "login.php";
          }
        }
      })
      }
    })
  </script>
  <script src="./script/admin.js"></script>
  <script src="./script/theme.js"></script>
</body>

</html>