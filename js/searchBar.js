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