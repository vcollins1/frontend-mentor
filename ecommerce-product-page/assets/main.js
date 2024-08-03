const sliderImages = [
  "./assets/images/image-product-1.jpg",
  "./assets/images/image-product-2.jpg",
  "./assets/images/image-product-3.jpg",
  "./assets/images/image-product-4.jpg"
];

let currentImage = 0;
let quantityNum = 0;



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

  const sliderImage = document.querySelector(".image-slider__image");
  if (e.target.classList.contains("next")) {
    currentImage = ++currentImage % sliderImages.length;
    sliderImage.src = `${sliderImages[currentImage]}`;
  }

  if (e.target.classList.contains("previous")) {
    currentImage = currentImage == 0 ? 3 : --currentImage;
    sliderImage.src = `${sliderImages[currentImage]}`;
  }

  const quantity = document.querySelector(".quantity");
  if (e.target.classList.contains("inc-quantity")) {
    ++quantityNum;
    quantity.textContent = quantityNum;
  }

  if (e.target.classList.contains("dec-quantity")) {
    --quantityNum;
    quantityNum = (quantityNum == -1) ? 0 : quantityNum;
    quantity.textContent = quantityNum;
  }
});