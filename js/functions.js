"use strict";


let STATE = {
    mainUserID, //denna får ett värde i home.php genom att den kollar $_SESSION["userID"]. Den kommer antingen vara en siffra eller false 
    users: [], //En array av alla users som finns i databasen
    mainUserPosts: [], //användarens posts
    mainUserSavedPosts: [], //användarens sparade posts, hittas i db --> user --> savedPosts
    countries: [],
    clickedUserPosts: [], //användarens som man klickar på posts
    allPosts: [], //alla posts
    pictureUpload: {
        clickedDiv: false,
        newPics: []
        },
    sideBarMarked: false,
};

// ta bort plus på costa+rica
//Funktion för att appenda posts i feed
function loadPosts(posts, filter, sort) { //posts = vilken array, filer = vilken nyckel soma ska jämföras med tex creatorID/countryName, sort = ett värde den ska jämföra med
    let grid = document.getElementById("homeFeedGrid");
    grid.innerHTML = ""; //tömmer gridden
    let copyPosts = [...posts]; //kopierar arrayen som skickats

    let viewing = document.getElementById("homeFeedView"); //för att sätta tillbaka att det står att alla posts visas när funktionen anropas
    viewing.innerHTML = "All posts";

    if (sort !== undefined) { 
        //console.log(countryParameter);
        copyPosts = copyPosts.filter(p => p[filter] == sort); 

        if (copyPosts.length == 0) {
            grid.innerHTML = "No posts";
        }

        if (countryParameter !== "false") { //om man har klickat på ett land SAMT klickar på en kategori så filtrerar vi arrayen på landet man är på
            copyPosts = copyPosts.filter(p => p.country == countryParameter); 
        }

        //byta ut all posts till viewing land/det som söktes på. Eftersom att om man klickar på ett användarnamn kommer man till deras profil och då kan det stå all posts fortfarande, när man väljer travelCategory syns det genom grå markering
        viewing.innerHTML = "Reset filter";

        function viewAll(){

            if (filter == "albumID" && profileParameter == STATE.mainUserID) {
                loadPosts(STATE.mainUserPosts);
            } else if (filter == "albumID") {
                loadPosts(STATE.clickedUserPosts);
            } else {
                loadPosts(STATE.allPosts);
            }

            viewing.removeEventListener("click", viewAll) //eftersom det inte ska gå att klicka på "all posts" tar vi bort eventlistener
        }

        viewing.addEventListener("click", viewAll); //vid klick laddas alla posts
    }

    copyPosts.forEach(post => {
        grid.prepend(post.htmlElement(STATE.users));
    });
}


// funktion för att ta fram travel category / album cirklarna
function loadCircles(array, sort, country){ //array: antingen travelCategoriesArray eller db -> user.album
    let categoryBar = document.getElementById("barCategories");

    if (sort == "album") {
        array.forEach(element => {
            let constructor = new Album(element);
            categoryBar.append(constructor.html());
        })
    } else if (sort == "country") {
 
        array.forEach(category => {
            let categoryExists = STATE.allPosts.some(post => {
                return post.country == country && post.categoryID == category.categoryID;
            })
            if (categoryExists) {
                let constructor = new TravelCategory(category);
                categoryBar.append(constructor.html(country));
            }
        })
    }
    else {
        array.forEach(element => {
            let constructor = new TravelCategory(element);
            categoryBar.append(constructor.html());
        })
    }

    //if det finns en post i allposts (some) ska cirkeln dyka upp
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
                    searchPress(param.postID)
                } else if (searchSmall.includes(inputText)){
                    console.log(param)
                    //Laddar endast sista posten men fungerar!
                    searchPress(param.postID)
                }


            })
            
        })
    })

    
})
//CLICK vid sök
document.getElementById("searchButton").addEventListener('click', function(){
    //loadPosts(STATE.allPosts)
    
    console.log('hej')
})

//Click event för att trigga söket
function searchPress(id){
    document.getElementById('homeSearchField').addEventListener('keyup', function (event){
        event.preventDefault();
      if (event.keyCode == 13) {
        document.getElementById("searchButton").click();
        loadPosts(STATE.allPosts, "postID", id);
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

//här görs options i newPostContainern, där respektive array skickas med samt i vilken container de options ska appendas
function makePostOptions(element, container){
    // if (container === "STATE.countries"){
    //     arr.forEach(element => {
    //         let newOption = document.createElement("option");
    //         newOption.innerHTML = element;
    //         newOption.setAttribute("value", element);
    //         newOption.setAttribute("name", element);
    //         container.appendChild(newOption);
    //     });
    // } else {
        
    // }
    let newOption = document.createElement("option");
    newOption.innerHTML = element;
    newOption.setAttribute("value", element);
    newOption.setAttribute("name", element);
    container.appendChild(newOption);
    
}

//öppnar modalfönstret för ny Post samt laddar in alla länder och categories
document.getElementById("add").addEventListener("click", function(){
    let optionsCategory = document.getElementById("postCategorySelect");
    let optionsCountry = document.getElementById("postCountrySelect");
    STATE.countries.forEach(country => {
        makePostOptions(country, optionsCountry);
    });
    travelCategoriesArray.forEach(category => {
        makePostOptions(category.travelCategory, optionsCategory);
    });
    document.getElementById("newPostOverlay").style.display = "flex";
});

//stänger modalfönstret för ny Post
document.getElementById("postClose").addEventListener("click", function(){
    document.getElementById("newPostOverlay").style.display = "none";
});

//Click för att ladda upp profilbild
//function saveProfilePic(){

//}

let uploadForm = document.getElementById('uploadProfilePic');
document.getElementById('uploadProfilePic').addEventListener('submit', function(event){
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


// clickfunktion för sidebar
// hämtar alla element med class .icon
let sideBarIcon = document.querySelectorAll('.icon');
console.log(sideBarIcon)
// loopar alla för att ge alla ett klickevent
sideBarIcon.forEach(function(element){
    element.addEventListener('click', function() {
        // Vid klick ska classen .active tas bort från alla element - därav loop igen
        sideBarIcon.forEach(function(el){
            el.removeAttribute('class', 'active')
            // var tvungen att lägga till class .icon igen för den togs bort vid ovan linje
            el.setAttribute('class', 'icon')
            // child = varje elements barn (den div där iconen ligger)
            let child = el.children[0]
            // id = divens id
            let childName = child.id
            // sätter alla iconer till svart
            child.style.backgroundImage = `url('../images/stockImages/icons/${childName}.png')`;
        });
        // endast det element som är klickat ska få class .active & vit icon
        this.setAttribute('class', 'icon active');
        let child = this.children[0]
        let childName = child.id
        child.style.backgroundImage = `url('../images/stockImages/icons/${childName}_white.png')`;
    });
})


//Click event för att ändra på sin profil
let edit = document.getElementById("profileSettings");
edit.addEventListener('click', function(event){
    editProfile()
}) 
//var tvungen att släcka denna då den gör att denna js.fil inte fungerar, något är fel i ovan kod som gör att nedan inte körts/kaj
// måste vara för att edit blir null när man inte är på en profilsida / jas




