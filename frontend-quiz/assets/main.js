const response = await fetch("../data.json");
const data = await response.json();

const quizzes = data["quizzes"];

quizzes.forEach((quiz, i) => {
  const box = document.querySelector(`.box-${i+1}`);
  const html = `
    <div class="box__image ${quiz["title"].toLowerCase()}"><img src=${quiz["icon"]} alt=${quiz["title"]}></div>
    <div class="box__text">${quiz["title"]}</div>
  `;

  box.innerHTML = html;
});