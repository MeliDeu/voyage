// sköter kontakt med php

const addNewImg = document.getElementById("newPostPictures");
const nyImg = document.getElementById("newPostPics");
const hiddenForm = document.getElementById("hiddenForm");
const imgUploadBtn = document.getElementById("hiddenButton");
let fileInput = document.getElementById("hiddenInput");
let newPostForm = document.getElementById("postInformation");
let newPostButton = document.getElementById("newPostSubmit");
let currentClickedDiv;
let addedPictures = [];

//function för att trigga igång val av file 
function chooseImg(e){
    //currenttarget = elementet före punkten, alltså coverImg eller nyImg
    //target = det elementet som man klickar på
    // så om klickat element är samma som det som står före punkten, då ska dialogfönstret öppnas
    if (e.target !== e.currentTarget && e.target.id !== "newPostPics") {
        currentClickedDiv = e.target.id;
        // console.log(e.target.style.background); //returns empty string
        //trigga dialogfönster vid klick av ram för upload (triggar klick-eventet på file-upload-input)
        fileInput.click();
    }
    e.stopPropagation();
}

//function för att trigga igång upload av image
function uploadImg(){
    let formData = new FormData(hiddenForm);
    let nyReq = new Request("http://localhost:7070/admin/imgUpload.php", {
        method: "POST",
        body: formData
    });
    fetch(nyReq)
        .then(resp => {
            if (!resp.ok) {
                throw Error();
            }
            return resp.json();
        })
        .then(resurs => {
            //resurs == sökvägen till den nya uppladdade bilden, sparad under key "file"
            let currentPic = resurs.file;
            //hämta in diven med id:n "currentclickeddiv" och byta bakgrundsbild på den, samt töm +:et
            let currentDiv = document.getElementById(currentClickedDiv);
            // currentDiv.innerHTML = "";
            //här måste vi hämta in den nya sökvägen från php:n
            currentDiv.style.backgroundImage = `url(${currentPic})`;
            currentDiv.style.backgroundSize = "cover";
            currentDiv.style.backgroundPosition = "center";
            currentDiv.classList.add("filled");
            //gå in i posts, hitta respektive post med id, och pusha in den nya bilden i arrayn, om post redan existerar, är det en helt ny post, så måste vi skicka ett nytt objekt till databasen enligt objektet ovan 
            //om man klickar igen, så kommer dialogfönstret upp igen, så att man kan byta bild igen, man får dock lägga en unlink 
        })
        .catch(error => {
            console.log(error.message);
            alert("Something went wrong with the upload");
        });
}

//function för att lägga till all info i databasen under posts 
function newPostToDB() {
    //skicka info till db: kolla om iaf coverimage och fälten är ifyllda innan det skickas 
    let title = document.getElementById("postRubrik").value;
    let country = document.getElementById("postCountrySelect").value;
    let category = document.getElementById("postCategorySelect").value;
    let description = document.getElementById("postDescription").value;
    let coverImage = document.getElementById("newPostBigPicture").style.backgroundImage;
    let nodes = [];
    let otherImage = [];
    let newPicsNodes = nyImg.childNodes;
    //måste sortera ut de childnodes som är #text, vet dock ej varifrån det kommer
    for (let i = 0; i < newPicsNodes.length; i++) {
        if (i%2) {
            nodes.push(newPicsNodes[i]);
        }
    }
    //spara allas url till backgrundsbilden i otherImage-arr
    for (let i = 0; i < nodes.length; i++){
        if (nodes[i].classList.contains("filled")) {
            otherImage.push(nodes[i].style.backgroundImage);
        }
        
    }
    let newPost = {
        //id:, //post ID läggs till i php:n
        creatorId: mainUserID,
        title: title,
        country: country,
        category: category,
        description: description,
        coverImage: coverImage,
        otherImage: otherImage
    };
    // return newPost;
    let nyRequ = new Request("http://localhost:7070/admin/imgUpload.php", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    fetch(nyRequ)
        .then(resp => resp.json())
        .then(resurs => {
            console.log(resurs);
        });
}


//eventhandlers

// addNewImg.addEventListener("click", chooseImg, false);

addNewImg.addEventListener("click", function(e){
    e.stopPropagation();
    if (e.target !== e.currentTarget && e.target.id !== "newPostPics" && e.target.className !== "newPostUp" && e.target.className !== "imgTrash") {
        if (e.target.classList.contains("filled")) { //om redan bild i, då ska inte dialogrutan komma upp igen
            console.log(`${e.target.id} is filled`);
        } else {
            chooseImg(e);
        }
    }
});

fileInput.addEventListener("change", uploadImg, false);

//om man klickar på bilden och background-img är add.png, då ska funktionen uploadImg anropas. annars ingen klick och vid hover dyker trash-containern upp. vid klick på trash, delete-anrop, där man tar bort bilden med unlink --> problem med vanilla.. får ej fram vilken bakgrundsbild som elementet har, eventuellt lägga en class på diven när den fylls och sedan tas bort igen när den är empty --> if element hasClass --> då ska trashcan dyka upp, och ingen chooseimg, 

//när man klickar på post-btn i skapa ny post
newPostForm.addEventListener("submit", function(e){
    e.preventDefault();
    let testOne = newPostToDB();
    console.log(testOne);
    document.getElementById("newPostOverlay").style.display = "none";
});
