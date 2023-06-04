$(document).ready(async function () {
  const message = new AlertNotify(10000,"top-right", "#000000");

  let bar = document.querySelector(".bar"),
    menu = document.querySelector(".nav"),
    contact = document.querySelector(
      ".contact-me"
    ),
    icon = document.querySelector(".bar #bars"),
    menuList = document.querySelectorAll(
      ".welcome header .nav li"
    );
  let home = document.querySelector(".main");

  bar.addEventListener("click", () => {
    menu.classList.toggle("show-menu");
    contact.classList.toggle("contact-icon");
    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-times");
    }
  });

  home.classList.add("here");
  home.style.borderBottom = `2px solid ${
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275"
  }`;
  document
    .querySelector(".blog-type #all")
    .classList.add("current");

  menuList.forEach((list) => {
    list.onclick = function () {
      menuList.forEach((list) => {
        list.classList.remove("here");
        list.style.borderBottom = "none";
      });
      this.classList.add("here");
      if (this.classList.contains("here")) {
        this.style.borderBottom = `2px solid ${
          JSON.parse(
            localStorage.getItem("color")
          ) || "#31d275"
        }`;
      }
      if (menu.classList.contains("show-menu")) {
        menu.classList.remove("show-menu");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        contact.classList.remove("contact-icon");
      }
    };
  });

  document
    .querySelector(
      ".welcome header .contact-me"
    )
    .addEventListener("click", function () {
      if (menu.classList.contains("show-menu")) {
        menu.classList.remove("show-menu");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        this.classList.remove("contact-icon");
        menuList.forEach((list) => {
          list.classList.remove("here");
        });
      }
      menuList.forEach((list) => {
        list.classList.remove("here");
        list.style.borderBottom = "none";
      });
    });

  let timeOut;
  $(".welcome").on("scroll", function () {
    let $nav = $("header");
    $nav.toggleClass(
      "scrolled",
      $(this).scrollTop() > $nav.height()
    );
    clearTimeout(timeOut);
    $(".mode").css("display", "none");
    timeOut = setTimeout(function () {
      $(".mode").css("display", "flex");
    }, 1000);
  });

  let messageArray = [
    "I also maintain, repair and sale computer systems, maintain and install CCTV cameras and other computer related stuffs. Contact me for detailed information.",
  ];
  let count = 0;
  let index = 0;
  let currentText = "";
  let letter = "";

  (function type() {
    if (count === messageArray.length) {
      count = 0;
    }
    currentText = messageArray[count];
    letter = currentText.slice(0, ++index);
    document.querySelector(
      ".more-services p"
    ).innerHTML = letter;
    if (letter.length === currentText.length) {
      count++;
      index = 0;
    }
    setTimeout(type, 400);
  })();

  let messageArrays = Array(
    "I'm delighted to welcome you to my website! Here, you'll find a diverse range of my best work, as well as information about my background and experience.",
    "Through this platform, I hope to demonstrate my creativity and expertise and provide a glimpse into my professional journey.",
    "I'm excited to share my skills, experience, and passion with you.",
    "As a seasoned professional, I'm excited to showcase my accomplishments and demonstrate my expertise.",
    " Here, you'll find a curated selection of my best projects, along with information about my skills, interests, and goals.",
    "As a creative professional, I'm excited to share my work and inspire you with my unique vision.",
    "Programs must be written for people to read, and only incidentally for machines to execute. This quote emphasizes the importance of writing code that is clear and understandable for human readers, not just efficient for machines.","Code is like humor. When you have to explain it, it’s bad","The best error message is the one that never shows up.","Any one can write code that a computer can understand. Good programmers write code that humans can understand.","The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency. The second is that automation applied to an inefficient operation will magnify the inefficiency.","Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.","If debugging is the process of removing software bugs, then programming must be the process of putting them in.","The function of good software is to make the complex appear to be simple.","Programming isn't about what you know; it's about what you can figure out."
  );

  let letters = "";

  (function typing() {
    let p = document.querySelector(
      ".intro #home .intro-text .name p"
    );
    letters = messageArrays[Math.floor(Math.random() * messageArrays.length)];
    p.style = "transition:all 1s;opacity:0";
    p.style.opacity = "1";
    p.innerHTML = letters;
   let voice = new SpeechSynthesisUtterance(letters);
   p.onclick = () =>{
    speechSynthesis.speak(voice);
   } 
    setTimeout(typing, 10000);
  })();

  $("body").on(
    "click",
    ".intro #blog .blog .blog-div .blog-posts .blog-text .read-post h4",
    function () {
      let id = $(this).data("id");
      let blog = $(
        "body .intro #blog .blog .blog-div .blog-posts[data-id=" +
          id +
          "]"
      );
      location.href = `?blog_id=${id}`;
      setTimeout(() => {
        blog.addClass("blog-toggle");
      }, 1000);
    }
  );

  $("body").on(
    "click",
    ".intro #blog .blog .blog-div .blog-posts.blog-toggle .fa-times",
    async function () {
      let index = $(this).index();
      let id = $(this).data("id");
      let blog = $(
        "body .intro #blog .blog .blog-div .blog-posts.blog-toggle[data-id=" +
          id +
          "]"
      );
      blog.removeClass("blog-toggle");
        let searchRl = new URL(window.location.href);
        if(searchRl.searchParams.has("blog_id")){
          searchRl.searchParams.delete("blog_id");
          history.pushState(null,'',searchRl.href);
        }
        await new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );
      let rl = document.getElementById("blog");
      rl.scrollIntoView({behavior: 'smooth'});
    }
  );


  $(".intro #home .intro-text").css(
    "opacity",
    "1"
  );

  let options = {
    rootMargin: "0px",
    threshold: 0.5,
  };
  let observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).animate(
            { opacity: 1 },
            1000
          );
          observer.unobserve(entry.target);
        }
      });
    },
    options
  );
  $(".intro .intro-img").each(function () {
    observer.observe(this);
  });
  $(".intro #about .our-story p").each(
    function () {
      observer.observe(this);
    }
  );
  $(".intro #about .our-story ul li").each(
    function () {
      observer.observe(this);
    }
  );
  $(".intro #about .our-story h2").each(
    function () {
      observer.observe(this);
    }
  );
  $(".intro #about pre").each(function () {
    observer.observe(this);
  });
  $(
    ".intro #service .service .service-list li"
  ).each(function () {
    observer.observe(this);
  });
  $(
    ".intro #service .service .more-services"
  ).each(function () {
    observer.observe(this);
  });
  $(
    ".intro #work .project .all-projects .project-box"
  ).each(function () {
    observer.observe(this);
  });
  $(
    ".intro #contact .contact .contact-icon div"
  ).each(function () {
    observer.observe(this);
  });
  $(
    ".intro #contact .contact .contact-head"
  ).each(function () {
    observer.observe(this);
  });
  $(".intro #contact .contact form").each(
    function () {
      observer.observe(this);
    }
  );
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );
  $("meta[property='og:url']").attr(
    "content",
    location.href
  );
  const queryString = window.location.search;
  const urlString = new URLSearchParams(queryString);
  const blogId = urlString.get("blog_id");
  
  jQuery("body .intro #blog .blog .blog-div .blog-posts[data-id=" + blogId + "]").addClass("blog-toggle");
  
  const userName = localStorage.getItem("username");
  const userEmail = localStorage.getItem("email");
  
  jQuery(".intro #blog .blog .blog-div .blog-posts.blog-toggle .blog-action form input[type=text][user-id=" + blogId + "]").val(userName);
  jQuery(".intro #blog .blog .blog-div .blog-toggle .blog-action form input[type=email][email-id=" + blogId + "]").val(userEmail);
  
  /* --- sharing --- */

  // Get the page metadata
let pageTitle = $('meta[property="og:title"]').attr("content");
let pageDescription = $('meta[property="og:description"]').attr("content");
let pageUrl = $('meta[property="og:url"]').attr("content");
let pageImage = $('meta[property="og:image"]').attr("content");

// Customize the sharing messages
let fbMessage =  pageTitle;
let twMessage = pageUrl;
let waMessage =  pageUrl;
let instaMessage = pageTitle;

// Share on Facebook
$("body").on("click", ".facebook-share", function (e) {
  e.preventDefault();
  let shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(pageUrl);
  window.open(shareUrl, "_blank");
});

// Share on Twitter
$("body").on("click", ".twitter-share", function (e) {
  e.preventDefault();
  let shareUrl = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(pageUrl) + "&text=" + encodeURIComponent(twMessage);
  window.open(shareUrl, "_blank");
});

// Share on WhatsApp
$("body").on("click", ".wa-share", function (e) {
  e.preventDefault();
  let shareUrl = "whatsapp://send?text=" + encodeURIComponent(waMessage);
  window.location.href = shareUrl;
});

// Share on Instagram
$("body").on("click", ".instagram-share", function (e) {
  e.preventDefault();
  let instaUrl = "https://www.instagram.com/create/story"; // Instagram's story creation URL
  window.open(instaUrl + "?url=" + encodeURIComponent(pageUrl) + "&text=" + encodeURIComponent(instaMessage));
});


  // Subscriber js
  $(".subscribe button").on(
    "click",
    async function () {
      const email = $(".subscribe input").val();
      if (
        await message.alert_Confirm(
          "Do You Wish To Subscribe?"
        )
      ) {
        $.ajax({
          url: "assets/php/subscribe.php",
          type: "POST",
          data: { email: email },
          success: function (data) {
            if (data == "subscribed") {
              message.alert_message(
                "You successfully subscribed.",
                "success"
              );
              $(".subscribe input").val("");
            } else {
              message.alert_message(
                data,
                "warning"
              );
            }
            message.shouldAutoHide(true)
          },
        });
      }
    }
  );

  $(".footer .col-2 .form .s").on("click", async function (e) {
      e.preventDefault();
      let id = $(this).data('id');
      const email = $(".footer .col-2 .form input[data-id="+id+"]").val();
      if (
        await message.alert_Confirm(
          "Do You Wish To Subscribe?"
        )
      ) {
        $.ajax({
          url: "assets/php/subscribe.php",
          type: "POST",
          data: { email: email },
          success: function (data) {
            if (data == "subscribed") {
              message.alert_message(
                "You successfully subscribed.",
                "success"
              );
              $(".footer .col-2 .form input[data-id="+id+"]").val("")
            } else {
              message.alert_message(
                data,
                "warning"
              );
            }
            message.shouldAutoHide(true)
          },
        });
      }
    }
  );
  // toggle blog image
  $("body").on(
    "click",
    ".intro #blog .blog .blog-div .blog-posts.blog-toggle .blog-details img",
    function () {
      this.classList.toggle("full-image");
    }
  );

  let date = new Date();
  let year = date.getFullYear();
  $(".footer .col-1 h3 em").text(year);

  // comments

  $("body").on(
    "submit",
    ".intro #blog .blog .blog-div .blog-posts.blog-toggle .blog-action form",
    function (e) {
      e.preventDefault();
      let formId = $(this).data("id");
      let userN = $(
        ".intro #blog .blog .blog-div .blog-toggle .blog-action form input[type=text][user-id=" +
          formId +
          "]"
      );
      const nameOf = userN.val().charAt(0).toUpperCase();
      const initial = nameOf;
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;

      const context = canvas.getContext("2d");
      context.fillStyle = "#000000";
      context.fillRect(0,0,canvas.width, canvas.height);
      context.font = "48px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
context.fillStyle = JSON.parse(localStorage.getItem("color")) ||
"#31d275";
context.fillText(initial,canvas.width / 2,canvas.height / 2);
const img = canvas.toDataURL();

      if (
        $(
          ".intro #blog .blog .blog-div .blog-toggle .blog-action form input[type=checkbox][data-id=" +
            formId +
            "]"
        ).is(":checked")
      ) {
        let user = $(
          ".intro #blog .blog .blog-div .blog-toggle .blog-action form input[type=text][user-id=" +
            formId +
            "]"
        );
        let email = $(
          ".intro #blog .blog .blog-div .blog-toggle .blog-action form input[type=email][email-id=" +
            formId +
            "]"
        );
        localStorage.setItem(
          "username",
          user.val()
        );
        localStorage.setItem(
          "email",
          email.val()
        );
        let formdata = new FormData(this);
        formdata.append("blog_id", formId);
        formdata.append("image", img);
        $.ajax({
          url: "assets/php/comment.php",
          type: "POST",
          data: formdata,
          processData: false,
          contentType: false,
          success: function (data) {
            if (data == "submitted") {
              message.alert_message(
                "Your comment was submitted and is under review",
                "success"
              );
              $(
                ".intro #blog .blog .blog-div .blog-toggle .blog-action form"
              )[0].reset();
            } else {
              message.alert_message(
                data,
                "warning"
              );
            }
            message.shouldAutoHide(true)
          },
        });
      } else {
        let formdata = new FormData(this);
        formdata.append("blog_id", formId);
        formdata.append("image", img);
        $.ajax({
          url: "assets/php/comment.php",
          type: "POST",
          data: formdata,
          processData: false,
          contentType: false,
          success: function (data) {
            if (data == "submitted") {
              message.alert_message(
                "Your comment was submitted and is under review",
                "success"
              );
              $(
                ".intro #blog .blog .blog-div .blog-toggle .blog-action form"
              )[0].reset();
            } else {
              message.alert_message(
                data,
                "warning"
              );
            }
            message.shouldAutoHide(true)
          },
        });
      }
    }
  );

  /* message */

  $(".intro #contact .contact form").on(
    "submit",
    function (e) {
      e.preventDefault();
      let formdata = new FormData(this);
      $.ajax({
        url: "assets/php/mailing.php",
        type: "POST",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (data) {
          if (data == "submitted") {
            message.alert_message(
              "You message was sent, relax as we get back to you.",
              "success"
            );
            $(
              ".intro #contact .contact form"
            )[0].reset();
          } else {
            message.alert_message(
              data,
              "warning"
            );
          }
          message.shouldAutoHide(true)
        },
      });
    }
  );
  // page scroll width
  const progressBar =
    document.querySelector("#down");
  function updateProgressBar() {
    const scrollTop =
      document.querySelector(
        ".welcome"
      ).scrollTop;
    const scrollHeight =
      document.querySelector(
        ".welcome"
      ).scrollHeight;
    const clientHeight =
      document.querySelector(
        ".welcome"
      ).clientHeight;

    const scrollPercent =
      (scrollTop /
        (scrollHeight - clientHeight)) *
      100;
    progressBar.style.width = `${scrollPercent}%`;
    return scrollPercent;
  }

  document
    .querySelector(".welcome")
    .addEventListener("scroll", function () {
      updateProgressBar();
    });

  document.querySelector(
    "#down"
  ).style.background =
    JSON.parse(localStorage.getItem("color")) ||
    "#31d275";

  const sections =
    document.querySelectorAll("section");
  const option1 = {
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0,
  };

  const observer1 = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id =
            entry.target.getAttribute("id");
          if (id == "contact") {
            menuList.forEach((list) => {
              list.classList.remove("here");
              list.style.borderBottom = "none";
            });
          } else {
            menuList.forEach((list) => {
              list.classList.remove("here");
              list.style.borderBottom = "none";
            });
            document
              .querySelector(`.nav #${id}s`)
              .classList.add("here");
            document.querySelector(
              `.nav #${id}s`
            ).style.borderBottom = `2px solid ${
              JSON.parse(
                localStorage.getItem("color")
              ) || "#31d275"
            }`;
          }
        }
      });
    },
    option1
  );

  sections.forEach((section) => {
    observer1.observe(section);
  });
});
// const disableKeys = Array("c","C","x","j","u","i");

// const showAlert = (e) =>{
//   e.preventDefault();
//   return alert("This feature is restricted");
// }

// document.addEventListener("contextmenu", showAlert);
// document.addEventListener("keydown", (e) =>{
//   if(e.ctrlKey && disableKeys.includes(e.key) || e.key === "F12"){
//     showAlert(e);
//   }
// });
