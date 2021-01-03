
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
    //EDIT
    let settings = document.getElementById('profileSettings');
    settings.classList.add('hide');

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
    saveNewBio();
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

    let settings = document.getElementById('profileSettings');
    settings.classList.add('show');
    settings.classList.remove('hide');

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
})
}


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


//Click event för att ändra på sin profil
let edit = document.getElementById("profileSettings");
edit.addEventListener('click', function(event){
    editProfile()
}) 