const hero = document.querySelector(".hero");
const heroText = document.querySelector(".hero__text");
const heroNav = document.querySelector(".hero__nav");

document.addEventListener("click", e => {
    if (e.target.classList.contains("menu-control")) {
        
        if (e.target.classList.contains("opened")) {
            e.target.src = "/assets/images/icon-hamburger.svg";
            e.target.classList.remove("opened");
            hero.classList.remove("opened");
            heroText.classList.remove("opened");
            heroNav.classList.remove("opened");
            return;
        }


        e.target.src = "/assets/images/icon-close.svg";
        e.target.classList.add("opened");
        hero.classList.add("opened");
        heroText.classList.add("opened");
        heroNav.classList.add("opened");
    }
})
