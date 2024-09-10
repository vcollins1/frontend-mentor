import { showMainMenu, showDialog, displayBoard, placeMark, clearBoard, setResultHeaders, getGameBox, setFocus } from "./utils.js"
import { gameBoard, gameMainMenu, dialogContent } from "./views.js";

const gameObject = {
    gameMode: undefined, // string
    turn: undefined, // string
    p1: undefined, // string
    p2: undefined, // string
    moveCount: undefined, // number
    gameOver: undefined, // boolean
    boardArray: undefined, //  array object
    board: undefined,
    selected: undefined,
    winStates: [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ],
    shadowOpen: false
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
    else if (e.target.classList.contains("box--click") && !gameObject.gameOver) {

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
        gameObject.shadowOpen = false;
    }

    if (e.target.classList.contains("dialog--restart")) {
        const dialog = document.querySelector(".dialog");
        document.body.removeChild(dialog);
        gameObject.shadowOpen = false;

        displayBoard(gameBoard, gameObject);
    }

    if (e.target.classList.contains("dialog--quit")) {
        const dialog = document.querySelector(".dialog");
        document.body.removeChild(dialog);
        document.querySelector(".main").classList.remove("play");
        gameObject.shadowOpen = false;

        showMainMenu(gameMainMenu);
    }

    if (e.target.classList.contains("dialog--next")) {
        const dialog = document.querySelector(".dialog");
        document.body.removeChild(dialog);
        gameObject.shadowOpen = false;

        clearBoard(gameObject);
        if (gameObject.gameMode === "cpu" && gameObject.p2 === 'x') {
            setTimeout(() => {
                const box = getGameBox();
                placeMark(box, gameObject);
            }, 2000);
        }
    }
})

document.addEventListener("keydown", e => {
    if (e.code == "Tab" && gameObject.shadowOpen) {
        const btns = document.querySelectorAll(".dialog--btn");

        if (document.activeElement == btns[1]) {
            e.preventDefault();
            btns[0].focus();
        }
    }

    if (e.code == "Space" && e.target.classList.contains("mark__selector--mark")) {
        e.target.firstElementChild.checked = true;
    }

    if (!gameObject.shadowOpen) {
        switch (e.code) {
            case "ArrowLeft":
            case "ArrowRight":
            case "ArrowUp":
            case "ArrowDown":
                e.preventDefault();
                setFocus(gameObject, e.code)
        }
    }
})