"use strict";


window.onload = function(){

    // Hämtar alla posts och fyller på arrayerna i STATE i functions.js
    let request = new Request("../admin/api.php");
    fetch(request)
    .then(r => r.json())
    .then(db => {
        STATE.users = db.data.users; // users i STATE blir array med alla användare

        db.data.users.forEach(user => { // pushar in användarens sparade i STATE saved
            if (user.id == STATE.mainUserID) {
                user.savedPosts.forEach(post => {
                    STATE.mainUserSavedPosts.push(new PolaroidUser(post));
                })
            }
        })

        db.data.posts.forEach(post =>{ // pushar in alla posts i allposts i STATE
            STATE.allPosts.push(new PolaroidFeed(post));
            if (post.creatorID == STATE.mainUserID) { // pushar in inloggade användarens posts i mainuserposts array i STATE
                STATE.mainUserPosts.push(new PolaroidUser(post));
            }
        });


        //Efter att state har fyllts på så är det dags att fylla gridden med posts. Eftersom att funktionen körs varje gång sidan
        //laddas om, och ikonerna i naven samt användarnamnen på polaroiderna är a-länkar så måste vi kolla om det finns en get-parameteren i URLEN
        //för att se vilka posts som ska visas:
        checkURL()
    });
}

function checkURL(){
    if (profileParameter !== "false") { // profileParameter får sitt värde i home.php genom att kolla: isset($_GET["profile"]) ? $_GET["profile"] : "false";?>";
        let user = getUserObjectByID(profileParameter); //ger user-object så vi kan komma åt nyckeln album
        let albumArray = user.album;
        loadCircles(albumArray, "album");

        if (profileParameter == mainUserID) {
            loadPosts(STATE.mainUserPosts); //laddar den inloggades posts
        } else {
            STATE.allPosts.forEach(post => {
                if (post.creatorID == profileParameter) { // pushar in klickade användarens posts i clickedUserPosts i STATE
                    STATE.clickedUserPosts.push(new PolaroidFeed(post));
                }
            })

            loadPosts(STATE.clickedUserPosts); //laddar en annan användares posts, id:et finns i variabeln profileParameter
        }
    } else if (countryParameter !== "false") {
        loadPosts(STATE.allPosts, "country", countryParameter);
        loadCircles(travelCategoriesArray, "country", countryParameter);
    } else {
        loadPosts(STATE.allPosts);
        loadCircles(travelCategoriesArray);
    }
}

/*
    // för country
    if (countryParameter !== "false") { 
        STATE.allPosts.forEach(post => {
        if (post.country == countryParameter) { // pushar in klickade lands posts i clickedUserPosts i STATE
            STATE.clickedUserPosts.push(new PolaroidFeed(post));
            }
        })
        loadPosts(STATE.clickedUserPosts); //laddar posts beroende på klickat land, id:et finns i variabeln profileParameter    
    }
*/


function getCountries(){
    let request = new Request('https://restcountries.eu/rest/v2/all');
    fetch(request)
    .then(response => {
        return response.json();
    })
    .then(resource =>{
        //console.log(resource)
        resource.forEach(element => {
            //Ger namn på 250 länder!
            //console.log(element.name)
        });
    })
}

function patchBio(){
    let newBio = document.getElementById("patchBio").value;
    let inputFavs = document.getElementsByClassName("patchFavs");
    let inputWishes = document.getElementsByClassName("patchWishes");
    let favsArray = [];
    let wishesArray = [];
    for(let i=0; i<3; i++){
        let newWishes = inputWishes[i].value;
        wishesArray.push(newWishes);
    }
    for(let i=0; i<3; i++){
        let newFavs = inputFavs[i].value;
        favsArray.push(newFavs);
    }
    console.log(favsArray);
    console.log(wishesArray);
    let request = new Request("../admin/api.php", {
        method: "PATCH",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            id: mainUserID,
            bio: newBio,
            top3Wishes: wishesArray,
            top3Favs: favsArray
        })
    })
    fetch(request)
    .then(response =>{
        return response.json();
    })
    .then(resource => {
        console.log(resource);
    })
}
function getDatabaseJS(data){
    let request = new Request("../admin/api.php")
    fetch(request)
    .then(response =>{
        return response.json();
    })
    .then(resource =>{
        //console.log(resource)
        data = resource
        return data
    })
}
getDatabaseJS()