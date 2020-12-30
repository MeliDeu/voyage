"use strict";

// Redigera sin profil
function editProfile(){
    let profileBio = document.getElementById("profileBio");
    let bioText = profileBio.innerHTML; // Hämtar innehållet från bio text
    //Byt ut bioDiv till ett input fält med det innehållet som fanns sedan innan
    //Sen när användaren trycker på spara så byt tillbaka till en vanlig div igen
    console.log(bioText)
}

//Click event för att ändra på sin profil
let edit = document.getElementById("profileSettings");
edit.addEventListener('click', function(event){
    editProfile()
})




