"use strict";

function loadStartGrid(){
    //gå igenom adminPolaroidArrayen, för varje ska den skapa en instans 
    adminPolaroidArray.forEach( polaroid => {
        let newPolaroid = new PolaroidStatic(polaroid);
        let grid = document.getElementById("startGrid");
        grid.append(newPolaroid.createPolaroidBase());
    })
}

let bgDark = document.getElementById("bgDark");

let darkOnScroll = function() {
  let y = window.scrollY;
  if (y >= 500) {
      bgDark.style.display = "block";
  }
};

let x = document.getElementById("x");

window.addEventListener("scroll", darkOnScroll);
x.addEventListener("click", function(){
    bgDark.style.display = "none";
});

loadStartGrid();