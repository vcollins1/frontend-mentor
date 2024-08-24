const sliderImages = [
  "./assets/images/image-product-1.jpg",
  "./assets/images/image-product-2.jpg",
  "./assets/images/image-product-3.jpg",
  "./assets/images/image-product-4.jpg"
];

let currentImage = 0;
let quantityNum = 0;
let shadowOpen = false;


document.addEventListener("click", e => {
  if (e.target.classList.contains("image-slider__image")) {
    openImageModal();
  }

  if (e.target.classList.contains("thumbnails__image")) {
    updateThumbnail(e.target.parentElement);
    
  }

  if (e.target.classList.contains("thumbnails__box")) {
    updateThumbnail(e.target);
  }

  if (e.target.classList.contains("shadow-close")) {
    const shadowBody = document.querySelector(".shadow-body");
    document.body.removeChild(shadowBody);
    shadowOpen = false;
    document.querySelector(".image-slider__btn").focus();
  }

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
    cart.classList.toggle("open");

    if (cart.classList.contains("open")) {
      e.target.setAttribute("aria-expanded", true);
    } else {
      e.target.setAttribute("aria-expanded", false);
    }
  }

  if (e.target.classList.contains("next")) {
    currentImage = ++currentImage % sliderImages.length;
    selectionBox(currentImage);
  }

  if (e.target.classList.contains("previous")) {
    currentImage = currentImage == 0 ? 3 : --currentImage;
    selectionBox(currentImage);
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

document.addEventListener("keydown", e => {
  if (e.key === " ") {
    if (e.target.classList.contains("image-slider__btn")) {
      const sliderClone = openImageModal();
      sliderClone.querySelector(".image-slider__btn").setAttribute("tabindex", -1);
      let sThumbnails = sliderClone.querySelectorAll(".thumbnails__box");
      sThumbnails.forEach(item => {
        item.setAttribute("tabindex", -1)
      });

      shadowClose = document.querySelector(".shadow-close");
      shadowClose.focus();
    }
  }

  if (shadowOpen && e.key == "Tab") {
    const shadowFocus = document.querySelectorAll(".shadow-focus");
    if (e.shiftKey) {
      if (document.activeElement === shadowFocus[0]) {
        e.preventDefault();
        shadowFocus[shadowFocus.length - 1].focus();
      }
    } else {
      if (document.activeElement === shadowFocus[shadowFocus.length - 1]) {
        e.preventDefault();
        shadowFocus[0].focus();
      }
    }
  }
})

const openImageModal = () => {
  if (shadowOpen) 
    return;

  shadowOpen = true;
  const sliderClone = document.querySelector(".image-slider").cloneNode(true);

  const shadowBody = document.createElement("div");
  shadowBody.classList.add("shadow-body");
  shadowBody.setAttribute("aria-modal", true);

  const shadow = document.createElement("div");
  shadow.classList.add("shadow");

  shadow.innerHTML = `
  <button class="shadow-close shadow-focus" aria-label="close image modal">
    <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
      <path class="shadow-close" d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd"/>
    </svg>
  </button>`;

  sliderClone.querySelectorAll(".selector-box").forEach(item => {
    item.classList.add("shadow-focus");
  });

  shadow.appendChild(sliderClone);
  shadowBody.appendChild(shadow);
  document.body.append(shadowBody);

  return sliderClone;
}

const updateThumbnail = e => {
  currentImage = e.classList[1].slice(-1) - 1;

  const activeThumbnails = document.querySelectorAll(".active-thumbnail");
  activeThumbnails.forEach(item => {
    item.classList.remove("active-thumbnail");
  });
  
  document.querySelectorAll(`.thumbnails__box--${currentImage + 1}`).forEach(item => {
    item.classList.add("active-thumbnail");
  });

  const sliderImage = document.querySelector(".image-slider__image");
  sliderImage.src = `${sliderImages[currentImage]}`;
}

const selectionBox = currentImage => {
  const sliderImage = document.querySelector(".image-slider__image");
  sliderImage.src = `${sliderImages[currentImage]}`;

  const activeThumbnails = document.querySelectorAll(".active-thumbnail");
  activeThumbnails.forEach(item => {
    item.classList.remove("active-thumbnail");
  });

  document.querySelectorAll(`.thumbnails__box--${currentImage + 1}`).forEach(item => {
    item.classList.add("active-thumbnail");
  });

  if (shadowOpen) {
    const sliderImageShadow = document.querySelector(".shadow .image-slider__image");
    sliderImageShadow.src = `${sliderImages[currentImage]}`;
  }
}