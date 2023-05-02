let mybutton = document.querySelector(
  "#mode"
);
let setTheme = document.querySelector(".dashboard");
function modeChange() {
  setTheme.classList.toggle("light-mode");
  let theme;
  if (setTheme.classList.contains("light-mode")) {
    theme = "Light";
    $("#dark").text("Dark")
    mybutton.classList.remove("fa-sun");
    mybutton.classList.add("fa-moon");
  } else {
    theme = "Dark";
    $("#dark").text("Light")
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
if (GetTheme == "Light") {
  document
    .querySelector(".dashboard")
    .classList.add("light-mode");
    $("#dark").text("Dark")
    mybutton.classList.remove("fa-sun");
    mybutton.classList.add("fa-moon");
}

mybutton.onclick = modeChange;