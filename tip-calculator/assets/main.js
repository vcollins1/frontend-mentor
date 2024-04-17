const tips = ["5", "10", "15", "25", "50", "Custom"];
const tipGrid = document.querySelector(".tip-grid");

const billInput = document.querySelector(".bill");
const peopleCountInput = document.querySelector(".people");
const tipAmountLabel = document.querySelector(".amount"); // tip amount per person
const totalLabel = document.querySelector(".total"); // total bill per person

tips.forEach(tip => {
  const div = document.createElement("div");
  div.classList.add("tip");

  if (tip === "Custom") {
    div.classList.add("tip--custom");
    div.innerHTML = `<input class="custom" type="number" placeholder="${tip}">`;
  } else {
    div.classList.add(`tip--${tip}`);
    div.innerText = `${tip}%`;
  }


  tipGrid.appendChild(div);
});

document.addEventListener("click", e => {
  if (e.target.classList.contains("tip")) {
    document.querySelector(".custom").value = "";
  
    if (!(billInput.value == "" || peopleCountInput.value == ""))
      updateResults(e.target);
  }
});

document.addEventListener("keyup", e => {
  if (e.target.classList.contains("custom")) {
    if (!(billInput.value == "" || peopleCountInput.value == ""))
      updateResults(e.target);
  }
});

function setActiveState(current) {
  const previous = document.querySelector(".active");
  
  if (previous !== null)
    previous.classList.remove("active");

  current.classList.add("active");
}

function getTipFromStr(tipStr) {
  tipPercentageStr = tipStr.replace("tip--", "");
  tipPercentage = parseFloat(tipPercentageStr);
  return tipPercentage;
}

function updateResults(e) {
  setActiveState(e);

  let tipStr = "";
  let tipPercentage = undefined;
  if (e.classList.contains("custom")) {
    tipStr = e.value;
    tipPercentage = parseFloat(tipStr);
  } else {
    tipStr = e.classList[1];
    tipPercentage = getTipFromStr(tipStr);
  }

  const bill = parseFloat(billInput.value);
  const peopleCount = parseInt(peopleCountInput.value);

  const tip = bill * (tipPercentage / 100);
  const tipPer = tip / peopleCount;
  const totalPer = (bill / peopleCount) + tipPer;

  tipAmountLabel.innerText = tipPer.toFixed(2);
  totalLabel.innerText = totalPer.toFixed(2);
}
