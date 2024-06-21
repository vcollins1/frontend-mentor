let pwLength = 0;
const passwordOptions = {
  "upper": false,
  "lower": false,
  "numbers": false,
  "symbols": false,
};
let optionCount = 0;
let canCopy = false;

document.addEventListener("input", e => {
  // set password length
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
  // record checked options
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

  // generate new password
  if (e.target.classList.contains("generate-btn") || e.target.parentElement.classList.contains("generate-btn")) {
    if (pwLength > 0 && optionCount > 0) {
      document.querySelector(".display__text").value = generatePassword();
      document.querySelector(".display__text").style.color = "var(--almost-white)";
      canCopy = true;
    }
  }

  // copy generated password
  if (e.target.classList.contains("display__copy--svg")) {
    if (canCopy) {
      const current = document.querySelector(".display__text");
      current.select();
      navigator.clipboard.writeText(current.value);
      document.querySelector(".display__copy--text").textContent = "copied";
      setTimeout(() => {
        document.querySelector(".display__copy--text").textContent = "";
      }, 1000);
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

  // set meter strength text
  if (optionCount !== 0) {
    if (pwLength >= 1 && pwLength <= 4) {
      strength.textContent = "too weak!";

      if (optionCount > 1)
        strength.textContent = "weak";
    }
  
    else if (pwLength >= 5 && pwLength <= 10) {
      strength.textContent = "weak";

      if (pwLength == 10 && optionCount > 2)
        strength.textContent = "medium";
    }
  
    else if (pwLength >= 11 && pwLength <= 15) {
      strength.textContent = "weak";
            
      if (optionCount >= 2)
        strength.textContent = "medium";

      if (pwLength == 15 && optionCount > 3)
        strength.textContent = "strong";
    }
  
    else if (pwLength >= 16 && pwLength <= 20) {
      strength.textContent = "medium";

      if (optionCount > 2)
        strength.textContent = "strong";
    }
  }
  
  // set meter bar color and count
  let barCount = 0;
  let color = "";
  if (strength.textContent == "too weak!") {
    barCount = 1;
    color = "var(--red)";
  }

  if (strength.textContent == "weak") {
    barCount = 2;
    color = "var(--orange)";
  }

  if (strength.textContent == "medium") {
    barCount = 3;
    color = "var(--yellow)";
  }

  if (strength.textContent == "strong") {
    barCount = 4;
    color = "var(--neon)";
  }

  // loop indicator bars to set color
  for (let i = 0; i < barCount; ++i) {
    bars[i].style.borderColor = color;
    bars[i].style.background = color;
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