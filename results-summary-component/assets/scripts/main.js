const titles = document.querySelectorAll(".title");
const ratings = document.querySelectorAll(".rating");
const icons = document.querySelectorAll(".icon");

fetch("./data.json").then(response => {
    return response.json();
}).then(obj => {
    for (let i = 0; i < obj.length; ++i) {
        titles[i].innerText = `${obj[i].category}`;
        ratings[i].innerText = `${obj[i].score}`
        icons[i].setAttribute("src", `${obj[i].icon}`)
    }
});