"use strict";


let STATE = {
    mainUserID, //denna får ett värde i home.php genom att den kollar $_SESSION["userID"]. Den kommer antingen vara en siffra eller false 
    users: [], //En array av alla users som finns i databasen
    mainUserPosts: [], //användarens posts
    mainUserSavedPosts: [], //användarens sparade posts, hittas i db --> user --> savedPosts
    allPosts: [], //alla posts
    pictureUpload: {
        clickedDiv: false,
        newPics: []
        },
    testArray: []    
};


//Funktion för att appenda posts i feed
function loadPosts(posts, sort, filter) { //posts = vilken array, sort = på vilken user/land/travelCategory/sökrutans val(), filer = vad den ska jämföra med tex creatorID/countryName
    let grid = document.getElementById("homeFeedGrid");
    grid.innerHTML = ""; //tömmer gridden
    let copyPosts = [...posts]; //kopierar arrayen som skickats så vi inte håller på med den

    //let viewing = document.getElementById("homeFeedView"); //för att sätta tillbaka att det står att alla posts visas när funktionen anropas
    //viewing.innerHTML = "All posts";

    if (sort !== undefined) { //hur sätter man nyckel som en variabel?
        copyPosts = copyPosts.filter(p => p[filter] == sort); 

        //byta ut all posts till viewing land/det som söktes på. Eftersom att om man klickar på ett användarnamn kommer man till deras profil och då kan det stå all posts fortfarande, när man väljer travelCategory syns det genom grå markering
        //viewing.innerHTML = "show all posts"; //detta ska alltså endast ske om man tryckt på ett land eller sökfunktionen, hur kollar vi det?.../kaj

        /*function viewAll(){
            loadPosts(STATE.allPosts);
            viewing.removeEventListener("click", viewAll) //eftersom det inte ska gå att klicka på "all posts" tar vi bort eventlistener
        }*/

        //viewing.addEventListener("click", viewAll); //vid klick laddas alla posts
    }

    copyPosts.forEach(post => {
        grid.append(post.htmlElement(STATE.users));
    });
}

// Redigera sin profil
function editProfile(){
    let profileBio = document.getElementById("profileBio");
    let bioText = profileBio.innerHTML;
    console.log(bioText);
    profileBio.classList.add("hide");
    let patchBio = document.getElementById("patchBio");
    patchBio.innerHTML = bioText;
    patchBio.classList.remove("hide");
    patchBio.classList.add("show");
    let saveBio = document.createElement("button");
    saveBio.setAttribute("id", "saveBio");
    document.getElementById("profileContainer").appendChild(saveBio);


     // Hämtar innehållet från bio text
    //Byt ut bioDiv till ett input fält med det innehållet som fanns sedan innan
    //Sen när användaren trycker på spara så byt tillbaka till en vanlig div igen
}

//Click event för att spara den nya informationen i bio
function saveNewBio(){
    let saveBio = document.getElementById("saveBio");
    saveBio.addEventListener('click', function(){
    //kalla på patch funktionen för att uppdatera databasen
})
}


//Click event för att ändra på sin profil
let edit = document.getElementById("profileSettings");
edit.addEventListener('click', function(event){
    editProfile()
}) //var tvungen att släcka denna då den gör att denna js.fil inte fungerar, något är fel i ovan kod som gör att nedan inte körts/kaj



//Click event för registration!
let register = document.getElementById("register");
register.addEventListener('submit', function(event){
    event.preventDefault();

    let UserName = document.getElementById("newUsername").value;
    let UserPassword = document.getElementById("newPassword").value;
    let UserEmail = document.getElementById("newEmail").value;
    let UserTravelStatus = document.getElementById("travelStatus").checked;

    let request = new Request("../admin/api.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: UserName,
            password: UserPassword,
            email: UserEmail,
            travelStatus: UserTravelStatus
            //profilePic: false,
            //bio: false,
            //top3Wishes: false,
            //top3Favs: false
            //ovan behövs ej då det skapas i apin /kaj
        })
    })
    fetch(request)
    .then(response => {
        return response.json();
    })
    .then(resource => {
        console.log(resource)
        if (resource.errors !== undefined) {
            let errorRegister = document.getElementById("errorRegister");
            errorRegister.innerHTML = "";
            let message = document.createTextNode(resource.errors)
            errorRegister.appendChild(message)
            document.getElementById("newUsername").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("newEmail").value = "";        
        }  else if (resource.data !== undefined) {
            // Om användaren fyllt i input fälten korrekt så skapas en ny användare med feedback om att det går att logga in
            let errorRegister = document.getElementById("errorRegister");
            errorRegister.innerHTML = "";
            let message = document.createTextNode("Registration successful. Welcome to Voyage!")
            errorRegister.appendChild(message)
            document.getElementById("newUsername").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("newEmail").value = ""; 
            
        }
    })
})




