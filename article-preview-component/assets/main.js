const shareBtn = document.querySelectorAll(".share");
const authorCard = document.querySelector(".card__author");
const shareCard = document.querySelector(".card__share");

shareBtn.forEach(s => {
  s.addEventListener("click", e => {
    if (e.target.classList.contains("share--02")) {
      authorCard.style.display = "flex";
      shareCard.style.display = "none";
    } else {
      authorCard.style.display = "none";
      shareCard.style.display = "flex";
    }
  });
});

