let menuKey = document.querySelector(
  ".dash-head .fa"
);
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let anchors = document.querySelectorAll(
  ".left .dash-nav li a"
);
let h1 = document.querySelector(
  ".dashboard .left .dash-user h2"
);

menuKey.onclick = function () {
  if (this.classList.contains("fa-bars")) {
    left.style.width = "fit-content";
    anchors.forEach(function (anchor) {
      anchor.style.display = "block";
    });
    this.classList.remove("fa-bars");
    this.classList.add("fa-times");
  } else {
    left.style.width = "fit-content";
    anchors.forEach(function (anchor) {
      anchor.style.display = "none";
    });
    this.classList.remove("fa-times");
    this.classList.add("fa-bars");
  }
};

anchors.forEach((a) => {
  a.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

$(document).ready(function () {
  countMail();
  countComment();
  setInterval(countMail, 30000);
  setInterval(countComment, 30000);
});
function countMail() {
  $.ajax({
    url: "./server/count_mail.php",
    type: "GET",
    success: (data) => {
      if (data == 0) {
        $(".li-mail span").css("display", "none");
      } else {
        $(".li-mail span").css(
          "display",
          "block"
        );
        $(".li-mail span").text(data);
      }
    },
  });
}
function countComment() {
  $.ajax({
    url: "./server/count_comment.php",
    type: "GET",
    success: (data) => {
      if (data == 0) {
        $(".li-comment span").css(
          "display",
          "none"
        );
      } else {
        $(".li-comment span").css(
          "display",
          "block"
        );
        $(".li-comment span").text(data);
      }
    },
  });
}
