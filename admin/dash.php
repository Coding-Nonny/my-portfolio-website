<?php
if (!isset($_SESSION['user'])) {
    header("location: login.php");
  }
?>
<?php  
        require_once("server/connection.php");
        $posts = 0;
        $select = $connect->query("SELECT * FROM blog");
        if($select->num_rows > 0){
            $posts = $select->num_rows;
        }

        $comment =  0;
        $select1 = $connect->query("SELECT * FROM blog_comment");
        if($select1->num_rows > 0){
            $comment = $select1->num_rows;
        }

        $mail = 0;
        $select2 = $connect->query("SELECT * FROM mail");
        if($select2->num_rows > 0){
            $mail = $select2->num_rows;
        }

        $subscribers = 0;
        $select3 = $connect->query("SELECT * FROM subscribers");
        if($select3->num_rows > 0){
            $subscribers = $select3->num_rows;
        }

        $users = 0;
        $select4 = $connect->query("SELECT * FROM user");
        if($select4->num_rows > 0){
            $users = $select4->num_rows;
        }
        ?>
<div class="analytic">
    <h1>Analytics</h1>
    <div class="analytic-box">
        <div class="box" id="post">
            <i class="fa fa-newspaper-o"></i>
            <b><?= $posts ?></b>
            <p>Posts</p>
        </div>
        <div class="box" id="user">
            <i class="fa fa-users"></i>
            <b><?= $subscribers ?></b>
            <p>Subscribers</p>
        </div>
        <div class="box" id="comment">
            <i class="fa fa-comment"></i>
            <b><?= $comment ?></b>
            <p>Comments</p>
        </div>
        <div class="box" id="mail">
            <i class="fa fa-envelope"></i>
            <b><?= $mail ?></b>
            <p>Mail</p>
        </div>
        <div class="box" id="">
            <i class="fa fa-envelope"></i>
            <b><?= $users ?></b>
            <p>Users</p>
        </div>
    </div>
</div>