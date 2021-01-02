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
    } else {
        loadPosts(STATE.allPosts)
    }
}


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
    console.log(newBio);
    let request = new Request("/admin/api.php", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            bio: newBio
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