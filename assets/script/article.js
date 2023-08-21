// Use event delegation for better performance
 $("body").on(
    "click",
    ".intro #blog .blog .blog-div .blog-posts.blog-toggle .fa-times",
    function () {
      const id = $(this).data("id");
      const blog = $(
        `body .intro #blog .blog .blog-div .blog-posts.blog-toggle[data-id="${id}"]`
      );
        history.go(-1);
    }
  );

 /* --- sharing --- */

  // Get the page metadata
  let pageTitle = $('meta[property="og:title"]').attr("content");
  let pageDescription = $('meta[property="og:description"]').attr("content");
  let pageUrl = location.href;
  let pageImage = $('meta[property="og:image"]').attr("content");

  // Customize the sharing messages
  let fbMessage = pageTitle;
  let twMessage = pageUrl;
  let waMessage = pageUrl;
  let instaMessage = pageTitle;

  // Share on Facebook
  $("body").on("click", ".facebook-share", function (e) {
    e.preventDefault();
    let shareUrl =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(pageUrl);
    window.open(shareUrl, "_blank");
  });

  // Share on Twitter
  $("body").on("click", ".twitter-share", function (e) {
    e.preventDefault();
    let shareUrl =
      "https://twitter.com/intent/tweet?url=" +
      encodeURIComponent(pageUrl) +
      "&text=" +
      encodeURIComponent(twMessage);
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
    window.open(
      instaUrl +
        "?url=" +
        encodeURIComponent(pageUrl) +
        "&text=" +
        encodeURIComponent(instaMessage)
    );
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

// toggle blog image
$("body").on(
  "click",
  ".intro #blog .blog .blog-div .blog-posts.blog-toggle .blog-details img",
  function () {
    this.classList.toggle("full-image");
  }
);

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
    const nameOf = userN
      .val()
      .charAt(0)
      .toUpperCase();
    const initial = nameOf;
    const canvas =
      document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;

    const context = canvas.getContext("2d");
    context.fillStyle = "#000000";
    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
    context.font = "48px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle =
      JSON.parse(localStorage.getItem("color")) ||
      "#31d275";
    context.fillText(
      initial,
      canvas.width / 2,
      canvas.height / 2
    );
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
      localStorage.setItem("email", email.val());
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
          message.shouldAutoHide(true);
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
          message.shouldAutoHide(true);
        },
      });
    }
  }
);
