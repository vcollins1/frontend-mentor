const ratings = document.querySelectorAll(".radio-btn");
let selected = -1;


document.addEventListener("click", e => {
  if (e.target.classList.contains("rating")) {
    
  }
})

document.addEventListener("keydown", e => {

  switch (e.code) {
    case "Space":
    case "Enter":
      if (document.activeElement.classList.contains("radio-btn")) {
        const id = document.activeElement.id;
        document.querySelector(`#${id}`).querySelector(".rating").checked = true;
      }

      break;

    case "ArrowLeft":
    case "ArrowUp":
      e.preventDefault();
      
      if (selected == -1)
        setSelected(0);
      else if (selected == 0)
        setSelected(ratings.length - 1);
      else
        setSelected(selected - 1);

      break;

    case "ArrowRight":
    case "ArrowDown":
      e.preventDefault();
      
      if (selected == -1)
        setSelected(0);
      else if (selected == ratings.length - 1)
        setSelected(0);
      else
        setSelected(selected + 1);

      break;

  }
}) 

function setSelected(idx) {
  let previousSelected = undefined;
  let newSelected = undefined;

  if (selected != -1) {
    previousSelected = ratings[selected];
    previousSelected.setAttribute("tabindex", -1);
    previousSelected.setAttribute("aria-checked", false);
    previousSelected.querySelector(".rating").checked = false;
  }

  newSelected = ratings[idx];
  newSelected.setAttribute("tabindex", 0);
  newSelected.setAttribute("aria-checked", true);
  newSelected.querySelector(".rating").checked = true;
  newSelected.focus();

  document.querySelector(".ratings").setAttribute("selected", idx);
  selected = idx;
}