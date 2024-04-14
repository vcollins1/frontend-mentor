// import data from "../data.json" assert { type: "json" };
const response = await fetch("../data.json");
const data = await response.json();

const reportGrid = document.querySelector(".report");
const cardPics = [
  {name: "work", pic: "./assets/images/icon-work.svg"}, {name: "play", pic: "./assets/images/icon-play.svg"}, 
  {name: "study", pic: "./assets/images/icon-study.svg"}, {name: "exercise", pic: "./assets/images/icon-exercise.svg"},
  {name: "social", pic: "./assets/images/icon-social.svg"}, {name: "self-care", pic: "./assets/images/icon-self-care.svg"}
];

for (let i = 0; i < data.length; ++i) {
  const timeframe = data[i].timeframes.weekly;
  const html = `
    <figure class="card__figure card__figure--${cardPics[i].name}">
      <img class="card__img" src=${cardPics[i].pic} alt="">
    </figure>

    <div class="card__content">
      <div class="card__header">
        <h2 class="card__title">${data[i].title}</h2>
        <img src="./assets/images/icon-ellipsis.svg" alt="">
      </div>

      <div class="card__data">
        <span class="hours">${timeframe.current}hrs</span>
        <span class="last-hours">Last Week - ${timeframe.previous}hrs</span>
      </div>
    </div>
  `;

  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = html;

  reportGrid.appendChild(card);
}

const current = document.querySelectorAll(".hours");
const previous = document.querySelectorAll(".last-hours");

document.addEventListener("click", e => {
  if (e.target.classList.contains("select")) {
    const active = document.querySelector(".select.active");
    const select = e.target;
    active.classList.remove("active");
    select.classList.add("active");

    if (select.classList.contains("select--daily")) {
      for (let i = 0; i < data.length; ++i) {
        current[i].innerText = `${data[i].timeframes.daily.current}hrs`;
        previous[i].innerText = `Yesterday - ${data[i].timeframes.daily.previous}hrs`;
      }      
    }else if (select.classList.contains("select--weekly")) {
      for (let i = 0; i < data.length; ++i) {
        current[i].innerText = `${data[i].timeframes.weekly.current}hrs`;
        previous[i].innerText = `Last Week - ${data[i].timeframes.weekly.previous}hrs`;
      }      
    }
    if (select.classList.contains("select--monthly")) {
      for (let i = 0; i < data.length; ++i) {
        current[i].innerText = `${data[i].timeframes.monthly.current}hrs`;
        previous[i].innerText = `Last Month - ${data[i].timeframes.monthly.previous}hrs`;
      }      
    }
  }
});

