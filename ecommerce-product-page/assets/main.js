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

  const cartQuantity = document.styleSheets[0].cssRules[9];
  if (e.target.classList.contains("add-cart")) {
    
    if (quantityNum === 0) {
      cartQuantity.style.display = "none";
      document.querySelector(".shopping-cart__content").innerHTML = "Your cart is empty.";
    } else {
      cartQuantity.style.content = `"${quantityNum}"`;
      cartQuantity.style.display = "flex";
      const template = `
        <div class="product-info">
          <img src="./assets/images/image-product-1-thumbnail.jpg" alt="shoe" class="checkout-img">
          <p class="checkout-text">
            Fall Limited Edition Seakers<br> $125.00 x 
            <span class="checkout-quantity">3</span>
            <span class="checkout-total">375.00</span>
          </p>
          <img src="./assets/images/icon-delete.svg" alt="trash can" class="delete">
        </div>
        <button class="checkout-btn">Checkout</button>
      `;
      document.querySelector(".shopping-cart__content").innerHTML = template;
      document.querySelector(".checkout-quantity").textContent = quantityNum;
      document.querySelector(".checkout-total").textContent = `$${(quantityNum * 125).toFixed(2)}`;
    }
  }

  if (e.target.classList.contains("delete")) {
    document.querySelector(".shopping-cart__content").innerHTML = "Your cart is empty.";
    cartQuantity.style.display = "none";
    quantityNum = 0;
    quantity.textContent = quantityNum;
  }
});