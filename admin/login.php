<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
    <link rel="shortcut icon" href="../assets/image/logo-no-background.png" type="image/x-icon">
    <link rel="stylesheet" href="../assets/style/fonts.css">
    <link rel="stylesheet" href="style/style.css">
    <script src="../assets/script/jquery.js"></script>
    <style>
        ::placeholder {
            color: #eeeeee;
        }
    </style>
</head>

<body>
    <div class="login">
        <img src="../assets/image/logo-no-background.png" class="src" alt />
        <form action="">
            <h1>Coding Nonny Admin Login</h1>
            <input type="text" placeholder="Username" name="username" />
            <input type="password" placeholder="password" name="password" id="password" />
            <input type="checkbox" name="" id="">
            <p>show password</p>
            <button>Login</button>
        </form>
    </div>
    <script type="text/Javascript" src="https://coding-nonny.github.io/alert-notify/dist/alertify.js"></script>
    <script>
        $("input[type=checkbox]").on("click", function() {
            if ($("#password").attr("type") !== "text") {
                $("#password").attr("type", "text");
            } else {
                $("#password").attr("type", "password");
            }
        })

        $("form").on("submit", function(e) {
            e.preventDefault();
            let formdata = new FormData(this);
            $.ajax({
                url: "server/login_func.php",
                type: "POST",
                data: formdata,
                processData: false,
                contentType: false,
                success: function(data) {
                    if (data === "Logged in") {
                        location.href = "index.php";
                        return;
                    }
                    const message = new AlertNotify(10000, "top-right", "#000000");
                    message.alert_message(data, "info", "positioned-modal");
                },
            });
        })
    </script>
</body>

</html>