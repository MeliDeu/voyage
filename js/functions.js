"use strict";


let STATE = {
    mainUserID, //denna får ett värde i home.php genom att den kollar $_SESSION["userID"]. Den kommer antingen vara en siffra eller false 
    users: [], //En array av alla users som finns i databasen
    mainUserPosts: [], //användarens posts
    mainUserSavedPosts: [], //användarens sparade posts, hittas i db --> user --> savedPosts
    clickedUserPosts: [], //användarens som man klickar på posts
    allPosts: [], //alla posts
    pictureUpload: {
        clickedDiv: false,
        newPics: []
        }
};


//Funktion för att appenda posts i feed
function loadPosts(posts, filter, sort) { //posts = vilken array, filer = vilken nyckel soma ska jämföras med tex creatorID/countryName, sort = ett värde den ska jämföra med
    let grid = document.getElementById("homeFeedGrid");
    grid.innerHTML = ""; //tömmer gridden
    let copyPosts = [...posts]; //kopierar arrayen som skickats

    let viewing = document.getElementById("homeFeedView"); //för att sätta tillbaka att det står att alla posts visas när funktionen anropas
    viewing.innerHTML = "All posts";

    if (sort !== undefined) { 
        copyPosts = copyPosts.filter(p => p[filter] == sort); 

        if (copyPosts.length == 0) {
            grid.innerHTML = "No posts";
        }

        //byta ut all posts till viewing land/det som söktes på. Eftersom att om man klickar på ett användarnamn kommer man till deras profil och då kan det stå all posts fortfarande, när man väljer travelCategory syns det genom grå markering
        viewing.innerHTML = "Reset filter"; //detta ska alltså endast ske om man tryckt på ett land eller sökfunktionen, hur kollar vi det?.../kaj

        function viewAll(){
            loadPosts(STATE.allPosts);
            viewing.removeEventListener("click", viewAll) //eftersom det inte ska gå att klicka på "all posts" tar vi bort eventlistener
        }

        viewing.addEventListener("click", viewAll); //vid klick laddas alla posts
    }

    copyPosts.forEach(post => {
        grid.append(post.htmlElement(STATE.users));
    });
}


// funktion för att ta fram travel category / album cirklarna
function loadCircles(array, album){ //array: antingen travelCategoriesArray eller db -> user.album
    let categoryBar = document.getElementById("barCategories");

    if (album !== undefined) {
        array.forEach(element => {
            let constructor = new Album(element);
            categoryBar.append(constructor.html());
        })
    } else {
        array.forEach(element => {
            let constructor = new TravelCategory(element);
            categoryBar.append(constructor.html());
        })
    }
}


function getUserObjectByID(id){
    let user = STATE.users.find(user => {
        return user.id == id;
    })

    return user;
}

//Sök funktionen
document.getElementById('homeSearchField').addEventListener('focus', function(event){
    let request = new Request("../admin/api.php")
    fetch(request)
    .then(response =>{
        return response.json();
    })
    .then(resource =>{
        console.log(resource.data.posts)
        document.getElementById('homeSearchField').addEventListener('keyup', function(){
            let inputText = document.getElementById('homeSearchField').value;
            //console.log(inputText)
            resource.data.posts.forEach(function(param){
                let postInfo = param.country + param.title + param.description
                let searchSmall = postInfo.toLowerCase();
                //console.log(searchSmall)

                if (postInfo.includes(inputText)){
                    //console.log(param)
                    searchPress()
                } else if (searchSmall.includes(inputText)){
                    console.log(param)
                    searchPress()
                }


            })
            
        })
    })

    
})
//CLICK vid sök
document.getElementById("searchButton").addEventListener('click', function(){
    loadPosts(STATE.allPosts)
    console.log('hej')
})

//Click event för att trigga söket
function searchPress(){
    document.getElementById('homeSearchField').addEventListener('keyup', function (event){
        event.preventDefault();
      if (event.keyCode == 13) {
        document.getElementById("searchButton").click();
      }
    });
  }

// Redigera sin profil
function editProfile(){
    //BIO
    let profileBio = document.getElementById("profileBio");
    let bioText = profileBio.innerHTML;
    console.log(bioText);
    profileBio.classList.add("hide");
    let patchBio = document.getElementById("patchBio");
    patchBio.innerHTML = bioText;
    patchBio.classList.remove("hide");
    patchBio.classList.add("show");
    //SAVE
    let saveBio = document.getElementById("saveBio");
    saveBio.classList.remove('hide');
    saveBio.classList.add('show');
    //saveBio.setAttribute("id", "saveBio");
    //document.getElementById("profileContainer").appendChild(saveBio);
    //TOP FAVS & WISHES
    let topFavs = document.getElementsByClassName("topFavsList");
    let topWishes = document.getElementsByClassName("topWishesList");
    let inputFavs = document.getElementsByClassName("patchFavs");
    let inputWishes = document.getElementsByClassName("patchWishes");
    for(let i=0; i<3; i++){
        //FAVS
        //adderar classen hide på alla elementen & show till input fälten
        let topFavsText = document.getElementsByClassName("topFavsList")[i].innerHTML;
        topFavs[i].classList.add("hide");
        inputFavs[i].value = topFavsText;
        inputFavs[i].classList.remove("hide");
        inputFavs[i].classList.add("show");
        //WISHES
        let topWishesText = document.getElementsByClassName("topWishesList")[i].innerHTML;
        topWishes[i].classList.add("hide");
        inputWishes[i].value = topWishesText;
        inputWishes[i].classList.remove("add");
        inputWishes[i].classList.add("show");
    }
    //PROFILE UPLOAD
    let upload = document.getElementById('fileInfo');
    //let saveButton = document.getElementById('savePic');
    upload.classList.remove('hide');
    upload.classList.add('show');
    //saveButton.classList.remove('hide');
    //saveButton.classList.add('show');
    saveNewBio();


     // Hämtar innehållet från bio text
    //Byt ut bioDiv till ett input fält med det innehållet som fanns sedan innan
    //Sen när användaren trycker på spara så byt tillbaka till en vanlig div igen
}

//Click event för att spara den nya informationen i bio
function saveNewBio(){
    let saveBio = document.getElementById("saveBio");
    saveBio.addEventListener('click', function(){

    document.getElementById('uploadProfilePic').submit();
    //saveProfilePic()
    //kalla på patch funktionen för att uppdatera databasen
    patchBio()

    //Ändra tillbaka till vanliga div och li element
    saveBio.classList.remove('show');
    saveBio.classList.add('hide');
    let patchBioField = document.getElementById("patchBio")
    let patchBioText = patchBioField.value;
    patchBioField.classList.remove("show");
    patchBioField.classList.add("hide");
    let profileBio = document.getElementById("profileBio");
    profileBio.innerHTML = patchBioText;
    profileBio.classList.remove("hide");
    profileBio.classList.add("show");
    let topFavs = document.getElementsByClassName("topFavsList");
    let topWishes = document.getElementsByClassName("topWishesList");
    let inputFavs = document.getElementsByClassName("patchFavs");
    let inputWishes = document.getElementsByClassName("patchWishes");
    for(let i=0; i<3; i++){
        //FAVS
        //adderar classen hide på alla elementen & show till input fälten
        let topFavsText = document.getElementsByClassName("patchFavs")[i].value;
        topFavs[i].classList.remove("hide");
        topFavs[i].classList.add("show");
        topFavs[i].innerHTML = topFavsText;
        inputFavs[i].classList.remove("show");
        inputFavs[i].classList.add("hide");
        //WISHES
        let topWishesText = document.getElementsByClassName("patchWishes")[i].value;
        topWishes[i].classList.remove("hide");
        topWishes[i].classList.add("show");
        topWishes[i].innerHTML = topWishesText;
        inputWishes[i].classList.remove("show");
        inputWishes[i].classList.add("hide");
    }
    //PROFILE UPLOAD
    let upload = document.getElementById('fileInfo');
    //let saveButton = document.getElementById('savePic');
    upload.classList.remove('show');
    upload.classList.add('hide');
    //saveButton.classList.remove('show');
    //saveButton.classList.add('hide');
    
})
}

//Click för att ladda upp profilbild
//function saveProfilePic(){

//}

let uploadForm = document.getElementById('uploadProfilePic');
uploadForm.addEventListener('submit', function(event){
    event.preventDefault();

    let form = uploadForm[0];

    let formData = new FormData(form);
    console.log(formData)

    let request = new Request("../admin/api.php",{
        method: "POST",
        body: formData
    });
    fetch(request)
    .then(response =>{
        return response.json();
    })
    .then(resource =>{
        console.log(resource)
    })
})

// click för att öppna/stänga slide i sidebar
let slider = document.getElementById('slider');
let toggle = document.getElementById('countriesNavBtn');
toggle.addEventListener('click', function() {
    let isOpen = slider.classList.contains('slide-in');
    slider.setAttribute('class', isOpen ? 'slide-out' : 'slide-in');
});
// placerar länder från adminArray.js -> countriesArray i sliden
countriesArray.forEach(function(country){
    let newLi = document.createElement("li");
    newLi.innerHTML = country.name;
    let cName = country.name.replace(/ /g, '+');
    // click på ett land
    newLi.addEventListener('click', function(){
        window.location = `../home.php?country=${cName}`;
    }) 

    let sliderList = document.getElementById("sliderList");
    sliderList.append(newLi);
})


//Click event för att ändra på sin profil
let edit = document.getElementById("profileSettings");
edit.addEventListener('click', function(event){
    editProfile()
}) 
//var tvungen att släcka denna då den gör att denna js.fil inte fungerar, något är fel i ovan kod som gör att nedan inte körts/kaj
// måste vara för att edit blir null när man inte är på en profilsida / jas




