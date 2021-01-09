// sköter kontakt med php
//----------------------VARIABLER-------------------------------//
// lilla "button" med +
const addNewImg = document.getElementById("pic_"); 
// const nyImg = document.getElementById("newPostPics"); 
// const hiddenForm = document.getElementById("hiddenForm");
// const imgUploadBtn = document.getElementById("hiddenButton");
// gömd input för previewbilderna
let previewInput = document.getElementById("hiddenInput");//små bilder
// gömd input för coverImg
let coverImageInput = document.getElementById("coverImageInput");
// själva coverImg
let coverImage = document.getElementById("newPostBigPicture");
// form för all post-info som ska till db
let newPostForm = document.getElementById("postInformation");
// button för att submitta hela
let newPostButton = document.getElementById("newPostSubmit");
// soptunna för coverImg
let trashButton = document.querySelector("#newPostBigPicture .imgTrash");
//
// let imageUploadInput = document.getElementById("uploadFiles");
let addedPictures = [];

//----------------------------FUNCTIONS---------------------------//

//function för att lägga till all info i databasen under posts 
function newPostToDB() {
    //skicka info till db: kolla om iaf coverimage och fälten är ifyllda innan det skickas --> görs i classes 
    let formData = new FormData(postInformation);
    //lägger till en ny property i formdata med creator ID, eftersom vi inte har det i formuläret
    formData.set("creatorID", mainUserID);
    addedPictures.forEach(picture => {
        formData.append("images[]", picture, picture.name);
    });
    //egentligen var tanken att skicka hela instansen, men det gick ej, så jag behöll den delen, men valideringen utgår från class CreatePost
    let newPost = new CreatePost({
        creatorID: mainUserID,
        title: formData.get("title"),
        country: formData.get("country"),
        categoryID: formData.get("categoryID"),
        description: formData.get("description"),
        coverImg: formData.get("coverImg"),
        images: formData.getAll("images[]")
    });
    //om alla fält är ifyllda, ska begäran skickas
    if (newPost.validate()) {
        let nyRequ = new Request("http://localhost:2222/admin/uploadPost.php", {
            method: "POST",
            body: formData
        });
        fetch(nyRequ)
            .then(resp => resp.json())
            .then(resurs => {
                console.log(resurs);
                window.location.reload();
            });
    } else {
        alert("Samtliga fält måste vara ifyllda och minst 2 bilder måste vara valda :)")
    }
    return newPost;
}

//funktionen som producerar de små preview-bilderna
function renderPreviewImages(){
    //hämtar in föräldern till previewbilderna
    let previewPictureList = document.getElementById("picPreview");
    //tömmer den då vi alltid appendar alla previewbilder vid varje tillagd bild
    previewPictureList.innerHTML = "";
    addedPictures.forEach(picture => {
        let nPreviewImg = document.createElement("div");
        let trashCan = document.createElement("img");
        trashCan.setAttribute("src", "../images/stockimages/icons/trash.png");
        trashCan.classList.add("imgTrash");
        nPreviewImg.appendChild(trashCan);
        nPreviewImg.classList.add("nyPic");
        //URL.createObjectURL kan användas för att hämta sökvägen för bilden
        let previewURL = URL.createObjectURL(picture);
        nPreviewImg.style.backgroundImage = `url(${previewURL})`;
        nPreviewImg.style.backgroundSize = "cover";
        previewPictureList.appendChild(nPreviewImg);
        trashCan.addEventListener("click", clearPreviewImage);
    });
    //om användaren redan lagt till 5 stycken minibilder, försvinner den lägga till button, finns nog en snyggare lösning men blev trött i huvudet haha
    if (addedPictures.length >= 5) {
        addNewImg.style.display = "none";
    } else {
        addNewImg.style.removeProperty("display");
    }
}

//lägger till senaste bild som finns under e.target.files[0], e.target är elementet man klickat på och det finns under files[0], sen producerar vi minibilden 
function addPreviewImage(e) {    
    addedPictures.push(e.target.files[0]);
    renderPreviewImages();
}

//för borttag vid klick på soptunnan, obs, e.target är själva soptunnan 
function clearPreviewImage(e) {
    //vi vill veta vilket barn diven är det är till föräldern
    //föräldern
    let previewPictureList = document.getElementById("picPreview");
    //hämtar in alla bilder som lagts till som preview-image
    let allPics = previewPictureList.querySelectorAll(".nyPic");
    //loopar över alla nodes vi har där och om det är 
    for (let i = 0; i < allPics.length; i++) {
        //om den aktuella noden är samma som bortklickad previewbild, då ska elementet tas bort från addedPictures-arr
        if (allPics[i] == e.target.parentElement) {
            addedPictures.splice(i, 1);
        }
    }
    //sen skapar vi nya preview-images
    renderPreviewImages();
}


//-------------------------Eventhandlers--------------------------//

//plus för att lägga till ny bild
addNewImg.addEventListener("click", function (e) {
    //triggar igång inputen så att dialogfönstret öppnas
    previewInput.click();
});

//plus på coverImage för att lägga till ny bild
coverImage.addEventListener("click", function() {
    //bara om det inte finns någon bild redan, ska dialogfönstret öppnas
    if (!coverImage.classList.contains("filled")) {
        coverImageInput.click();
    }
});

//så fort användaren har valt ut en coverbild och det läggs in i den coverimageinput, dvs att den changes, då ändras backgrundsbilden
coverImageInput.addEventListener("change", function(e){
    //hämta ut sökvägen till bilden
    let previewURL = URL.createObjectURL(e.target.files[0]);
    coverImage.style.backgroundImage = `url(${previewURL})`;
    coverImage.style.backgroundSize = "cover";
    coverImage.classList.add("filled");
});

//klickar man på trash på coverImg, så återställs allt till innan och inputen töms så att man inte skickar med fel bild
trashButton.addEventListener("click", function(e){
    coverImage.style.removeProperty("background-image");
    coverImage.style.removeProperty("background-size");
    coverImage.classList.remove("filled");
    e.stopPropagation();
    coverImageInput.value = "";
});

//så fort användaren har valt ut en liten bild, så körs addPreviewImage()
previewInput.addEventListener("change", addPreviewImage, false);

//när man klickar på post-btn i skapa ny post
newPostForm.addEventListener("submit", function (e) {
    //så att fönstret inte stängs
    e.preventDefault();
    let successUpload = newPostToDB();
    console.log(successUpload);
});