export const gameMainMenu = `
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

export const gameBoard = `
    <header class="board-header">
        <img class="board-header__logo" src="./assets/images/logo.svg" alt="x o site logo">
        <div class="turn">
            <span class="turn__img">
                <img src="./assets/images/icon-x-silver.svg" alt="">
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

export const dialogContent = `
    <div class="dialog__content">
      <h2 class="dialog--h1"></h2>
      <h3 class="dialog--h2"></h3>
  
      <div class="dialog__btn-group">
        <button class="dialog--btn dialog--btn1"></button>
        <button class="dialog--btn dialog--btn2"></button>
      </div>
    </div>
`;