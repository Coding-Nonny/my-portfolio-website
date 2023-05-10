let mybutton = document.querySelector(
  ".mode #mode"
);
let setTheme = document.querySelector(".welcome");
function modeChange() {
  setTheme.classList.toggle("light-mode");
  let theme;
  if (setTheme.classList.contains("light-mode")) {
    theme = "light";
    mybutton.classList.remove("fa-sun");
    mybutton.classList.add("fa-moon");
  } else {
    theme = "dark";
    mybutton.classList.remove("fa-moon");
    mybutton.classList.add("fa-sun");
  }
  localStorage.setItem(
    "theme",
    JSON.stringify(theme)
  );
}

let GetTheme = JSON.parse(
  localStorage.getItem("theme")
);
if (GetTheme == "light") {
  document
    .querySelector(".welcome")
    .classList.add("light-mode");
  mybutton.classList.remove("fa-sun");
  mybutton.classList.add("fa-moon");
}

mybutton.onclick = modeChange;

const colorPick = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];
const colorButton = document.querySelector(
  ".mode .fa-palette"
);

function generateColor() {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += colorPick[rand()];
  }
  localStorage.setItem(
    "color",
    JSON.stringify(color)
  );
  const h1Element = document.querySelector(
    ".intro #home .intro-text .intro-special .n h1"
  );
  h1Element.style.color = color;
  document.querySelector(
    ".intro header .logo h2 "
  ).style.color = color;
  document.querySelector(
    ".intro #home .intro-text .intro-special p b "
  ).style.color = color;
  colorButton.style.color = color;
  document.querySelector(
    ".hire "
  ).style.backgroundColor = color;
  document.querySelector(
    ".know "
  ).style.border = `1px solid${color}`;
  document.querySelector(
    ".contact-me"
  ).style.backgroundColor = `${color}`;
  document
    .querySelectorAll(
      ".intro #about .our-story h2 span"
    )
    .forEach((element) => {
      element.style.color = color;
    });
  document.querySelector(
    ".intro #about .about-left strong "
  ).style.color = color;
  document.querySelector(
    ".intro #about .about-left strong "
  ).style.borderBottom = `2px solid${color}`;
  // document.querySelector(
  //   ".intro #about .about-right p"
  // ).style.color = color;
  document
    .querySelectorAll(
      ".intro #service .service h1"
    )
    .forEach((elem) => {
      elem.style.color = color;
    });
  document
    .querySelectorAll(
      ".intro #service .service .service-list li h2"
    )
    .forEach((element) => {
      element.style.color = color;
    });
  document
    .querySelectorAll(
      ".intro #service .service .service-list li"
    )
    .forEach((element) => {
      element.style.border = `1px solid${color}`;
    });
  document.querySelector(
    ".intro #work .project h1"
  ).style.color = color;
  document.querySelector(
    ".intro #service .service a"
  ).style.backgroundColor = color;
  document
    .querySelectorAll(
      ".all-projects .readme-box strong"
    )
    .forEach((element) => {
      element.style.color = color;
    });
  document
    .querySelectorAll(
      ".intro #contact .contact .contact-icon div"
    )
    .forEach((elem) => {
      elem.style.border = `2px solid${color}`;
    });
  document
    .querySelectorAll(
      ".intro #contact .contact .contact-icon div i"
    )
    .forEach((elem) => {
      elem.style.backgroundColor = color;
    });
  document
    .querySelectorAll("#down")
    .forEach((elem) => {
      elem.style.backgroundColor = color;
    });
  document
    .querySelectorAll(".active")
    .forEach((elem) => {
      elem.style.backgroundColor = color;
    });
  document
    .querySelectorAll(
      ".intro #contact .contact form .form-left div i"
    )
    .forEach((elem) => {
      elem.style.backgroundColor = color;
    });
  document.querySelector(
    ".intro #contact .contact .contact-head h1"
  ).style.color = color;
  document
    .querySelectorAll(
      ".intro #contact .contact form .form-left div input"
    )
    .forEach((elem) => {
      elem.style.border = `2px solid${color}`;
    });
  document.querySelector(
    ".intro #contact .contact form .form-right textarea"
  ).style.border = `2px solid${color}`;
  document.querySelector(
    ".intro #contact .contact form button "
  ).style.backgroundColor = color;
  document.querySelector(
    ".subscribe button "
  ).style.backgroundColor = color;
  document.querySelector(
    ".intro #blog .blog .blog-head h1"
  ).style.color = color;
  $(
    ".intro #blog .blog .blog-div .blog-text .read-post h4"
  ).each(function () {
    $(this).css("background", color);
  });
  //.blog-search #search-blog
  $(".blog-search button").each(function () {
    $(this).css("background", color);
  });
  $(".blog-search #search-blog").each(
    function () {
      $(this).css("border", `2px solid${color}`);
    }
  );
  $(".welcome .intro header .nav li.here").each(
    function () {
      $(this).css(
        "border-bottom",
        `2px solid${color}`
      );
    }
  );
  $(
    ".intro #blog .blog .blog-type span.current"
  ).each(function () {
    $(this).css(
      "border-bottom",
      `2px solid${color}`
    );
  });
  $(
    ".intro #blog .blog .blog-div .blog-posts .blog-text .title-text"
  ).each(function () {
    $(this).css(
      "border-bottom",
      `2px solid${color}`
    );
  });
  document.querySelector(
    ".intro #blog .blog .blog-type "
  ).style.borderBottom = `1px solid${color}`;
  document.querySelector(
    ".subscribe input "
  ).style.border = `2px solid${color}`;
  $(".intro #home .intro-text .name h1")
    .css(
      "background",
      `linear-gradient( to right, #31d275, ${color})`
    )
    .css("-webkit-background-clip", "text")
    .css("background-clip", "text")
    .css("-moz-webkit-background-clip", "text")
    .css("color", "transparent");
  document
    .querySelectorAll(
      ".intro #about .our-story ul .learning "
    )
    .forEach((elem) => {
      elem.style.border = `2px solid ${color}`;
    });
  document
    .querySelectorAll(
      ".intro #home .intro-img h2"
    )
    .forEach((elem) => {
      elem.style.color = color;
    });
  // let before = window.getComputedStyle(document.querySelector("#progress"),":after");
  // before.background = color;
} //.intro #home .intro-img .project h2

function rand() {
  return Math.floor(
    Math.random() * colorPick.length
  );
}

colorButton.addEventListener(
  "click",
  generateColor
);

const savedColor = JSON.parse(
  localStorage.getItem("color")
);
if (savedColor) {
  const h1Element = document.querySelector(
    ".intro #home .intro-text .intro-special .n h1"
  );
  h1Element.style.color = savedColor;
  document.querySelector(
    ".intro header .logo h2 "
  ).style.color = savedColor;
  document.querySelector(
    ".intro #home .intro-text .intro-special p b "
  ).style.color = savedColor;
  colorButton.style.color = savedColor;
  document.querySelector(
    ".hire "
  ).style.backgroundColor = savedColor;
  document.querySelector(
    ".know "
  ).style.border = `1px solid${savedColor}`;
  document.querySelector(
    ".contact-me"
  ).style.backgroundColor = `${savedColor}`;
  document
    .querySelectorAll(
      ".intro #about .our-story h2 span"
    )
    .forEach((element) => {
      element.style.color = savedColor;
    });
  document.querySelector(
    ".intro #about .about-left strong "
  ).style.color = savedColor;
  document.querySelector(
    ".intro #about .about-left strong "
  ).style.borderBottom = `2px solid${savedColor}`;
  // document.querySelector(
  //   ".intro #about .about-right p"
  // ).style.color = savedColor;
  document
    .querySelectorAll(
      ".intro #service .service h1"
    )
    .forEach((elem) => {
      elem.style.color = savedColor;
    });
  document
    .querySelectorAll(
      ".intro #service .service .service-list li h2"
    )
    .forEach((element) => {
      element.style.color = savedColor;
    });
  document
    .querySelectorAll(
      ".intro #service .service .service-list li"
    )
    .forEach((element) => {
      element.style.border = `1px solid${savedColor}`;
    });
  document.querySelector(
    ".intro #work .project h1"
  ).style.color = savedColor;
  document.querySelector(
    ".intro #service .service a"
  ).style.backgroundColor = savedColor;
  document
    .querySelectorAll(
      ".all-projects .readme-box strong"
    )
    .forEach((strong) => {
      strong.style.color = savedColor;
    });
  document
    .querySelectorAll(
      ".intro #contact .contact .contact-icon div"
    )
    .forEach((elem) => {
      elem.style.border = `2px solid${savedColor}`;
    });
  document
    .querySelectorAll(
      ".intro #contact .contact .contact-icon div i"
    )
    .forEach((elem) => {
      elem.style.backgroundColor = savedColor;
    });
  document
    .querySelectorAll(
      ".intro #contact .contact form .form-left div i"
    )
    .forEach((elem) => {
      elem.style.backgroundColor = savedColor;
    });
  document.querySelector(
    ".intro #contact .contact .contact-head h1"
  ).style.color = savedColor;
  document
    .querySelectorAll(
      ".intro #contact .contact form .form-left div input"
    )
    .forEach((elem) => {
      elem.style.border = `2px solid ${savedColor}`;
    });
  document.querySelector(
    ".intro #contact .contact form .form-right textarea"
  ).style.border = `2px solid ${savedColor}`;
  document.querySelector(
    ".intro #contact .contact form button "
  ).style.backgroundColor = savedColor;
  document.querySelector(
    ".intro #blog .blog .blog-head h1"
  ).style.color = savedColor;
  $(
    ".intro #blog .blog .blog-div .blog-text .read-post h4"
  ).each(function () {
    $(this).css("background", savedColor);
  });
  $(
    ".intro #blog .blog .blog-div .blog-posts .blog-text h3"
  ).each(function () {
    $(this).css(
      "border-bottom",
      `2px solid${savedColor}`
    );
  });
  document.querySelector(
    ".intro #blog .blog .blog-type "
  ).style.borderBottom = `1px solid${savedColor}`;
  document.querySelector(
    ".subscribe button "
  ).style.backgroundColor = savedColor;
  document.querySelector(
    ".subscribe input "
  ).style.border = `2px solid${savedColor}`;
  $(".intro #home .intro-text .name h1")
    .css(
      "background",
      `linear-gradient(to right, #31d275, ${savedColor})`
    )
    .css("-webkit-background-clip", "text")
    .css("background-clip", "text")
    .css("-moz-webkit-background-clip", "text")
    .css("color", "transparent");
  document
    .querySelectorAll(
      ".intro #about .our-story ul .learning "
    )
    .forEach((elem) => {
      elem.style.border = `2px solid${savedColor}`;
    });
  document
    .querySelectorAll(
      ".intro #home .intro-img h2"
    )
    .forEach((elem) => {
      elem.style.color = savedColor;
    });
  $(".blog-search #search-blog").each(
    function () {
      $(this).css(
        "border",
        `2px solid${savedColor}`
      );
    }
  );
  $(".blog-search button").each(function () {
    $(this).css("background", savedColor);
  });
}
