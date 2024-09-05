const mainContent = document.querySelector(".main");
const boardArray = new Array(9).fill("");
const winStates = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];


let turn = "x";
let p1Mark = undefined;
let p2Mark = undefined;
let gameOver = false;
let moveCount = 0;


document.addEventListener("click", e => { 
    if (e.target.classList.contains("btn--player")) {
        const selectedMark = document.querySelector(".mark__selector--radio:checked").id.slice(-1);
        p1Mark = selectedMark;
        displayBoard();

        const resultHeaderX = document.querySelector(".result__header--x");
        const resultHeaderO = document.querySelector(".result__header--o");

        if (p1Mark === "x") {
            p2Mark = "o";
            resultHeaderX.innerHTML = "X (P1)";
            resultHeaderO.innerHTML = "O (P2)";
        } else {
            p2Mark = "x";
            resultHeaderX.innerHTML = "X (P2)";
            resultHeaderO.innerHTML = "O (P1)";
        }
    } else if (e.target.classList.contains("btn--cpu")) {

    }




    if (e.target.classList.contains("board__box--marked"))
        return;
    else if (e.target.classList.contains("board__box") && !gameOver) {
        e.target.classList.add("board__box--marked");
        const position = parseInt(e.target.classList[1].slice(-1));
        moveCount += 1;

        if (turn === "x") {
            boardArray[position] = turn;
            e.target.innerHTML = `<img src="./assets/images/icon-x.svg" alt="" class="board__mark">`;
            const winState = checkWin(turn);
            if (winState.length !== 0) {
                for (pos of winState) {
                    const box = document.querySelector(`.board__box--${pos}`);
                    box.style.backgroundColor = `var(--light-blue)`;
                    box.querySelector(".board__mark").src = "./assets/images/icon-x-dark.svg";
                }

                const totals = document.querySelector(".result--x .result__total");
                totals.innerHTML = parseInt(totals.innerHTML) + 1;
                showDialog(turn);
                gameOver = true;
                return;
            }

            
            turn = "o";
            document.querySelector(".turn__img").innerHTML = `
                <svg viewBox="0 0 65 65" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/>
                </svg>
            `;
        } else if (turn === "o") {
            boardArray[position] = turn;
            e.target.innerHTML = `<img src="./assets/images/icon-o.svg" alt="" class="board__mark">`;
            const winState = checkWin(turn);
            if (winState.length !== 0) {
                for (pos of winState) {
                    const box = document.querySelector(`.board__box--${pos}`);
                    box.style.backgroundColor = `var(--light-yellow)`;
                    box.querySelector(".board__mark").src = "./assets/images/icon-o-dark.svg";
                }

                const totals = document.querySelector(".result--o .result__total");
                totals.innerHTML = parseInt(totals.innerHTML) + 1;
                showDialog(turn);
                gameOver = true;
                return;
            }


            turn = "x";
            document.querySelector(".turn__img").innerHTML = `
                <svg viewBox="0 0 65 65" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/>
                </svg>
            `;
        }

        if (moveCount === 9) {
            const totals = document.querySelector(".result--tie .result__total");
            totals.innerHTML = parseInt(totals.innerHTML) + 1;
            showDialog("tie");
        }
    }

    if (e.target.classList.contains("reset--btn")) {
        showDialog("reset")
    }

})

document.addEventListener("change", e => {
    if (e.target.id === "radio-o") {
        
    }
})

const gameMainMenu = `
    <img class="logo" src="./assets/images/logo.svg" alt="X O">

    <section class="mark">
      <h1 class="mark__header">pick player 1's mark</h1>
      
      <div  class="mark__selector" role="radiogroup">
        <label class="mark__selector--x mark__selector--mark" for="radio-x">
          <input type="radio" name="mark-selector" id="radio-x" class="mark__selector--radio" checked>
  
          <span role="radio" aria-checked="true" aria-label="select x" tabindex="0">
            <svg viewBox="0 0 65 65" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/>
            </svg>
          </span>
        </label>
  
        <label class="mark__selector--o mark__selector--mark" for="radio-o">
          <input type="radio" name="mark-selector" id="radio-o" class="mark__selector--radio">
          
          <span role="radio" aria-checked="false" aria-label="select o" tabindex="0">
            <svg viewBox="0 0 65 65" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/>
            </svg>
          </span>
        </label>  
      </div>
      
      <p class="info">remember: x goes first</p>
    </section>

    <button class="btn btn--cpu">new game (vs cpu)</button>

    <button class="btn btn--player">new game (vs player)</button>
`;

const gameBoard = `
    <header class="board-header">
        <img class="board-header__logo" src="./assets/images/logo.svg" alt="x o site logo">
        <div class="turn">
            <span class="turn__img">
                <svg viewBox="0 0 65 65" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/>
                </svg>
            </span>
            <h1>turn</h1>
        </div>
        <span class="reset reset--btn">
            <svg class="reset--btn" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path class="reset--btn" d="M19.524 0h-1.88a.476.476 0 0 0-.476.499l.159 3.284A9.81 9.81 0 0 0 9.835.317C4.415.317-.004 4.743 0 10.167.004 15.597 4.406 20 9.835 20a9.796 9.796 0 0 0 6.59-2.536.476.476 0 0 0 .019-.692l-1.348-1.349a.476.476 0 0 0-.65-.022 6.976 6.976 0 0 1-9.85-.63 6.987 6.987 0 0 1 .63-9.857 6.976 6.976 0 0 1 10.403 1.348l-4.027-.193a.476.476 0 0 0-.498.476v1.881c0 .263.213.476.476.476h7.944A.476.476 0 0 0 20 8.426V.476A.476.476 0 0 0 19.524 0Z" fill="#1F3641"/>
            </svg>
        </span>
    </header>

    <div class="board">
        <span class="board__box board__box--0"></span>
        <span class="board__box board__box--1"></span>
        <span class="board__box board__box--2"></span>
        <span class="board__box board__box--3"></span>
        <span class="board__box board__box--4"></span>
        <span class="board__box board__box--5"></span>
        <span class="board__box board__box--6"></span>
        <span class="board__box board__box--7"></span>
        <span class="board__box board__box--8"></span>
    </div>

    <div class="results">
        <div class="result result--x">
            <h2 class="result__header--x">X (you)</h2>
            <h3 class="result__total">0</h3>
        </div>

        <div class="result result--tie">
            <h2 class="result__header">ties</h2>
            <h3 class="result__total">0</h3>
        </div>

        <div class="result result--o">
            <h2 class="result__header--o">O (cpu)</h2>
            <h3 class="result__total">0</h3>
        </div>
    </div>
`;

const dialogContent = `
    <div class="dialog__content">
      <h2 class="dialog--h1"></h2>
      <h3 class="dialog--h2"></h3>
  
      <div class="dialog__btn-group">
        <button class="dialog--btn dialog--btn1"></button>
        <button class="dialog--btn dialog--btn2"></button>
      </div>
    </div>
`;

const showMainMenu = () => {
    mainContent.innerHTML = gameMainMenu;
}

const displayBoard = () => {
    mainContent.innerHTML = gameBoard;
    mainContent.classList.add("play")
}

const checkWin = (p) => {
    for (state of winStates) {
        if (p === boardArray[state[0]] && p === boardArray[state[1]] && p === boardArray[state[2]]) {
            return state;
        }
    }

    return [];
}

const showDialog = (mode) => {
    const dialog = document.createElement("section");
    dialog.classList.add("dialog");
    dialog.setAttribute("role", "dialog");
    dialog.innerHTML = dialogContent;
    document.body.insertBefore(dialog, mainContent);

    const btn1 = dialog.querySelector(".dialog--btn1");
    const btn2 = dialog.querySelector(".dialog--btn2");

    if (mode === "reset") {
        btn1.innerHTML = "no, cancel";
        btn1.classList.add("dialog--cancel");

        btn2.innerHTML = "yes, restart";
        btn2.classList.add("dialog--restart");
        dialog.querySelector(".dialog--h2").innerHTML = "restart game?";
    } else {
        btn1.innerHTML = "quit";
        btn1.classList.add("dialog--quit");

        btn2.innerHTML = "next round";
        btn2.classList.add("dialog--next");

        if (mode === p1Mark) {
            dialog.querySelector(".dialog--h1").innerHTML = "player 1 wins";
            dialog.querySelector(".dialog--h2").innerHTML = `
                <img src="./assets/images/icon-${turn}.svg" alt="${turn}">
                takes the round
            `;
            dialog.querySelector(".dialog--h2").style.color = `var(--win-${turn})`;
            
    
        } else if (mode === p2Mark) {
            dialog.querySelector(".dialog--h1").innerHTML = "player 2 wins";
            dialog.querySelector(".dialog--h2").innerHTML = `
                <img src="./assets/images/icon-${turn}.svg" alt="${turn}">
                takes the round
            `;
            dialog.querySelector(".dialog--h2").style.color = `var(--win-${turn})`;
        } else if (mode === "tie") {
            dialog.querySelector(".dialog--h2").innerHTML = "round tied";
        }
    }
}

showMainMenu();