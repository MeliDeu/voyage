"use strict";

function randomNumber(min, max) {
	// Returns a random integer between the integers min and max. Max not included.
	// Example: randomNumber(3, 6) will return 3, 4 or 5.
	return min + Math.floor((max - min) * Math.random())
}

//Laddar upp polaroiderna på startsidan
function loadStartGrid(){
    //gå igenom adminPolaroidArrayen, för varje ska den skapa en instans 
    adminPolaroidArray.forEach( polaroid => {
        let newPolaroid = new PolaroidStatic(polaroid);
        let grid = document.getElementById("startGrid");
        grid.append(newPolaroid.createPolaroidBase());
    })
}

//Background overlay på scroll
//TO DO: kolla hur bred viewern är och sätt scroll beroende på det
let darkOnScroll = function() {
  let y = window.scrollY;
  if (y >= 700) {
      document.getElementById("bgDark").style.display = "block";
      document.getElementById("startModalWrapper").style.display = "flex";
      document.getElementById("loginModal").style.display = "block";
      document.getElementById("close").style.display = "block";
  }
};

//Event handlers för startsida
window.addEventListener("scroll", darkOnScroll);

//TO DO: vid klick utanför modalfönstret ta bort overlay
/*document.getElementById("startModalWrapper").addEventListener("click", function(){
    document.getElementById("bgDark").style.display = "none";
    document.getElementById("startModalWrapper").style.display = "none";
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("close").style.display = "none";
});*/

document.getElementById("close").addEventListener("click", function(){
    document.getElementById("bgDark").style.display = "none";
    document.getElementById("startModalWrapper").style.display = "none";
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("close").style.display = "none";
});

document.getElementById("navLoginBtn").addEventListener("click", function(){
    document.getElementById("bgDark").style.display = "block";
    document.getElementById("startModalWrapper").style.display = "flex";
    document.getElementById("loginModal").style.display = "block";
    document.getElementById("close").style.display = "block";
})

loadStartGrid();

 //FÖRSÖK TILL ATT ANIMERA STARTSIDANS POLAROIDER../Kaj
/*let idTime = setInterval(function () {
    let random = randomNumber(0, adminPolaroidArray.length);
    let filter = document.getElementsByClassName(`filter${random}`);
    filter.style.opacity = "0";
}, 1000)*/

//setTimeout(function(){
   // filter.classList.remove("filter");
//}, 1500);