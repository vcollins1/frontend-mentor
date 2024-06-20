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
    setStrength();
  }
});

document.addEventListener("click", e => {
  if (e.target.classList.contains("option__input")) {
    if (e.target.checked) {
      optionCount++;
      setStrength();
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
      setStrength();
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

  if (e.target.classList.contains("generate-btn")) {
    if (pwLength >= 4 && optionCount > 0) {
      document.querySelector(".display__text").value = generatePassword();
      document.querySelector(".display__text").style.color = "var(--almost-white)";
    }
  }
});

function setStrength() {
  const bars = document.querySelectorAll(".indicator__bar");
  const strength = document.querySelector(".indicator__text");
  bars.forEach(bar => {
    bar.style.borderColor = "var(--almost-white)";
    bar.style.background = "var(--very-dark-gray)";
  });
  strength.textContent = "";

  if (pwLength >= 4) {
    for (let i = 0; i < optionCount; i++) {
      let color = "";
      if (optionCount === 1) {
        color = "var(--red)";
        strength.textContent = "too weak!"
      }

      if (optionCount === 2) {
          color = "var(--orange)";
          strength.textContent = "weak"
      }
          
      if (optionCount === 3) {
          color = "var(--yellow)";
          strength.textContent = "medium"
      }
          
      if (optionCount === 4) {
          color = "var(--neon)";
          strength.textContent = "strong"
      }
        
      bars[i].style.borderColor = color;
      bars[i].style.background = color;
    }
  }
}

function generatePassword() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*";

  let password = "";
  let passwordChars = "";
  passwordChars += passwordOptions["upper"] ? letters.toUpperCase() : "";
  passwordChars += passwordOptions["lower"] ? letters : "";
  passwordChars += passwordOptions["numbers"] ? numbers : "";
  passwordChars += passwordOptions["symbols"] ? symbols : "";
  passwordChars = shuffleString(passwordChars);

  for (let i = 0; i < pwLength; i++) {
      password += passwordChars[Math.floor(Math.random() * passwordChars.length)];
  }

  return password;
}

function shuffleString(s) {
  let sArray = s.split("");
  for (let i = 0; i < sArray.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = sArray[i];
    sArray[i] = sArray[j];
    sArray[j] = tmp;
  }

  return sArray.join("");
}