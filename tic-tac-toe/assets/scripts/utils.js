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
    mainContent.innerHTML = view;
    mainContent.classList.add("play");

    obj.turn = "x";
    obj.moveCount = 0;
    obj.gameOver = false;
    obj.boardArray = new Array(9).fill("");
    obj.selected = -1;
    obj.board = document.querySelectorAll(".board__box");

    obj.board.forEach(box => {
        box.addEventListener("mouseover", e => {
            if (e.target.classList.contains("board__box--marked"))
                return

            e.target.innerHTML = `<img src="./assets/images/icon-${obj.turn}-outline.svg" alt="" class="box--click box--hover">`;
        })

        box.addEventListener("mouseleave", e => {
            if (e.target.classList.contains("board__box--marked"))
                return
            
            e.target.innerHTML = "";
        })
    })
}



export function clearBoard(obj) {
    const marked = document.querySelectorAll(".board__box--marked");
    marked.forEach(box => {
        box.innerHTML = "";
        box.classList.remove("board__box--marked");
        box.removeAttribute("style");
    });

    obj.turn = "x";
    obj.moveCount = 0;
    obj.gameOver = false;
    obj.boardArray = new Array(9).fill("");

    document.querySelector(".turn__img").innerHTML = `<img src="./assets/images/icon-${obj.turn}-silver.svg" alt="">`;
}

/**
 * 
 * @param {object} e1 - result header 1
 * @param {object} e2 - result header 2
 * @param {object} obj - holds game state
 */
export function setResultHeaders(e1, e2, obj) {
    if (obj.p1 === "x") {
        obj.p2 = "o";
        e1.innerHTML = (obj.gameMode === "cpu") ? "x (you)" : "x (p1)";
        e2.innerHTML = (obj.gameMode === "cpu") ? "o (cpu)" : "o (p2)";
    } else {
        obj.p2 = "x";
        e1.innerHTML = "X (P2)";
        e2.innerHTML = "O (P1)";
        e1.innerHTML = (obj.gameMode === "cpu") ? "x (cpu)" : "x (p2)";
        e2.innerHTML = (obj.gameMode === "cpu") ? "o (you)" : "o (p1)";
    }
}

/**
 * 
 * @param {string} view - html to be displayed
 * @param {string} dialogMode - win (p1/p2) or tie
 * @param {object} obj - holds game state
 */
export function showDialog(view, dialogMode, obj) {
    obj.shadowOpen = true;
    const turn = obj.turn;
    const dialog = document.createElement("section");
    dialog.classList.add("dialog");
    dialog.setAttribute("role", "dialog");
    dialog.innerHTML = view;
    document.body.insertBefore(dialog, mainContent);

    const btn1 = dialog.querySelector(".dialog--btn1");
    const btn2 = dialog.querySelector(".dialog--btn2");

    if (dialogMode === "reset") {
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

        if (dialogMode === obj.p1) {
            dialog.querySelector(".dialog--h1").innerHTML = "player 1 wins";
            dialog.querySelector(".dialog--h2").innerHTML = `
                <img src="./assets/images/icon-${turn}.svg" alt="${turn}">
                takes the round
            `;
            dialog.querySelector(".dialog--h2").style.color = `var(--win-${turn})`;
            
    
        } else if (dialogMode === obj.p2) {
            dialog.querySelector(".dialog--h1").innerHTML = "player 2 wins";
            dialog.querySelector(".dialog--h2").innerHTML = `
                <img src="./assets/images/icon-${turn}.svg" alt="${turn}">
                takes the round
            `;
            dialog.querySelector(".dialog--h2").style.color = `var(--win-${turn})`;
        } else if (dialogMode === "tie") {
            dialog.querySelector(".dialog--h2").innerHTML = "round tied";
        }
    }
    
    document.querySelector(".dialog--btn1").focus();
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
export function placeMark(box, obj) {
    if (box.classList.contains("box--hover"))
        box = box.parentElement;
    
    let turn = obj.turn;
    box.classList.add("board__box--marked");
    obj.moveCount += 1;
    const position = parseInt(box.classList[1].slice(-1));
    obj.boardArray[position] = turn;
    box.innerHTML = `<img src="./assets/images/icon-${turn}.svg" alt="" class="board__mark">`;
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
    document.querySelector(".turn__img").innerHTML = `<img src="./assets/images/icon-${turn}-silver.svg" alt="${turn}">`;
    obj.turn = turn;
}

/**
 * 
 * @returns {object} - box object from game board
 */
export function getGameBox() {
    let boxIndex = Math.floor(Math.random() * 9);
    let box = document.querySelector(`.board__box--${boxIndex}`);

    while (box.classList.contains("board__box--marked")) {
        boxIndex = Math.floor(Math.random() * 9);
        box = document.querySelector(`.board__box--${boxIndex}`);
    }

    return box;
}

/**
 * 
 * @param {object} obj - game state object
 * @param {string} direction - arrow press direction
 */
export function setFocus(obj, direction) {
    // const selected = obj.selected;
    switch (direction) {
        case "ArrowLeft":
        case "ArrowDown":
            if (obj.selected == -1) {
                obj.selected = 0;
                obj.board[obj.selected].setAttribute("tabindex", 0);
                obj.board[obj.selected].focus();
            } else if (obj.selected == 0) {
                obj.board[obj.selected].setAttribute("tabindex", -1);
                obj.selected = obj.board.length - 1;
                obj.board[obj.selected].setAttribute("tabindex", 0);
                obj.board[obj.selected].focus();     
            } else {
                obj.board[obj.selected].setAttribute("tabindex", -1);
                obj.selected -= 1;
                obj.board[obj.selected].setAttribute("tabindex", 0);
                obj.board[obj.selected].focus();
            }   
            break;
        case "ArrowRight":
        case "ArrowUp":
            if (obj.selected == -1) {
                obj.selected = 0;
                obj.board[obj.selected].setAttribute("tabindex", 0);
                obj.board[obj.selected].focus();
            } else if (obj.selected == obj.board.length - 1) {
                obj.board[obj.selected].setAttribute("tabindex", -1);
                obj.selected = 0;
                obj.board[obj.selected].setAttribute("tabindex", 0);
                obj.board[obj.selected].focus();     
            } else {
                obj.board[obj.selected].setAttribute("tabindex", -1);
                obj.selected += 1;
                obj.board[obj.selected].setAttribute("tabindex", 0);
                obj.board[obj.selected].focus();
            }   
            break;
    }           
}