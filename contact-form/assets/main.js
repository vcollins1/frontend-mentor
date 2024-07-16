document.addEventListener("submit", e => {
  e.preventDefault();
  const firstName = e.target.querySelector("input[name='firstname']");
  if (firstName.value === "") {
    firstName.nextElementSibling.classList.add("active");
  } else {
    firstName.nextElementSibling.classList.remove("active");
  }

  const lastName = e.target.querySelector("input[name='lastname']");
  if (lastName.value === "") {
    lastName.nextElementSibling.classList.add("active");
  } else {
    lastName.nextElementSibling.classList.remove("active");
  }

  const email = e.target.querySelector("input[name='email']");
  if (email.value === "") {
    email.nextElementSibling.classList.add("active");
  } else if (!email.value.contains("@")) {
    email.nextElementSibling.classList.add("active");
  }

  const queryType = e.target.querySelectorAll("input[name='query']");
  let queryChoice = undefined;
  queryType.forEach(e => {
    if (e.checked)
      queryChoice = e.value;
  });
  if (queryChoice === undefined) {
    document.querySelector(".form__query > .error").classList.add("active");
  } else {
    document.querySelector(".form__query > .error").classList.remove("active");
  }

  const message = e.target.querySelector("textarea[name='message']");
  if (message.value === "") {
    message.nextElementSibling.classList.add("active");
  } else {
    message.nextElementSibling.classList.remove("active");
  }

  const consent = e.target.querySelector("input[name='consent']");
  if (!consent.checked) {
    document.querySelector(".form__consent > .error").classList.add("active");
  } else {
    document.querySelector(".form__consent > .error").classList.remove("active");
  }
})