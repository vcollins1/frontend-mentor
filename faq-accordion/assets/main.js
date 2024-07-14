document.addEventListener("click", e => {
  if (e.target.classList.contains("accordion--group")) {
    const panelNum = e.target.classList[1].slice(-1);
    const panel = document.querySelector(`.p${panelNum}`);
    const panelImg = document.querySelector(`.accordion__img.accordion--${panelNum}`);
    panel.classList.toggle("show");
    const btn = document.querySelector(`#btn${panelNum}`);
    
    if (panel.classList.contains("show")) {
      panelImg.src = "./assets/images/icon-plus.svg";
      panelImg.alt = "plus icon";
      btn.setAttribute("aria-expanded", false);
    } else {
      panelImg.src = "./assets/images/icon-minus.svg";
      panelImg.alt = "minus icon";
      btn.setAttribute("aria-expanded", true);
    }
  }
})