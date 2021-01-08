//Sökfunktionen
document.getElementById('homeSearchField').addEventListener('focus', function(){
    //Loopa igenom STATE.allposts för att jämföra ID med min sökning.
    //isf pusha in ID:et i en array men först töm den så att det inte ligger någon gammal sökning där
    //Loada sedan posterna med loadposts för att visa de som matchar min söking!
    this.addEventListener('keyup', function(){
        let inputText = this.value;
        let searchArray = [];

        STATE.allPosts.forEach(function(post){
            // varje gång vi hittar en match ska den pushas in i en array
            let postInfo = post.country + post.title + post.description
            let searchSmall = postInfo.toLowerCase();
            if (postInfo.includes(inputText)){
                searchArray.push(post);
            } else if (searchSmall.includes(inputText)){
                searchArray.push(post);
            }
        })
        // skicka med ny array som parameter till loadpost
        document.getElementById('homeSearchField').addEventListener('keyup', function (event){
            if (event.keyCode == 13) {
                // här ska en ny array med den arrayen som har alla sökresultat
                loadPosts(searchArray);
            }
        });

    })
})

