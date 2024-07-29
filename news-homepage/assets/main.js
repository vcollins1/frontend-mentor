const menuBtn = document.querySelector(".hamburger");
const nav = document.querySelector(".main-nav");

menuBtn.addEventListener("click", () => {
  console.log("menu button clicked.");

  if (nav.classList.contains("open")) {
    menuBtn.src = "./assets/images/icon-menu.svg";
    nav.classList.remove("open");
  } else {
    menuBtn.src = "./assets/images/icon-menu-close.svg";
    nav.classList.add("open");
  }
});