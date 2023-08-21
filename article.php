<!DOCTYPE html>
<html lang="en">
<head>
    <?php
    include_once("./admin/server/connection.php");
    $post_title = "Coding Nonny";
    $post_image = "./assets/image/logo-no-background.png";
    $post_content = strip_tags("Coding Nonny is a talented full-stack web developer with a passion for crafting innovative digital solutions. With a deep understanding of both front-end and back-end technologies, Coding Nonny brings a holistic approach to web development projects. From designing engaging user interfaces to implementing robust server-side functionalities, Coding Nonny's skill set encompasses the entire spectrum of web development. This developer's commitment to staying up-to-date with the latest industry trends and best practices ensures that every project is executed with precision and excellence..");
    $ogUrl = getMainUrl();
    $type = "website";
    function getMainUrl()
    {
        $main = "http";
        if (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on") {
            $main .= "s";
        }
        $main .= "://" . $_SERVER["SERVER_NAME"];
        if (strpos($_SERVER["REQUEST_URI"], "?") !== false) {
            $main .= strtok($_SERVER["REQUEST_URI"], "?");
        } else {
            $main .= $_SERVER["REQUEST_URI"];
        }
        return $main;
    }

    if (isset($_GET['article'])) {
        $post_id = $_GET['article'];
        $sql = "SELECT * FROM blog WHERE id = ?";
        $stmt = mysqli_stmt_init($connect);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            echo $connect->error;
            exit;
        }
        mysqli_stmt_bind_param($stmt, "i", $post_id);
        if (!mysqli_stmt_execute($stmt)) {
            echo $connect->error;
            mysqli_stmt_close($stmt); // Close the prepared statement on error
            exit;
        }
        $result = mysqli_stmt_get_result($stmt);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $post_title = $row['title'];
            $post_image = str_replace("article/45", "", getMainUrl()) . "admin/blog/" . $row["files"];
            $title = $_GET['title'];
             $post_image = str_replace("/$title", "", $post_image);
            $post_content = strip_tags($row['content']);
            $type = "article";
            $page_url = getMainUrl();
            $ogUrl = $page_url . "?article=$post_id";
        } else {
            http_response_code(404);
            mysqli_stmt_close($stmt);
            exit();
        }
        if (strlen($post_content) > 200) {
            $post_content = substr($post_content, 0, 200) . "...";
        }
        mysqli_stmt_close($stmt);
    } else {
        $post_image = str_replace("home.html", "", getMainUrl()) . "assets/image/logo-no-background.png";
        $ogUrl = getMainUrl();
    }
    $connect->close(); // Close the database connection after all operations
    ?>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= $post_title ?></title>
    <meta name="description" content="<?= $post_content ?>" />
    <meta name="keywords" content="Nonny Theophilus, personal, development, entertainment, technology trends, history, sports news, education tips, government policies, humor, portfolio" />
    <meta name="author" content="Coding Nonny" />
    <base href="http://localhost:8080">
    <link rel="icon" href="./assets/image/logo-no-background.png" type="image/x-icon">
    <link rel="shortcut icon" href="./assets/image/logo-no-background.png" type="image/x-icon" />
    <link rel="canonical" href="<?= $ogUrl ?>" />
    <meta property="og:type" content="<?= $type ?>" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="<?= $post_title ?>" />
    <meta property="og:description" content="<?= $post_content ?>" />
    <meta property="og:image" content="<?= $post_image ?>" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="<?= $ogUrl ?>" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?= $post_title ?>" />
    <meta name="twitter:description" content="<?= $post_content ?>" />
    <meta name="twitter:image" content="<?= $post_image ?>" />
    <meta name="twitter:url" content="<?= $ogUrl ?>" />
    <!-- Instagram meta tags for sharing -->
    <meta property="og:insta:shareable" content="true" />
    <!-- WhatsApp meta tags for sharing -->
    <meta property="og:whatsapp:message" content="<?= $post_title ?>" />
    <meta property="og:site_name" content="<?= $post_title ?>" />
    <meta property="article:publisher" content="" />
     <link rel="manifest" href="./manifest.webmanifest" /> 
    <meta name="theme-color" content="" />
    <script type="text/Javascript" src="https://kit.fontawesome.com/32f4291d72.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./assets/style/fonts.css" />
    <link rel="stylesheet" href="./assets/style/style.css" />
    <link rel="stylesheet" href="./assets/style/alert.css" />
    <link rel="stylesheet" href="./assets/style/prism.css" />
</head>
<body>
    <div class="welcome">
        <div class="mode">
            <i class="fas fa-sun" id="mode" title="toggle day and night"></i>
            <i class="fas fa-palette" title="change theme"></i>
        </div>
        <div class="intro home">
            <div id="alert"></div>
            <section id="blog">
                <div class="blog">
                    <div class="blog-div"></div>
                </div>
            </section>
        </div>
        <div class="loader">
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
        </div>
    </div>
    <script type="text/Javascript" src="./assets/script/prism.js"></script>
    <script type="text/Javascript" src="./admin/script/marked.js"></script>
    <script type="text/Javascript" src="./assets/script/jquery.js"></script>
    <script type="text/Javascript" src="https://coding-nonny.github.io/alert-notify/dist/alertify.js"></script>
    <script type="text/Javascript" src="./assets/script/mode.js"></script>
    <script type="text/Javascript" src="./assets/script/lazysizes.min.js"></script>
    <script type="text/Javascript" src="./assets/script/single-article.js"></script>
    <script type="text/Javascript" src="./assets/script/article.js"></script>
    <script type="text/Javascript">
        if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('./servicer-worker.js')
            .then(function(registration) {
              console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(function(error) {
              console.log('Service Worker registration failed:', error);
            });
        });
      }
    </script>
    <script type="text/Javascript">
        (function () {
        var docElem =
          document.querySelector(".welcome");

        window.lazySizesConfig =
          window.lazySizesConfig || {};

        window.lazySizesConfig.loadMode = 1;

        //set expand to a higher value on larger displays
        window.lazySizesConfig.expand = Math.max(
          Math.min(
            docElem.clientWidth,
            docElem.clientHeight,
            1222
          ) - 1,
          359
        );
        window.lazySizesConfig.expFactor =
          lazySizesConfig.expand < 380 ? 3 : 2;
      })();

      window.onload = () => {
        document.querySelector(".loader").style =
          "display:none";
      };
      </script>
    <script>
        const loadedContent = async (blogId) => {
            try {
                getSearchBlog(blogId);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                let display = $(`body .intro #blog .blog .blog-div .blog-posts[data-id="${blogId}"]`);
                if (display.length > 0) {
                    display.addClass("blog-toggle");
                } else {
                    // Show an alert message if the element doesn't exist
                    const message = new AlertNotify(10000, "top-right", "#000000");
                    message.alert_message("Problem Fetching Content", "info");
                }
            } catch (error) {
                console.error("Error fetching or processing content:", error);
            }
        };


        window.addEventListener("DOMContentLoaded", async () => {
            const blogId = "<?= $_GET['article'] ?>";
            if (blogId !== "") {
                loadedContent(blogId);
            }
            await new Promise((resolve) => setTimeout(resolve, 3000));
            const userName = localStorage.getItem("username");
            const userEmail = localStorage.getItem("email");
            $("body .intro #blog .blog .blog-div .blog-posts .blog-action form input[type=text]").val(userName);
            $("body .intro #blog .blog .blog-div .blog-posts .blog-action form input[type=email]").val(userEmail);
        })
    </script>
    <script type="text/Javascript" src="./assets/script/installer.js"></script>
</body>
</html>