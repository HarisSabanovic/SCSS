"use strict";

let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");
let animationBtn = document.getElementById("animation-bt");

openBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);
animationBtn.addEventListener("click", toggleAnimation);



function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");

    let style = window.getComputedStyle(navMenuEl);

    if(style.display === "none") {
        navMenuEl.style.display = "block";
    }
    else {
        navMenuEl.style.display = "none";
    }

}

function toggleAnimation() {
    console.log("De fungerar");

    let animationEl = document.getElementById("animation");

    let style = window.getComputedStyle(animationEl);

    if(style.display === "none") {
        animationEl.style.display = "block";
    }
    else {
        animationEl.style.display = "none";
    }
}

