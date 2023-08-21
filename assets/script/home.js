$(document).ready(function () {
  const message = new AlertNotify(10000, "top-right", "#000000");
  let timeOut = "";
  $(".welcome").on("scroll", function () {
    let $nav = $("header");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    clearTimeout(timeOut);
    $(".mode").css("display", "none");
    timeOut = setTimeout(function () {
      $(".mode").css("display", "flex");
    }, 1000);
  });

  $("body").on(
    "click",
    ".intro #blog .blog .blog-div .blog-posts .blog-text .read-post h4",
    function () {
      let id = $(this).data("id");
      let dataTitle = $(this).attr("data-title");
      let blog = $(
        "body .intro #blog .blog .blog-div .blog-posts[data-id=" + id + "]"
      );
      location.href = `/article/${id}/${dataTitle.replace(/ /g, "-").toLowerCase()}`;
    }
  );

  let date = new Date();
  let year = date.getFullYear();
  $(".footer .col-1 h3 p").text(year);

  $(".intro #home .intro-text").css("opacity", "1");

  let options = {
    rootMargin: "0px",
    threshold: 0.5,
  };
  let observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        $(entry.target).animate({ opacity: 1 }, 1000);
        observer.unobserve(entry.target);
      }
    });
  }, options);
  $(".intro .intro-img").each(function () {
    observer.observe(this);
  });
  $(".intro #about .our-story p").each(function () {
    observer.observe(this);
  });
  $(".intro #about .our-story ul li").each(function () {
    observer.observe(this);
  });
  $(".intro #about .our-story h2").each(function () {
    observer.observe(this);
  });
  $(".intro #about pre").each(function () {
    observer.observe(this);
  });
  $(".intro #service .service .service-list li").each(function () {
    observer.observe(this);
  });
  $(".intro #service .service .more-services").each(function () {
    observer.observe(this);
  });
  $(".intro #work .project .all-projects .project-box").each(function () {
    observer.observe(this);
  });
  $(".intro #contact .contact .contact-icon div").each(function () {
    observer.observe(this);
  });
  $(".intro #contact .contact .contact-head").each(function () {
    observer.observe(this);
  });
  $(".intro #contact .contact form").each(function () {
    observer.observe(this);
  });


  // Subscriber js
  $(".subscribe button").on("click", async () => {
    const email = $(".subscribe input").val();
    if (await message.alert_Confirm("Do You Wish To Subscribe?")) {
      $.ajax({
        url: "/assets/php/subscribe.php",
        type: "POST",
        data: { email: email },
        success: function (data) {
          if (data == "subscribed") {
            message.alert_message("You successfully subscribed.", "success");
            $(".subscribe input").val("");
          } else {
            message.alert_message(data, "warning");
          }
          message.shouldAutoHide(true);
        },
      });
    }
  });
  
  $("body").on("click", ".footer .col-2 .form button", async function (e) {
    e.preventDefault();
    let id = $(this).data("id");
    const email = $(".footer .col-2 .form input[data-id=" + id + "]").val();
    if (await message.alert_Confirm("Do You Wish To Subscribe?")) {
      $.ajax({
        url: "assets/php/subscribe.php",
        type: "POST",
        data: { email: email },
        success: function (data) {
          if (data === "subscribed") {
            message.alert_message("You successfully subscribed.", "success");
            $(".footer .col-2 .form input[data-id=" + id + "]").val("");
            message.shouldAutoHide(true);
            return;
          }
          if (data === "You have already subscribed") {
            message.alert_message(data, "info");
            $(".footer .col-2 .form input[data-id=" + id + "]").val("");
            message.shouldAutoHide(true);
            return;
          }
          message.alert_message(data, "warning");
          message.shouldAutoHide(true);
        },
      });
    }
  });


 
  /* message */

  $(".intro #contact .contact form").on("submit", function (e) {
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
          $(".intro #contact .contact form")[0].reset();
        } else {
          message.alert_message(data, "warning");
        }
        message.shouldAutoHide(true);
      },
    });
  });
});

