import { showMainMenu, showDialog, displayBoard, placeMark } from "./utils.js"
import { gameBoard, gameMainMenu, dialogContent } from "./views.js";

const gameObject = {
    turn: undefined,
    p1: undefined,
    p2: undefined,
    moveCount: undefined,
    gameOver: undefined,
    boardArray: undefined,
    winStates: [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]
};

showMainMenu(gameMainMenu);


document.addEventListener("click", e => {
    if (e.target.classList.contains("btn--player")) {
        gameObject.p1 = document.querySelector(".mark__selector--radio:checked").id.slice(-1);
        displayBoard(gameBoard, gameObject);

        const resultHeaderX = document.querySelector(".result__header--x");
        const resultHeaderO = document.querySelector(".result__header--o");

        if (gameObject.p1 === "x") {
            gameObject.p2 = "o";
            resultHeaderX.innerHTML = "X (P1)";
            resultHeaderO.innerHTML = "O (P2)";
        } else {
            gameObject.p2 = "x";
            resultHeaderX.innerHTML = "X (P2)";
            resultHeaderO.innerHTML = "O (P1)";
        }
    } else if (e.target.classList.contains("btn--cpu")) {

    }

    if (e.target.classList.contains("board__box--marked"))
        return;
    else if (e.target.classList.contains("board__box") && !gameObject.gameOver) {
        placeMark(e, gameObject);
    }

    if (e.target.classList.contains("reset--btn")) {
        showDialog(dialogContent, "reset", gameObject)
    }

    if (e.target.classList.contains("dialog--cancel")) {
        const dialog = document.querySelector(".dialog");
        document.body.removeChild(dialog);
    }

    if (e.target.classList.contains("dialog--restart")) {
        const dialog = document.querySelector(".dialog");
        document.body.removeChild(dialog);

        displayBoard(gameBoard, gameObject);
    }

})

document.addEventListener("change", e => {
    if (e.target.id === "radio-o") {
        
    }
})