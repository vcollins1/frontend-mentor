// Read quiz data from json file
const response = await fetch("../data.json");
const data = await response.json();
const quizzes = data["quizzes"]; // quizzes object

// html controlled elements
const questionH1 = document.querySelector(".section-info__header");
const currentQuestion = document.querySelector(".section-info__choice");
const btn = document.querySelector(".btn");
const progressValue = document.querySelector(".progress__value");
const quizHeader = document.querySelector(".quiz-header");

// code global variables
let quiz = {};
let questionCount = 0
let maxQuestions = 0;
let screen = "start";
let questions = [];
let question = "";
let options = [];
let curTarget = undefined;
const optionsLetters = ['A', 'B', 'C', 'D'];

let optionSelected = undefined;
let correct = 0;

let quizSelected = undefined;
let ansSelected = undefined;

populateStartMenu();

document.addEventListener("click", e => {
  if (e.target.classList.contains("toggle__switch")) {
    const toggleInput = document.querySelector(".toggle__input");
    if (!toggleInput.checked) {
      document.body.classList.add("dark");
      document.querySelector(".sun").src = "./assets/images/icon-sun-light.svg";
      document.querySelector(".moon").src = "./assets/images/icon-moon-light.svg"
    }
    else {
      document.body.classList.remove("dark");
      document.querySelector(".sun").src = "./assets/images/icon-sun-dark.svg";
      document.querySelector(".moon").src = "./assets/images/icon-moon-dark.svg";
    }
  }

  if (e.target.parentElement.classList.contains("box")) {
    if (screen == "start") {
      quizSelected = e.target.parentElement;
      screen = "quizStart";
      document.querySelector(".progress").style.display = "block";
      document.querySelector(".section-info").classList.add("quiz-select");
      quiz = quizzes[quizSelected.classList[1].slice(-1) - 1];
      quizHeader.innerHTML = `
        <img src="${quiz["icon"]}" class="${quiz["title"].toLowerCase()}" alt="${quiz["title"].toLowerCase()}-quiz">
        <span>${quiz["title"]}</span>
      `;  
      questions = quiz["questions"];
      maxQuestions = questions.length;
      question = questions[questionCount];

      updateQuestionPage(question);

      btn.style.display = "block";
    }

    else if (screen === "quizStart" && btn.textContent == "Submit Answer") {
      ansSelected = e.target.parentElement;
      document.querySelector(".no-selection").style.display = "none";
      if (document.querySelector(".selected") != null)
        document.querySelector(".selected").classList.remove("selected");
        
      ansSelected.classList.add("selected"); 
    }
  }

  if (e.target.classList.contains("btn")) {

    if (btn.textContent == "Submit Answer") {
      if (ansSelected == null) {
        document.querySelector(".no-selection").style.display = "flex";
      }
      else {
        optionSelected = ansSelected.classList[1].slice(-1) - 1;
    
        if (options[optionSelected] === question["answer"]) {
          ansSelected.classList.add("correct");
          ansSelected.querySelector(".result--correct").style.display = "block";
          correct += 1;
        }
        else {
          ansSelected.classList.add("error");
          ansSelected.querySelector(".result--error").style.display = "block";
          const rightAns = document.querySelector(`.box--${options.indexOf(question["answer"]) + 1}`);
          rightAns.querySelector(".result--correct").style.display = "block";
        }
    
        btn.textContent = "Next Question";
        questionCount += 1;
        if (questionCount >= maxQuestions)
          btn.textContent = "View Results";
      }
    }

    else if (btn.textContent == "Next Question") {
      ansSelected = undefined;
      question = questions[questionCount];

      updateQuestionPage(question); 

      document.querySelector(".selected").classList.remove("correct", "error", "selected");
      btn.textContent = "Submit Answer";
    }

    else if (btn.textContent == "View Results") {
      updatResultsPage();
      btn.textContent = "Play Again";
    }

    else if (btn.textContent == "Play Again") {
      screen = "start";
      questionCount = 0;

      document.querySelectorAll(".box").forEach(box => {
        box.innerHTML = "";
        box.style.display = "flex";
      });

      document.querySelector(".box--result").classList.remove("box--result");
      document.querySelector(".section-info").classList.remove("quiz-select");
      currentQuestion.style.display = "block";

      populateStartMenu();
    }
  }
});


function populateStartMenu() {
  btn.textContent = "Submit Answer";
  btn.style.display = "none";
  quizHeader.innerHTML = "";
  questionH1.innerHTML = `
    Welcome to the<span class="section-info__header--span">Frontend Quiz!</span>
  `;
  currentQuestion.textContent = "Pick a subject to get started";

  quizzes.forEach((quiz, i) => {
    const box = document.querySelector(`.box--${i+1}`);
    const html = `
      <div class="box__image ${quiz["title"].toLowerCase()}"><img src=${quiz["icon"]} alt=${quiz["title"]}></div>
      <div class="box__text">${quiz["title"]}</div>
    `;
  
    box.innerHTML = html;
  });
}

function updateQuestionPage(question) {
  options = question["options"];
  questionH1.classList.add("quiz-question");
  questionH1.textContent = question["question"];
  currentQuestion.innerHTML = `Question ${questionCount + 1} of ${maxQuestions}`;
  progressValue.style.width = `${((questionCount+1)/maxQuestions) * 100}%`; 
  displayOptions(options);
}

function displayOptions(options) {
  options.forEach((option, i) => {
    const box = document.querySelector(`.box--${i+1}`);
    const html = `
      <div class="box__image box__image--option">${optionsLetters[i]}</div>
      <div class="box__text">${escapeHTML(option)}</div>
      <img class="result result--correct" src="./assets/images/icon-correct.svg" alt="icon-correct">
      <img class="result result--error" src="./assets/images/icon-error.svg" alt="icon-error">
    `;

    box.innerHTML = html;
  });
}

function updatResultsPage() {
  document.querySelector(".selected").classList.remove("correct", "error", "selected");

  document.querySelector(".progress").style.display = "none";
  currentQuestion.style.display = "none";
  questionH1.innerHTML = `
    Quiz completed<span class="section-info__header--span">You scored...</span>
  `;
  questionH1.classList.remove("quiz-question");

  document.querySelectorAll(".box").forEach(box => {
    box.innerHTML = "";
    box.style.display = "none";
  });

  const resultBox = document.querySelector(".box--1");
  resultBox.style.display = "flex";
  resultBox.classList.add("box--result");
  
  const html = `
    <div class="quiz-header">
      <img src="${quiz["icon"]}" class="${quiz["title"].toLowerCase()}" alt="${quiz["title"].toLowerCase()}-result">
      <span>${quiz["title"]}</span>
    </div>
    <div><span class="num-correct">${correct}</span><br>out of ${maxQuestions}</div>
  `;

  resultBox.innerHTML = html;
}


const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );