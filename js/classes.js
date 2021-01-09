"use strict";


//BASEN TILL BÅDE POLAROIDFOTON PÅ STARTSIDA, HEM/PROFIL FEED & MODAL NÄR MAN KLICKAR PÅ POLAROID
class PolaroidBase{
    constructor(data){
        this.postID = data.postID;
        this.coverImg = data.coverImg;
        this.creatorID = data.creatorID; //Username, UserPic
        this.country = data.country;
        this.title = data.title;
        this.albumID = data.albumID;
        this.categoryID = data.categoryID;
        this.description = data.description;
    }
}


//POLAROIDFOTONA PÅ STARTSIDAN
class PolaroidStatic extends PolaroidBase{
    constructor(data){
        super(data); 

        this.polaroidBottom = document.createElement("div");
        this.polaroidBottom.classList.add("polaroidBottom");

        this.polaroidInfo = document.createElement("div");
        this.polaroidInfo.classList.add("polaroidInfo");
    }

    createPolaroidBase(arr){
        let userInfo

        arr.forEach(user => {
            if (user.id == this.creatorID) {
               userInfo = user;
            }
         });

        //.polaroid
        let html = document.createElement("div");
        html.classList.add("polaroid", `polaroid${this.postID}`);
        let filter = document.createElement("div");
        filter.classList.add("filter", `filter${this.postID}`);

            //.polaroidPic
            let pic = document.createElement("div");
            pic.style.backgroundImage = `url('${this.coverImg}')`;
            pic.classList.add("polaroidPic");
            let that = this.postID;
            pic.addEventListener("click", function(){
                makeNewShowPost(that);
            });

            //.polaroidBottom --> KOMMA ÅT I ACTIVE
            //skapas på i constructorn

                //.polaroidInfo --> KOMMA ÅT I POLAROIDUSER & FEED
                //skapas på i constructorn

                    //.polaroidUser
                    let polaroidUser = document.createElement("div");
                    polaroidUser.classList.add("polaroidUser");
                        //.polaroidUserPic
                        let polaroidUserPic = document.createElement("div");
                        if (!userInfo.profilePic){
                            polaroidUserPic.style.backgroundImage = 'url("../images/stockImages/userPic.png")';
                        } else {
                            polaroidUserPic.style.backgroundImage = `url('${userInfo.profilePic}')`;
                        }
                        polaroidUserPic.classList.add("polaroidUserPic");
                        //.polaroidUserName //HÄR SKA SKAPAS ETT CLICKEVENT
                        let polaroidUserName = document.createElement("a");
                        // Här sätts a länk som innehåller en get-parameter som kollas i home.php
                        polaroidUserName.setAttribute('href', `../home.php?profile=${this.creatorID}`);
                        polaroidUserName.innerHTML = `${userInfo.username}`;
                        polaroidUserName.classList.add("polaroidUserName");

                    polaroidUser.append(polaroidUserPic, polaroidUserName);    

                    //.polaroidText
                    let polaroidText = document.createElement("div");
                    polaroidText.classList.add("polaroidText", "flexCenter");
                        //.polaroidCountry
                        let polaroidCountry = document.createElement("a");
                        polaroidCountry.setAttribute('href', `../home.php?country=${this.country}`)
                        polaroidCountry.innerHTML = `${this.country}`;
                        polaroidCountry.classList.add("polaroidCountry");
                        //.polaroidTitle
                        let polaroidTitle = document.createElement("div");
                        polaroidTitle.innerHTML = `${this.title}`;
                        polaroidTitle.classList.add("polaroidTitle");

                    polaroidText.append(polaroidCountry, polaroidTitle);    

                this.polaroidInfo.append(polaroidUser, polaroidText); // här ska även .polaroidIcon appendas men den skapas i active
                this.polaroidBottom.append(this.polaroidInfo); // här ska även .polaroidDescription appendas men den skapas i active
                html.append(filter, pic, this.polaroidBottom);

                return html;
            
    }
}


//POLAROIDFOTONA ANTINGEN PÅ HOME FEED ELLER PROFIL FEED (GÅR ATT KLICKA PÅ OSV)
class PolaroidActive extends PolaroidStatic{
    constructor(data){
        super(data);

    }


    //Metod där polaroiden får en hover effekt, description ska synas
    //Click event på hela polaroiden som gör att posten öppnas
}
class PolaroidUser extends PolaroidActive{
    constructor(data){
        super(data)
    }

    htmlElement(arr) {
        this.polaroidInfo.innerHTML = "";
        let html = super.createPolaroidBase(arr);
        let iconDiv = document.createElement("div");
        let icon = document.createElement("div");
        icon.setAttribute('id', `trashIcon_${this.postID}`);
        icon.style.backgroundImage = "url('../images/stockImages/icons/trash.png')";
        iconDiv.classList.add("polaroidIcon");
        iconDiv.append(icon);
        this.polaroidInfo.append(iconDiv);

        icon.addEventListener('click', function(){
            let trashID = this.getAttribute('id');
            let subClicked = trashID.substr(10)
            //console.log(subClicked);

            //kalla på funktion som raderar post
            removePostFromDB(subClicked)
        })

        return html;
    }
}
class PolaroidFeed extends PolaroidActive{
    constructor(data){
        super(data);
    }

    htmlElement(arr) {
        this.polaroidInfo.innerHTML = "";
        let html = super.createPolaroidBase(arr);
        let iconDiv = document.createElement("div");
        let icon = document.createElement("div");
        icon.setAttribute('id', `icon_${this.postID}`);
        iconDiv.classList.add("polaroidIcon");
        iconDiv.append(icon);
        this.polaroidInfo.append(iconDiv);

        icon.addEventListener('click', function(){
            let clickedPostId = this.getAttribute('id');
            let subClicked = clickedPostId.substr(5)
            //console.log(subClicked);
            
            // skicka clickedPostId som en post till db -> users -> som har inloggade userID -> saved
            // sparas i en array i STATE - mainUserSavedPosts
            postSavedToDB(subClicked)
            // en funktion ska finnas i functions som placerar pics från den arrayen i saved när man klickar i sidebar
            // klick igen = avmarkeras och splice från array 
        })


        return html;
    }
}


//STRUKTUREN PÅ MODALFÖNSTER NÄR MAN KLICKAR PÅ EN POLAROID
class PostStructure extends PolaroidBase{
    constructor(data){
        super(data);
        this.images = data.images;
    }
    htmlElement() {
        //wrapper som håller ihop vit ruta med kryss
        let newModalWrapper = document.createElement("div");
        newModalWrapper.setAttribute("id", "newPostWrapper");
        //stäng-kryss
        let modalClose = document.createElement("div");
        modalClose.setAttribute("id","postClose");
        modalClose.innerHTML = "X";
        //container för postinformation
        let modalContainer = document.createElement("div");
        modalContainer.setAttribute("id","newPostContainer");

        //div för bilder
        let postPictureContainer = document.createElement("div");
        postPictureContainer.setAttribute("id", "showPostPictures");
        //div för rubrik
        // let modalUpperPart = document.createElement("div");
        // modalUpperPart.classList.add("coverImageDiv");
        // //div för coverImg 
        // let coverImage = document.createElement("div");
        // coverImage.classList.add("newPostMiddle");
        // coverImage.setAttribute("id", "newPostBigPicture");
        //div för små bilder
        // let miniImages = document.createElement("div");
        // miniImages.classList.add("showPostImagesContainer");
        // miniImages.setAttribute("id", "previewImages");
        // for (let i = 1; i <= 5; i++) {
        //     let newMiniPic = document.createElement("div");
        //     newMiniPic.setAttribute("id", `pic_${i}`);
        //     newMiniPic.classList.add("nyPic");
        //     miniImages.append(newMiniPic);
        // }
        // postPictureContainer.append(modalUpperPart, miniImages);

        //div för postdescription --> innehåll läggs till i andra klasser då det är antingen formulär eller divar
        let postDescriptionContainer = document.createElement("div");
        postDescriptionContainer.setAttribute("id", "showPostInfo");

        //html-tree
        modalContainer.appendChild(postPictureContainer, postDescriptionContainer);
        newModalWrapper.appendChild(modalClose, modalContainer);
        return newModalWrapper;
    }
}

class PostShow extends PostStructure{
    constructor(data){
        super(data);
        // this.images = data.images;
        
    }
    //postID finns på polaroid, leta upp posten och anropa constructor med hela objektet
    htmlElement() {
        //finns endast 2 lådor under varandra
        //överst med coverImg till vänster, userdiv och sparadiv samt info till höger
        //nederst med images[] till vänster, 2 buttons till höger
        let outerShell = super.htmlElement();
            //hämta hela category
        let categoryObj = travelCategoriesArray.filter(category => {
            return category.categoryID == this.categoryID;
        });
        //hämta hela user
        let userObj = STATE.users.filter(user => {
            return user.id == this.creatorID;
        });
        //vänster sida
        //coverImg
        let coverImage = document.createElement("div");
        coverImage.style.backgroundImage = `url(${this.coverImg})`;
        let pictureArrow = document.createElement("div"); //happy idea
        //miniBilder
        let previewImageContainer = document.createElement("div");
        this.images.forEach(image => {
            let previewImage = document.createElement("div");
            previewImage.classList.add("previewImage");
            previewImage.style.backgroundImage = `url(${image})`;
            previewImageContainer.appendChild(previewImage);
        });
        

        //höger sida
        //information om usern och save
        let userContainer = document.createElement("div");
        let userInformation = document.createElement("div");
        let saveBtn = document.createElement("img");
        let userPicture = document.createElement("div");
        userPicture.classList.add("polaroidUserPic");
        userPicture.style.backgroundImage = `url('${userObj.profilePic}')`;
        let userName = document.createElement("div");
        userName.innerHTML = `${userObj.username}`;
        userName.classList.add("polaroidUserName");
        userInformation.appendChild(userPicture, userName);
        userContainer.appendChild(userInformation, saveBtn);

        //information om posten
        let postInformation = document.createElement("div");
        let postCountry = document.createElement("div");
        postCountry.innerText = this.country;
        let postCategory = document.createElement("div");
        //leta upp rätt category
        postCategory.innerText = categoryObj.travelCategory;
        let postTitle = document.createElement("div");
        postTitle.innerText = this.title;
        let postDescription = document.createElement("div");
        postDescription.innerText = this.description;
        postInformation.appendChild(postCountry, postCategory, postTitle, postDescription);
        //sätta ihop postInfo
        postInformation.appendChild(postCountry, postCategory, postTitle, postDescription);

        //buttons
        let buttonsContainer = document.createElement("div");
        let countryButton = document.createElement("a");
        //ska länkas till countrysidan
        countryButton.setAttribute("href", `../home.php?country=${this.country}`); 
        countryButton.innerHTML = `view ${this.country}`; 
        let profileButton = document.createElement("a");
        //ska länkas till personens profil
        profileButton.setAttribute("href", 'href', `../home.php?profile=${this.creatorID}`); 
        profileButton.innerHTML = `view profile`;
        buttonsContainer.appendChild(countryButton, profileButton);

        //sätta ihop vänster sida
        outerShell.getElementById("showPostPictures").appendChild(coverImage, previewImageContainer);
        outerShell.getElementById("showPostInfo").appendChild(userContainer, postInformation, buttonsContainer);
        
        return outerShell;
    }
}

//inga html-element som skapas med denna eftersom det inte displayas någon info från db, skickar endast och validerar
class CreatePost extends PostStructure{
    constructor(data){
        super(data);
        this.images = data.images;
    }
    //använder klassen endast för att kolla av om allt är ifyllt
    validate(){
        if (this.title === "" || this.coverImg === "undefined" || this.description === "" || typeof this.creatorID !== "number" || addedPictures.length === 0) {
            return false;
        } else {
            return true;
        }
    }
    //Funktioner: Klick funktioner, ladda upp bilder, postknapp, Välj coverIMG!
    //Högerspalt: Skapa inputfält, select counrty, description, travelCategory, skriv titel, select album (new!!), postknapp
    //
}


//KATEGORI-/ALBUMCIRKLAR PÅ HOMEPAGE ELLER PROFILSIDA
class CategoryBox{
    constructor(data){
        this.categoryBox = document.createElement("div");
        this.categoryBox.classList.add("categoryBox");

        this.icon = document.createElement("div");
        this.icon.classList.add("categoryIcon");

        this.title = document.createElement("div");
        this.title.classList.add("categoryTitle");

        this.categoryBox.append(this.icon, this.title);
    }

    //Skapa div categoryBox, innehåller 1 cirkeldiv categoryIcon + div med cetegoryTitle
    //Här får de hover effekt + click event för att visa alla under samma category!
}

class TravelCategory extends CategoryBox{
    constructor(data){
        super(data);
        this.travelCategory = data.travelCategory;
        this.categoryID = data.categoryID;
        this.categoryIcon = data.categoryIcon;
    }

    html(country){ //skickas från funktionen loadCircles om användaren är på ett specifikt land
        this.categoryBox.id = "category_" + this.categoryID; 

        this.categoryBox.addEventListener("click", function(){
            //console.log(country);
            let id = this.id.substr(9);
            loadPosts(STATE.allPosts, "categoryID", id);
            //ta bort class från alla som är samma typ av objeect
            let elementArray = document.querySelectorAll('.categoryBox');
            elementArray.forEach(function(el){
                el.classList.remove('showBG');
                el.classList.add('hideBG');
            })
            this.classList.remove('hideBG');
            this.classList.add('showBG');
        })

        let icon = document.createElement("div");
        icon.style.backgroundImage = `url('${this.categoryIcon}')`;
        this.icon.append(icon);

        this.title.innerHTML = this.travelCategory;

        return this.categoryBox;
    }
}

class Album extends CategoryBox{
    constructor(data){
        super(data);
        this.albumID = data.albumID;
        this.albumTitle = data.albumTitle;
        this.albumCoverImg = data.albumCoverImg;
    }

    html(){
        this.categoryBox.id = "category_" + this.albumID; 
        this.categoryBox.addEventListener("click", function(){
            let id = this.id.substr(9);
    
            if (profileParameter == STATE.mainUserID) {
                loadPosts(STATE.mainUserPosts, "albumID", id); 
            } else {
                loadPosts(STATE.clickedUserPosts, "albumID", id); 
            }

            //ta bort class från alla som är samma typ av object
            let elementArray = document.querySelectorAll('.categoryBox');
            elementArray.forEach(function(el){
                el.classList.remove('showBG');
                el.classList.add('hideBG');
                })
            this.classList.remove('hideBG');
            this.classList.add('showBG');
        })
        
        this.icon.style.backgroundImage = `url('${this.albumCoverImg}')`;
        this.title.innerHTML = this.albumTitle;
        return this.categoryBox;
    }
}
