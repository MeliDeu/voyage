//Sök funktionen
document.getElementById('homeSearchField').addEventListener('focus', function(event){
    //Loopa igenom STATE.allposts för att jämföra ID med min sökning.
    //isf pusha in ID:et i en array men först töm den så att det inte ligger någon gammal sökning där
    //Loada sedan posterna med loadposts för att visa de som matchar min söking!
    document.getElementById('homeSearchField').addEventListener('keyup', function(){
        let inputText = document.getElementById('homeSearchField').value;
        STATE.allPosts.forEach(function(param){
        
            //console.log(inputText)
            let postInfo = param.country + param.title + param.description
            let searchSmall = postInfo.toLowerCase();
            //console.log(searchSmall)

            if (postInfo.includes(inputText)){
                //console.log(param)
                searchPress(param.postID)
            } else if (searchSmall.includes(inputText)){
                //console.log(param)
                //Laddar endast sista posten men fungerar!
                searchPress(param.postID)
            }
        })
    })

    
})
//CLICK vid sök
document.getElementById("searchButton").addEventListener('click', function(){
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