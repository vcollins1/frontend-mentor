import { showMainMenu, showDialog, displayBoard, placeMark, clearBoard, setResultHeaders, getGameBox } from "./utils.js"
import { gameBoard, gameMainMenu, dialogContent } from "./views.js";

const gameObject = {
    gameMode: undefined, // string
    turn: undefined, // string
    p1: undefined, // string
    p2: undefined, // string
    moveCount: undefined, // number
    gameOver: undefined, // boolean
    boardArray: undefined, //  array object
    winStates: [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]
};

showMainMenu(gameMainMenu);


document.addEventListener("click", e => {
    if (e.target.classList.contains("btn--menu")) {
        gameObject.p1 = document.querySelector(".mark__selector--radio:checked").id.slice(-1);
        displayBoard(gameBoard, gameObject);
        const resultHeaderX = document.querySelector(".result__header--x");
        const resultHeaderO = document.querySelector(".result__header--o");
        gameObject.gameMode = e.target.classList[2].slice(5);

        setResultHeaders(resultHeaderX, resultHeaderO, gameObject);

        if (gameObject.gameMode === "cpu" && gameObject.p2 === 'x') {
            setTimeout(() => {
                const box = getGameBox();
                placeMark(box, gameObject);
            }, 2000);
        }


    }

    if (e.target.classList.contains("board__box--marked"))
        return;
    else if (e.target.classList.contains("board__box") && !gameObject.gameOver) {
        placeMark(e.target, gameObject);

        if (gameObject.gameMode === "cpu" && !gameObject.gameOver) {
            setTimeout(() => {
                const box = getGameBox();
                placeMark(box, gameObject);
            }, 2000);
        }
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

    if (e.target.classList.contains("dialog--quit")) {
        const dialog = document.querySelector(".dialog");
        document.body.removeChild(dialog);
        document.querySelector(".main").classList.remove("play");

        showMainMenu(gameMainMenu);
    }

    if (e.target.classList.contains("dialog--next")) {
        const dialog = document.querySelector(".dialog");
        document.body.removeChild(dialog);

        clearBoard(gameObject);
        if (gameObject.gameMode === "cpu" && gameObject.p2 === 'x') {
            setTimeout(() => {
                const box = getGameBox();
                placeMark(box, gameObject);
            }, 2000);
        }
    }
})

document.addEventListener("change", e => {
    if (e.target.id === "radio-o") {
        
    }
})