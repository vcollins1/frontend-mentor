const mainContent = document.querySelector(".main");
let turn = "x";

document.addEventListener("click", e => {
    
    
    if (e.target.classList.contains("board__box--marked"))
        return;
    else if (e.target.classList.contains("board__box")) {
        if (turn === "x") {
            e.target.innerHTML = `<img src="./assets/images/icon-x.svg" alt="" class="board__mark">`;
            turn = "o";
        } else if (turn === "o") {
            e.target.innerHTML = `<img src="./assets/images/icon-o.svg" alt="" class="board__mark">`;
            turn = "x";
        }

        e.target.classList.add("board__box--marked");
    }
})

const gameMainMenu = `
    <img class="logo" src="./assets/images/logo.svg" alt="X O">

    <section class="mark">
      <h1 class="mark__header">pick player 1's mark</h1>
      
      <div  class="mark__selector" role="radiogroup">
        <label class="mark__selector--x mark__selector--mark" aria-checked="true" tabindex="0" aria-label="select x as your mark">
          <input type="radio" name="mark-selector" class="mark__selector--radio" checked>
  
          <span>
            <svg viewBox="0 0 65 65" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/>
            </svg>
          </span>
        </label>
  
        <label class="mark__selector--o mark__selector--mark" aria-checked="false" tabindex="0" aria-label="select o as your mark">
          <input type="radio" name="mark-selector" class="mark__selector--radio">
          
          <span>
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

const showMainMenu = () => {
    mainContent.innerHTML = gameMainMenu;
}