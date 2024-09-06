import { dialogContent } from "./views.js";
const mainContent = document.querySelector(".main");

/**
 * 
 * @param {string} view
 */
export function showMainMenu(view) {
    mainContent.innerHTML = view;
}

/**
 * 
 * @param {string} view
 * @param {object} obj - holds game state
 */
export function displayBoard(view, obj) {
    obj.turn = "x";
    obj.moveCount = 0;
    obj.gameOver = false;
    obj.boardArray = new Array(9).fill("");

    mainContent.innerHTML = view;
    mainContent.classList.add("play")
}

/**
 * 
 * @param {string} view - html to be displayed
 * @param {string} mode - win (p1/p2) or tie
 * @param {object} obj - holds game state
 */
export function showDialog(view, mode, obj) {
    const turn = obj.turn;
    const dialog = document.createElement("section");
    dialog.classList.add("dialog");
    dialog.setAttribute("role", "dialog");
    dialog.innerHTML = view;
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

        if (mode === obj.p1) {
            dialog.querySelector(".dialog--h1").innerHTML = "player 1 wins";
            dialog.querySelector(".dialog--h2").innerHTML = `
                <img src="./assets/images/icon-${turn}.svg" alt="${turn}">
                takes the round
            `;
            dialog.querySelector(".dialog--h2").style.color = `var(--win-${turn})`;
            
    
        } else if (mode === obj.p2) {
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

/**
 * 
 * @param {string} p - mark for player (x/o)
 * @param {object} obj - holds game state
 * @returns - winning state of game
 */
function checkWin(p, obj) {
    let curState = [];
    obj.winStates.forEach(state => {
        if (p === obj.boardArray[state[0]] && p === obj.boardArray[state[1]] && p === obj.boardArray[state[2]]) {
            curState = state;
            return;
        }
    });

    return curState;
}

/**
 * 
 * @param {object} e - board box object
 * @param {object} obj - holds game state
 */
export function placeMark(e, obj) {
    let turn = obj.turn;
    e.target.classList.add("board__box--marked");
    obj.moveCount += 1;
    const position = parseInt(e.target.classList[1].slice(-1));
    obj.boardArray[position] = turn;
    e.target.innerHTML = `<img src="./assets/images/icon-${turn}.svg" alt="" class="board__mark">`;
    const winState = checkWin(turn, obj);
 
    if (winState.length !== 0) {
        winState.forEach(pos => {
            const box = document.querySelector(`.board__box--${pos}`);
            box.style.backgroundColor = `var(--win-${turn})`;
            box.querySelector(".board__mark").src = `./assets/images/icon-${turn}-dark.svg`;
        });

        const totals = document.querySelector(`.result--${turn} .result__total`);
        totals.innerHTML = parseInt(totals.innerHTML) + 1;
        showDialog(dialogContent, turn, obj);
        obj.gameOver = true;
        return;
    }

    if (obj.moveCount === 9) {
        const totals = document.querySelector(".result--tie .result__total");
        totals.innerHTML = parseInt(totals.innerHTML) + 1;
        showDialog(dialogContent, "tie", obj);
    }

    
    turn = (turn === "x") ? "o" : "x";
    document.querySelector(".turn__img").innerHTML = `<img src="./assets/images/icon-${turn}-silver.svg" alt="">`;
    obj.turn = turn;
}