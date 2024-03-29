<!DOCTYPE html>
<html lang="en">

<head>
  <?php
  include_once("./admin/server/connection.php");
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

  $post_title = "Coding Nonny";
  $post_image = "./assets/image/logo-no-background.png";
  $post_content = strip_tags("Coding Nonny is a talented full-stack web developer with a passion for crafting innovative digital solutions. With a deep understanding of both front-end and back-end technologies, Coding Nonny brings a holistic approach to web development projects. From designing engaging user interfaces to implementing robust server-side functionalities, Coding Nonny's skill set encompasses the entire spectrum of web development. This developer's commitment to staying up-to-date with the latest industry trends and best practices ensures that every project is executed with precision and excellence..");
  $ogUrl = getMainUrl();
  $type = "website";

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
      $post_image = str_replace("home.php", "", getMainUrl()) . "admin/blog/" . $row["files"];
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
  <title>Coding Nonny</title>
  <meta name="description" content="<?= $post_content ?>" />

  <meta name="keywords" content="Nonny Theophilus, personal, development, entertainment, technology trends, history, sports news, education tips, government policies, humor, portfolio" />
  <meta name="author" content="Coding Nonny" />
  <link rel="icon" href="./assets/image/logo-no-background.png" type="image/x-icon">
  <link rel="shortcut icon" href="./assets/image/logo-no-background.png" type="image/x-icon" />
  <link rel="canonical" href="http://localhost:8080" />
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
  <meta property="og:whatsapp:message" content="<?= $post_title  ?>" />
  <meta property="og:site_name" content="Coding Nonny" />
  <meta property="article:publisher" content="+2348135733563" />
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
    <header>
      <div class="logo" onclick="location.reload();">
        <img src="./assets/image/logo-no-background.png" alt="logo">
        <p>CodingNonny</p>
      </div>
      <ul class="nav">
        <li class="here main" id="homes">
          <a href="#home">Home</a>
        </li>
        <li class="main-two" id="abouts">
          <a href="#about">About Me</a>
        </li>
        <li class="main-one" id="works">
          <a href="#work">Projects</a>
        </li>
        <li class="main-four" id="services">
          <a href="#service">My Services</a>
        </li>
        <li class="main-three" id="blogs">
          <a href="#blog">Blog</a>
        </li>
      </ul>
      <div class="contact-me">
        <a href="#contact">Contact</a>
      </div>
      <div class="bars">
        <i class="fas fa-bars" id="bars"></i>
      </div>
      <div class="s-down" id="down"></div>
    </header>
    <div class="mode">
      <i class="fas fa-sun" id="mode" title="toggle day and night"></i>
      <i class="fas fa-palette" title="change theme"></i>
    </div>
    <div class="intro home">
      <div id="alert"></div>
      <section id="home">
        <div class="intro-text">
          <div class="name">
            <h1>
              Hola, Welcome,<br />
              I am Coding Nonny.
            </h1>
            <div class="intro-typing">
              <p></p>
            </div>
          </div>
          <div class="call-action">
            <a href="resume.html" title="print resume" target="_blank" class="hire">See Resume</a>
            <a href="#contact" title="contact me" class="know">Get In Touch</a>
          </div>
          <div class="social-links">
            <a href="https://www.facebook.com/theophilusnonny" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://wa.me/message/SXGIV25TKXYOO1" target="_blank" title="WhatsApp"><i class="fa fa-whatsapp"></i></a>
            <a href="https://www.linkedin.com/in/theophilus-chinonso-chikezie-2a4555237" target="_blank" title="linkedin"><i class="fab fa-linkedin"></i></a>
            <a href="https://instagram.com/nonny_theophilus?igshid=YmMyMTA2M2Y=" target="_blank" title="instagram"><i class="fab fa-instagram"></i></a>
          </div>
          <div class="intro-special">
            <div class="n" style="display: none">
              <h1>N</h1>
            </div>
            <p style="display: none">
              <b style="display: none">Nonny_Theophilus..</b>. An experienced fullstack Web
              Developer.
            </p>
            <pre class="language-javascript">
                <code class="language-javascript">
                  days.forEach((day) =>{ if(alive &&
                  healthy){ pray(); work(); eat();
                  sleep(); repeat(); } })
                </code>
              </pre>
          </div>
        </div>
        <img src="" alt="" class="my-img" />
        <div class="intro-img">
          <img src="" alt="" class="my-img1" />
          <img src="./assets/image/colors.png" alt="" class="color" />
          <div class="project">
            <h4></h4>
            <small>Projects Completed</small>
          </div>
          <div class="xp">
            <h4>Coding-Nonny</h4>
            <small>2yrs XP</small>
          </div>
        </div>
      </section>
      <section id="about">
        <div class="our-story">
          <h2>About <span>Me</span></h2>
          <div class="profile">
            <div class="about-text">
              <p>
                Chikezie Chinonso Theophilus, I
                am a fullstack web developer. My
                mission is to make the world a
                more accessible and inclusive
                place by breaking language
                barriers and enabling people to
                communicate effectively across
                cultures and languages. As a
                self taught software developer,
                I have developed various local
                web applications for companies
                and for practice. some of the
                projects are, Hospital
                management system, Bakery
                management system, stock
                management system using
                technologies like PHP(Hypertext
                Preprocessor), CSS(Cascading
                Style Sheet), Javascript,
                HTML(Hyper Text Markup
                Language), Jquery etc.
              </p>
              <br />
              <p>
                I believe that with the
                continued support from You, I
                can achieve this goal. Apart
                from being a Software developer,
                I also specialize in computer
                repairs, sales and maintenance,
                CCTV camera installation and
                maintenance.
              </p>
            </div>
            <div class="intro-img">
              <img src="./assets/image/PXL_20230320_145608575_adobe_express.png" alt="" class="my-img" />
              <img src="./assets/image/colors.png" alt="" class="color" />
            </div>
          </div>
          <h2 class="skill">Skills</h2>
          <div class="skill-div">
            <h2>
              <span>Frontend</span>
            </h2>
            <ul>
              <li class="frontend notranslate" data-name="HTML" data-level="90">
                <p>HTML 90%</p>
                <span class="level-bar"></span>
              </li>
              <li class="frontend notranslate" data-name="CSS" data-level="80">
                <p>CSS 80%</p>
                <span class="level-bar"></span>
              </li>
              <li class="frontend notranslate" data-name="JAVASCRIPT" data-level="50">
                <p>JAVASCRIPT 50%</p>
                <span class="level-bar"></span>
              </li>
              <li class="frontend notranslate" data-name="JQUERY" data-level="50">
                <p>JQUERY 50%</p>
                <span class="level-bar"></span>
              </li>
            </ul>
          </div>
          <div class="skill-div">
            <h2>
              <span>Backend</span>
            </h2>
            <ul>
              <li class="backend frontend notranslate" data-name="PHP" data-level="50">
                <p>PHP 50%</p>
                <span class="level-bar"></span>
              </li>
              <li class="backend frontend notranslate" data-name="SQL" data-level="60">
                <p>SQL 50%</p>
                <span class="level-bar"></span>
              </li>
            </ul>
          </div>
          <div class="skill-div">
            <h2>
              <span>Looking To Upgrade My Skill
                With</span>
            </h2>
            <ul>
              <li class="learning">React JS</li>
              <li class="learning">
                React Native
              </li>
              <li class="learning">Next JS</li>
              <li class="learning">Laravel</li>
              <li class="learning">
                Codeigniter
              </li>
            </ul>
          </div>
        </div>
        <div class="about-left">
          <strong>Coding Nonny</strong>
          <br />
          <pre class="language-html">
              <code class="language-html">
                <b>Let's Build Something Fantastic Together.</b>
                <br>
                Always ready to recieve your order.
              </code>
            </pre>
        </div>
        <div class="about-right">
          <pre class="language-php">
              <code class="language-php">
                echo(" Any sufficiently advanced technology
                is indistinguishable from magic.");
               </code>
            </pre>
        </div>
      </section>
      <section id="work">
        <div class="work">
          <div class="project">
            <h1>My Github Repositories.</h1>
            <div class="all-projects"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#273036" fill-opacity="1" d="M0,96L110.8,96L221.5,32L332.3,64L443.1,192L553.8,64L664.6,192L775.4,192L886.2,160L996.9,160L1107.7,128L1218.5,64L1329.2,192L1440,224L1440,320L1329.2,320L1218.5,320L1107.7,320L996.9,320L886.2,320L775.4,320L664.6,320L553.8,320L443.1,320L332.3,320L221.5,320L110.8,320L0,320Z"></path>
            </svg>
          </div>
        </div>
      </section>
      <section id="service">
        <div class="service">
          <h1>
            Quality Services with <br />
            best Price.
          </h1>
          <ul class="service-list">
            <li>
              <h2>
                Website design and development.
                <i class="fa fa-globe"></i>
              </h2>
              <p>
                Set to give you a well
                structured websites and web
                applications that is easy to
                navigate, user-friendly and well
                optimized for search engines.
              </p>
            </li>
            <li>
              <h2>
                E-commerce website development.
                <i class="fa fa-exchange"></i>
              </h2>
              <p>
                Every business organization
                needs online store to enable
                customers view and buy their
                Products. Developing a well
                scaled e-commerce website for
                your business is not a problem
                for me.
              </p>
            </li>
            <li>
              <h2>
                Content management system.
                <i class="fa fa-tachometer"></i>
              </h2>
              <p>
                This enables you the client to
                manage all contents on your
                website. You can add, remove,
                update and delete contents from
                your website.
              </p>
            </li>
            <li>
              <h2>
                Web application development.
                <i class="fa fa-crosshairs"></i>
              </h2>
              <p>
                This involves web-based
                applications that run on any
                device with internet connection
              </p>
            </li>
            <li>
              <h2>
                Responsive website design.
                <i class="fa fa-desktop"></i>
              </h2>
              <p>
                A responsive website gives you a
                good user interface accross all
                devices e.g The view on a
                desktop is not same with the
                mobile view.
              </p>
            </li>
            <li>
              <h2>
                Website maintenance and updates.
                <i class="fa fa-cog"></i>
              </h2>
              <p>
                I maintain and update your
                existing websites.
              </p>
            </li>
            <li>
              <h2>
                Web hosting and server
                management.
                <i class="fa fa-server"></i>
              </h2>
              <p>
                I host your website with a good
                hosting service so your websites
                or web apllications stay online
                24/7
              </p>
            </li>
            <li>
              <h2>
                Search engine optimization.
                <i class="fa fa-search-plus"></i>
              </h2>
              <p>
                This improves your website
                visibilty on search engines.
              </p>
            </li>
            <li>
              <h2>
                Website Security and Protection.
                <i class="fa fa-shield" aria-hidden="true"></i>
              </h2>
              <p>
                Protects your website from cyber
                attacks
              </p>
            </li>
            <li>
              <h2>
                website analytics and tracking.
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
              </h2>
              <p>
                This helps you see how people
                interact with your site or web
                application.
              </p>
            </li>
          </ul>
          <div class="more-services">
            <h1>More Services.</h1>
            <p class="notranslate"></p>
          </div>
          <a href="#contact" style="display: none"></a>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#273036" fill-opacity="1" d="M0,96L120,128L240,160L360,64L480,160L600,160L720,192L840,64L960,96L1080,96L1200,160L1320,96L1440,32L1440,320L1320,320L1200,320L1080,320L960,320L840,320L720,320L600,320L480,320L360,320L240,320L120,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      <section id="contact">
        <div class="contact">
          <div class="contact-head">
            <h1>Ways To Contact Me</h1>
            <p>
              Connect With Coding Nonny: Reach Out for Questions and Collaboration.
            </p>
          </div>
          <div class="social-links">
            <a href="https://www.facebook.com/theophilusnonny" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://wa.me/message/SXGIV25TKXYOO1" target="_blank" title="WhatsApp"><i class="fa fa-whatsapp"></i></a>
            <a href="https://www.linkedin.com/in/theophilus-chinonso-chikezie-2a4555237" target="_blank" title="linkedin"><i class="fab fa-linkedin"></i></a>
            <a href="https://instagram.com/nonny_theophilus?igshid=YmMyMTA2M2Y=" target="_blank" title="instagram"><i class="fab fa-instagram"></i></a>
          </div>
          <div class="contact-icon">
            <div>
              <i class="fas fa-phone"></i>
              <p><a href="tel:+2349014586518">+2349014586518</a></p>
            </div>
            <div>
              <i class="fa fa-whatsapp"></i>
              <p><a href="https://wa.me/message/SXGIV25TKXYOO1" target="_blank" title="WhatsApp">+2348135733563</a></p>
            </div>
            <div>
              <i class="fa fa-envelope"></i>
              <p><a href="mailto:chikezienonny@gmail.com">chikezienonny@gmail.com</a></p>
            </div>
          </div>
          <form action="">
            <h3>Send a message</h3>
            <div class="success-msg">
              <p></p>
            </div>
            <div class="form-left">
              <div>
                <label for="name">Your name
                  <i class="fas fa-signature"></i></label>
                <input type="text" placeholder="Your name" name="name" id="name" autocomplete="off" />
              </div>
              <div>
                <label for="email">Email
                  <i class="fas fa-envelope"></i></label>
                <input type="text" placeholder="Your email address" name="email" id="email" autocomplete="off" />
              </div>
              <div>
                <label for="number">Phone number
                  <i class="fas fa-phone"></i></label>
                <input type="text" placeholder="Your phone number (optional)" name="number" id="number" autocomplete="off" />
              </div>
            </div>
            <div class="form-right">
              <label for="message">Message
                <i class="fa fa-comment"></i></label>
              <textarea name="message" id="message" cols="30" rows="10" placeholder="message"></textarea>
            </div>
            <button title="send message" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </section>
      <section id="blog">
        <div class="blog">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#273036" fill-opacity="1" d="M0,32L0,64L48,64L48,0L96,0L96,160L144,160L144,160L192,160L192,160L240,160L240,96L288,96L288,192L336,192L336,96L384,96L384,160L432,160L432,128L480,128L480,288L528,288L528,288L576,288L576,0L624,0L624,128L672,128L672,64L720,64L720,64L768,64L768,256L816,256L816,128L864,128L864,256L912,256L912,96L960,96L960,160L1008,160L1008,64L1056,64L1056,96L1104,96L1104,224L1152,224L1152,32L1200,32L1200,0L1248,0L1248,64L1296,64L1296,288L1344,288L1344,192L1392,192L1392,192L1440,192L1440,0L1392,0L1392,0L1344,0L1344,0L1296,0L1296,0L1248,0L1248,0L1200,0L1200,0L1152,0L1152,0L1104,0L1104,0L1056,0L1056,0L1008,0L1008,0L960,0L960,0L912,0L912,0L864,0L864,0L816,0L816,0L768,0L768,0L720,0L720,0L672,0L672,0L624,0L624,0L576,0L576,0L528,0L528,0L480,0L480,0L432,0L432,0L384,0L384,0L336,0L336,0L288,0L288,0L240,0L240,0L192,0L192,0L144,0L144,0L96,0L96,0L48,0L48,0L0,0L0,0Z"></path>
          </svg>
          <div class="blog-head">
            <h1>Journey of Words: Where Ideas Take Flight</h1>
            <div class="subscribe">
              <h4>
                Subscribe to my NewsLetter. Get
                email notifications once a new
                blog is posted.
              </h4>
              <input type="text" placeholder="Email address" name="sub" />
              <button id="subscribe" title="subscribe" type="button">
                Subscribe Now
              </button>
            </div>
          </div>
          <div class="blog-type">
            <span id="all">All</span>
            <span id="personal">Personal</span>
            <span id="sports">Sports</span>
            <span id="funny">Funny</span>
            <span id="history">History</span>
            <span id="tech">Technology</span>
            <span id="gov">Government</span>
            <span id="ent">Entertainment</span>
            <span id="edu">Education</span>
            <span id="dev">Development</span>
          </div>
          <div class="blog-search">
            <input type="search" name="search" id="search-blog" placeholder="search contents" />
            <button type="button" title="search">
              <i class="fas fa-search"></i>
            </button>
          </div>
          <div class="blog-div"></div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#273036" fill-opacity="1" d="M0,192L15,170.7C30,149,60,107,90,122.7C120,139,150,213,180,245.3C210,277,240,267,270,229.3C300,192,330,128,360,106.7C390,85,420,107,450,101.3C480,96,510,64,540,74.7C570,85,600,139,630,149.3C660,160,690,128,720,122.7C750,117,780,139,810,128C840,117,870,75,900,64C930,53,960,75,990,106.7C1020,139,1050,181,1080,176C1110,171,1140,117,1170,106.7C1200,96,1230,128,1260,165.3C1290,203,1320,245,1350,229.3C1380,213,1410,139,1425,101.3L1440,64L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      <div class="footer">
        <div class="col-1">
          <h3>
            Coding Nonny &copy;
            <p></p>
            All Right Reserved
          </h3>
          <img src="./assets/image/logo-no-background.png" alt="logo" />
        </div>
        <div class="col-2">
          <h3>NEWSLETTER</h3>
          <div class="form">
            <input name="text" type="text" placeholder="Your Email Address" data-id="0" />
            <br />
            <button class="s" title="subscribe" type="button" data-id="0">
              SUBSCRIBE NOW
            </button>
          </div>
        </div>
        <div class="col-3">
          <h3>SOCIAL LINKS</h3>
          <div class="social-links">
            <a href="https://www.facebook.com/theophilusnonny" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://wa.me/message/SXGIV25TKXYOO1" target="_blank" title="WhatsApp"><i class="fa fa-whatsapp"></i></a>
            <a href="https://www.linkedin.com/in/theophilus-chinonso-chikezie-2a4555237" target="_blank" title="linkedin"><i class="fab fa-linkedin"></i></a>
            <a href="https://instagram.com/nonny_theophilus?igshid=YmMyMTA2M2Y=" target="_blank" title="instagram"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
    <div class="loader">
      <div class="load"></div>
      <div class="load"></div>
      <div class="load"></div>
      <div class="load"></div>
    </div>
    <div id="google-element"></div>
  </div>
  <script type="text/Javascript" src="./assets/script/prism.js"></script>
  <script type="text/Javascript" src="./admin/script/marked.js"></script>
  <script type="text/Javascript" src="./assets/script/jquery.js"></script>
  <script type="text/Javascript" src="https://coding-nonny.github.io/alert-notify/dist/alertify.js"></script>
  <script type="text/Javascript" src="./assets/script/github-fetch.js"></script>
  <script type="text/Javascript" src="./assets/script/mode.js"></script>
  <script type="text/Javascript" src="./assets/script/lazysizes.min.js"></script>
  <script type="text/Javascript" src="./assets/script/blog-func.js"></script>
  <script type="text/Javascript" src="./assets/script/home.js"></script>
  <script type="text/Javascript" src="./assets/script/view.js"></script>
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
      $(document).ready(function () {
        // Select the parent element
        // Get all the skill elements
        var skills =
          document.getElementsByClassName(
            "frontend"
          );

        // Create an intersection observer instance
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                // Get the level bar element within the current skill
                var levelBar =
                  entry.target.querySelector(
                    ".level-bar"
                  );
                var levelP =
                  entry.target.querySelector("p");
                // Get the skill level as a percentage (0 to 100)
                var skillLevel =
                  entry.target.getAttribute(
                    "data-level"
                  );
                // Get the skill name using data-name attribute
                var skill =
                  entry.target.getAttribute(
                    "data-name"
                  );

                // Set the width of the level bar based on the skill level
                levelBar.style.width =
                  skillLevel + "%";
                let count = 0;
                let debounceTimeoutId = null;

function updateCount() {
  if (count <= parseInt(skillLevel)) {
    levelP.textContent = `${skill} ${count}%`;
    count++;
    debounceTimeoutId = requestAnimationFrame(updateCount);
  }
}

function debounceUpdate() {
  if (debounceTimeoutId) {
    cancelAnimationFrame(debounceTimeoutId);
  }
  debounceTimeoutId = requestAnimationFrame(updateCount);
}

debounceUpdate();

              } else {
                var levelBar =
                  entry.target.querySelector(
                    ".level-bar"
                  );
                levelBar.style.width = "0";
              }
            });
          }
        );

        // Observe each skill element
        Array.prototype.forEach.call(
          skills,
          function (skill) {
            observer.observe(skill);
          }
        );

        // Access the CSS root
        const root = document.documentElement;

        // Change the color by modifying the CSS variable
        root.style.setProperty(
          "--color-after",
          JSON.parse(
            localStorage.getItem("color")
          ) || "#31d275"
        ); // Updated color
      });

      const metaTag = document.querySelector('meta[name="theme-color"]');
      metaTag.setAttribute('content',JSON.parse(
            localStorage.getItem("color")
          ) || "#31d275");

      let waves =
        document.querySelectorAll("svg path");
      waves.forEach((wave) => {
        wave.setAttribute(
          "fill",
          JSON.parse(
            localStorage.getItem("color")
          ) || "#31d275"
        );
      });

      const svgShow =
        document.querySelector(".my-img");
      const svgShow1 =
        document.querySelector(".my-img1");
      const svg = [
        "./assets/svg/undraw_aircraft_re_m05i.svg",
        "./assets/svg/undraw_cloud_hosting_7xb1.svg",
        "./assets/svg/undraw_code_thinking_re_gka2.svg",
        "./assets/svg/undraw_editable_re_4l94.svg",
        "./assets/svg/undraw_freelancer_re_irh4.svg",
        "./assets/svg/undraw_newspaper_re_syf5.svg",
        "./assets/svg/undraw_programming_re_kg9v.svg",
        "./assets/svg/undraw_react_re_g3ui.svg",
        "./assets/svg/undraw_source_code_re_wd9m.svg",
        "./assets/svg/undraw_source_code_re_wd9m.svg",
        "./assets/svg/undraw_blog_post_re_fy5x.svg",
        "./assets/svg/undraw_coding_re_iv62.svg",
        "./assets/svg/undraw_mobile_devices_k1ok.svg",
        "./assets/svg/undraw_real_time_sync_re_nky7.svg",
        "./assets/svg/undraw_artificial_intelligence_re_enpp.svg",
        "./assets/svg/undraw_fixing_bugs_w7gi.svg",
        "./assets/svg/undraw_into_the_night_vumi.svg",
        "./assets/svg/undraw_social_share_re_qb4v.svg",
      ];

      (function changeSvg() {
        const svgToShow =
          svg[
            Math.floor(Math.random() * svg.length)
          ];
        svgShow.src = svgToShow;
        svgShow1.src = svgToShow;
        setTimeout(changeSvg, 20000);
      })();

      window.onload = () => {
        document.querySelector(".loader").style =
          "display:none";
      };
    </script>
  <script type="text/Javascript" src="./assets/script/installer.js"></script>
</body>

</html>