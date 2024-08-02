document.addEventListener("click", e => {
  if (e.target.classList.contains("menu-icon")) {
    const mainNav = document.querySelector(".main-nav");

    if (mainNav.classList.contains("open")) {
      mainNav.classList.remove("open");
      e.target.classList.remove("active");
      e.target.src = "./assets/images/icon-menu.svg";
    } else {
      mainNav.classList.add("open");
      e.target.classList.add("active");
      e.target.src = "./assets/images/icon-close.svg";
    }
  }


  if (e.target.classList.contains("cart-icon")) {
    const cart = document.querySelector(".shopping-cart");
    cart.classList.toggle("open")
  }
});