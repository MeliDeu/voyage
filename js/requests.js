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
                    let constructedPost = new PolaroidUser(post);
                    STATE.mainUserSavedPosts.push(constructedPost.htmlElement(STATE.users)); 
                })
            }
        })

        db.data.posts.forEach(post =>{ // pushar in alla posts i allposts i STATE
            let constructedPost = new PolaroidFeed(post);
            STATE.allPosts.push(constructedPost.htmlElement(STATE.users)); //skapar instans i form av ett html-element som en polaroid med all info + en spara-ikon

            if (post.creatorID == STATE.mainUserID) { // pushar in inloggade användarens posts i mainuserposts array i STATE
                let constructedPost = new PolaroidUser(post);
                STATE.mainUserPosts.push(constructedPost.htmlElement(STATE.users)); //skapar instans i form av ett html-element som en polaroid med all info + en soptunna
            }
        });

        console.log(STATE);
        loadPosts(STATE.allPosts)
    });
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

function patchBio(newBio){
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

    })
}
