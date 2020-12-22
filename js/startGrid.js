"use strict";

function loadStartGrid(){
    //gå igenom adminPolaroidArrayen, för varje ska den skapa en instans 
    adminPolaroidArray.forEach( polaroid => {
        let newPolaroid = new PolaroidStatic(polaroid);
        let grid = document.getElementById("startGrid");
        grid.append(newPolaroid.createPolaroidBase());
    })
}

loadStartGrid();