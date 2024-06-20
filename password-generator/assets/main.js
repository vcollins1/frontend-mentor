let pwLength = 0;
const passwordOptions = {
  "upper": false,
  "lower": false,
  "numbers": false,
  "symbols": false,
};
let optionCount = 0;

document.addEventListener("input", e => {
  if (e.target.classList.contains("slider--input")) {
    let percentage =  (e.target.value / e.target.max) * 100;
    e.target.style.background = `
        linear-gradient(to right, var(--neon) ${percentage}%, var(--very-dark-gray) 0%)
    `;

    pwLength = e.target.value;
    document.querySelector(".slider--value").innerText = pwLength;
  }
});

document.addEventListener("click", e => {
  if (e.target.classList.contains("option__input")) {
    if (e.target.checked) {
      optionCount++;
      if (e.target.classList.contains("option-1"))
        passwordOptions["upper"] = true;
      else if (e.target.classList.contains("option-2"))
        passwordOptions["lower"] = true;
      else if (e.target.classList.contains("option-3"))
        passwordOptions["numbers"] = true;
      else
        passwordOptions["symbols"] = true;
    } 
    
    else {
      optionCount--;
      if (e.target.classList.contains("option-1"))
        passwordOptions["upper"] = false;
      else if (e.target.classList.contains("option-2"))
        passwordOptions["lower"] = false;
      else if (e.target.classList.contains("option-3"))
        passwordOptions["numbers"] = false;
      else
        passwordOptions["symbols"] = false;
    }
  }
});