let bar = document.querySelector(".bars"),
  menu = document.querySelector(".nav"),
  contact = document.querySelector(".contact-me"),
  icon = document.querySelector(".bars #bars"),
  menuList = document.querySelectorAll(".welcome header .nav li");
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
  JSON.parse(localStorage.getItem("color")) || "#31d275"
}`;
document.querySelector(".blog-type #all").classList.add("current");

menuList.forEach((list) => {
  list.onclick = function () {
    menuList.forEach((list) => {
      list.classList.remove("here");
      list.style.borderBottom = "none";
    });
    this.classList.add("here");
    if (this.classList.contains("here")) {
      this.style.borderBottom = `2px solid ${
        JSON.parse(localStorage.getItem("color")) || "#31d275"
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
  .querySelector(".welcome header .contact-me")
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
  document.querySelector(".more-services p").innerHTML = letter;
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
  "Programs must be written for people to read, and only incidentally for machines to execute. This quote emphasizes the importance of writing code that is clear and understandable for human readers, not just efficient for machines.",
  "Code is like humor. When you have to explain it, it’s bad",
  "The best error message is the one that never shows up.",
  "Any one can write code that a computer can understand. Good programmers write code that humans can understand.",
  "The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency. The second is that automation applied to an inefficient operation will magnify the inefficiency.",
  "Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.",
  "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
  "The function of good software is to make the complex appear to be simple.",
  "Programming isn't about what you know; it's about what you can figure out."
);

let letters = "";

(function typing() {
  let p = document.querySelector(".intro #home .intro-text .name p");
  letters = messageArrays[Math.floor(Math.random() * messageArrays.length)];
  p.style = "transition:all 1s;opacity:0";
  p.style.opacity = "1";
  p.innerHTML = letters;
  let voice = new SpeechSynthesisUtterance(letters);
  p.onclick = () => {
    speechSynthesis.speak(voice);
  };
  setTimeout(typing, 10000);
})();

// page scroll width
const progressBar = document.querySelector("#down");
function updateProgressBar() {
  const scrollTop = document.querySelector(".welcome").scrollTop;
  const scrollHeight = document.querySelector(".welcome").scrollHeight;
  const clientHeight = document.querySelector(".welcome").clientHeight;

  const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
  progressBar.style.width = `${scrollPercent}%`;
  return scrollPercent;
}

document.querySelector(".welcome").addEventListener("scroll", function () {
  updateProgressBar();
});

document.querySelector("#down").style.background =
  JSON.parse(localStorage.getItem("color")) || "#31d275";

const sections = document.querySelectorAll("section");
const option1 = {
  rootMargin: "-50% 0px -50% 0px",
  threshold: 0,
};

const observer1 = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
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
        document.querySelector(`.nav #${id}s`).classList.add("here");
        document.querySelector(
          `.nav #${id}s`
        ).style.borderBottom = `2px solid ${
          JSON.parse(localStorage.getItem("color")) || "#31d275"
        }`;
      }
    }
  });
}, option1);

sections.forEach((section) => {
  observer1.observe(section);
});



const disableKeys = Array("c","C","x","j","u","i");
const showAlert = (e) =>{
  e.preventDefault();
  return 0;
}

//document.addEventListener("contextmenu", showAlert);
document.addEventListener("keydown", (e) =>{
  if(e.ctrlKey && disableKeys.includes(e.key) || e.key === "F12"){
    showAlert(e);
  }
});
