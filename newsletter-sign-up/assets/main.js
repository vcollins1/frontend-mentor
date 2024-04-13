const subscribe = document.querySelector(".subscribe");
const email = document.querySelector(".subscribe__input");
const errorText = document.querySelector(".subscribe__error--text");
const card = document.querySelector(".card");
const success = document.querySelector(".success");

const validEmail = /^(\w){3,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;

subscribe.addEventListener("submit", e => {
  e.preventDefault();
  if (validEmail.test(email.value)) {
    card.style.display = "none";
    success.style.display = "block";
  } else {
    errorText.style.visibility = "visible";
    email.classList.add("subscribe__error");
  }
});
