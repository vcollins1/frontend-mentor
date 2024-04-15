const tips = ["5%", "10%", "15%", "25%", "50%", "Custom"];
const tipGrid = document.querySelector(".tip-grid");

tips.forEach(tip => {
  const div = document.createElement("div");

  if (tip === "Custom") {
    div.classList.add("custom-value");
    div.classList.add("tip-grid__value");
    // div.innerHTML = `<input type="number" class="custom-value__input" placeholder=${tip}>`;
  } else {
    div.classList.add("tip-grid__value");
  }

  div.innerText = `${tip}`;
  tipGrid.appendChild(div);
});
