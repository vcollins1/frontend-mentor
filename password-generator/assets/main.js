document.addEventListener("input", e => {
  if (e.target.classList.contains("slider--input")) {
    let percentage =  (e.target.value / e.target.max) * 100;
    e.target.style.background = `
        linear-gradient(to right, var(--neon) ${percentage}%, var(--very-dark-gray) 0%)
    `;
  }

  document.querySelector(".slider--value").innerText = e.target.value;
});