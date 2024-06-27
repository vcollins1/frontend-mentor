const response = await fetch("../data.json");
const data = await response.json();
const quizzes = data["quizzes"];
const optionsLetters = ['A', 'B', 'C', 'D'];
const questionH1 = document.querySelector(".section-info__header");
const currentQuestion = document.querySelector(".section-info__choice");
const btn = document.querySelector(".btn");
const progressValue = document.querySelector(".progress__value");

let questionCount = 0;
let maxQuestions = 0;
let screen = "start";
let questions = [];
let question = "";
let options = [];
let curTarget = undefined;

let optionSelected = undefined;
let correct = false;

let quizSelected = undefined;
let ansSelected = undefined; 

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

quizzes.forEach((quiz, i) => {
  const box = document.querySelector(`.box--${i+1}`);
  const html = `
    <div class="box__image ${quiz["title"].toLowerCase()}"><img src=${quiz["icon"]} alt=${quiz["title"]}></div>
    <div class="box__text">${quiz["title"]}</div>
  `;

  box.innerHTML = html;
});


document.addEventListener("click", e => {
  if (e.target.parentElement.classList.contains("box")) {
    if (screen == "start") {
      quizSelected = e.target.parentElement;
      screen = "quizStart";
      
      document.querySelector(".progress").style.display = "block";
      document.querySelector(".section-info").classList.add("quiz-select");
      let quiz = {};
      if (quizSelected.classList.contains("box--1"))
        quiz = quizzes[0];
      else if (quizSelected.classList.contains("box--2"))
        quiz = quizzes[1];
      else if (quizSelected.classList.contains("box--3"))
        quiz = quizzes[2];
      else if (quizSelected.classList.contains("box--4"))
        quiz = quizzes[3];

      questions = quiz["questions"];
      maxQuestions = questions.length;

      question = questions[questionCount];
      options = question["options"];

      questionH1.classList.add("quiz-question");
      questionH1.textContent = question["question"];

      currentQuestion.innerHTML = `Question ${questionCount + 1} of ${maxQuestions};`;

      options.forEach((option, i) => {
        const box = document.querySelector(`.box--${i+1}`);
        const html = `
          <div class="box__image box__image--option">${optionsLetters[i]}</div>
          <div class="box__text">${escapeHTML(option)}</div>
        `;

        box.innerHTML = html;
      });

      btn.textContent = "Submit Answer";
      btn.style.visibility = "visible";
      progressValue.style.width = `${((questionCount+1)/maxQuestions) * 100}%`;
    }

    else if (screen === "quizStart" && btn.textContent == "Submit Answer") {
      ansSelected = e.target.parentElement;
      document.querySelector(".no-selection").style.visibility = "hidden";
      if (document.querySelector(".selected") != null)
        document.querySelector(".selected").classList.remove("selected");
        
      ansSelected.classList.add("selected"); 
    }
  }

  if (e.target.classList.contains("btn")) {

    if (btn.textContent == "Submit Answer") {
      if (ansSelected == null) {
        document.querySelector(".no-selection").style.visibility = "visible";
      }
      else {
        if (ansSelected.classList.contains("box--1"))
          optionSelected = 0;
        else if (ansSelected.classList.contains("box--2"))
          optionSelected = 1;
        else if (ansSelected.classList.contains("box--3"))
          optionSelected = 2;
        else if (ansSelected.classList.contains("box--4"))
          optionSelected = 3;
    
        if (options[optionSelected] === question["answer"]) {
          ansSelected.classList.add("correct");
        }
        else {
          ansSelected.classList.add("error");
        }
    
        btn.textContent = "Next Question";
        questionCount += 1;
        if (questionCount >= maxQuestions)
          btn.textContent = "View Results";
      }
    }

    else if (btn.textContent == "Next Question") {
      ansSelected = undefined;
      progressValue.style.width = `${((questionCount+1)/maxQuestions) * 100}%`; 
      question = questions[questionCount];
      options = question["options"];

      questionH1.classList.add("quiz-question");
      questionH1.textContent = question["question"];

      currentQuestion.innerHTML = `Question ${questionCount + 1} of ${maxQuestions};`;

      options.forEach((option, i) => {
        const box = document.querySelector(`.box--${i+1}`);
        const html = `
          <div class="box__image box__image--option">${optionsLetters[i]}</div>
          <div class="box__text">${escapeHTML(option)}</div>
        `;

        box.innerHTML = html;
      });
      document.querySelector(".selected").classList.remove("correct", "error", "selected");

      btn.textContent = "Submit Answer";
    }

    else if (btn.textContent == "View Results") {
      console.log("Viewing results.");
    }
  }
});