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
        this.travelCategory = data.travelCategory;
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

    createPolaroidBase(){
        let userInfo

        adminUsersArray.forEach(user => {
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

            //.polaroidBottom --> KOMMA ÅT I ACTIVE
            //skapas på i constructorn

                //.polaroidInfo --> KOMMA ÅT I POLAROIDUSER & FEED
                //skapas på i constructorn

                    //.polaroidUser
                    let polaroidUser = document.createElement("div");
                    polaroidUser.classList.add("polaroidUser");
                        //.polaroidUserPic
                        let polaroidUserPic = document.createElement("div");
                        polaroidUserPic.style.backgroundImage = `url('${userInfo.userPic}')`;
                        polaroidUserPic.classList.add("polaroidUserPic");
                        //.polaroidUserName
                        let polaroidUserName = document.createElement("div");
                        polaroidUserName.innerHTML = `${userInfo.userName}`;
                        polaroidUserName.classList.add("polaroidUserName");

                    polaroidUser.append(polaroidUserPic, polaroidUserName);    

                    //.polaroidText
                    let polaroidText = document.createElement("div");
                    polaroidText.classList.add("polaroidText", "flexCenter");
                        //.polaroidCountry
                        let polaroidCountry = document.createElement("div");
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
    //this.icon = soptunna
}
class PolaroidFeed extends PolaroidActive{
    constructor(data){
        super(data);
    }
    //Spara symbol
}


//STRUKTUREN PÅ MODALFÖNSTER NÄR MAN KLICKAR PÅ EN POLAROID
class PostStructure extends PolaroidBase{
    constructor(data){
        super(data);
    }
    //Stor vit ruta, Stor vit bild, antingen ifylld eller ej, div för mindre bilder under stor bild, höger-spalt som är tom
    //kryss ovanför vit ruta, 
}

class PostShow extends PostStructure{
    constructor(data){
        super(data);
        this.images = data.images;
        //HTML för show
    }
    //Vad som ska finnas i höge-spalt : div som innehåller, userPic, UserName, date
    //Spara knapp, land, album, titel, description + 2 knappar : visa land, visa profil
}
class CreatePost extends PostStructure{
    constructor(data){
        super(data);
    }
    //Funktioner: Klick funktioner, ladda upp bilder, postknapp, Välj coverIMG!
    //Högerspalt: Skapa inputfält, select counrty, description, travelCategory, skriv titel, select album (new!!), postknapp
    //
}


//KATEGORI-/ALBUMCIRKLAR PÅ HOMEPAGE ELLER PROFILSIDA
class CategoryBox{
    //Skapa div categoryBox, innehåller 1 cirkeldiv categoryIcon + div med cetegoryTitle
    //Här får de hover effekt + click event för att visa alla under samma category!
}
class TravelCategory extends CategoryBox{
    constructor(data){
        this.travelCategory = data.travelCategory;
        this.categoryID = data.categoryID;
        this.categoryIcon = data.categoryIcon;
    }
}
class Album extends CategoryBox{
    constructor(data){
        this.albumID = data.albumID;
        this.albumTitle = data.albumTitle;
        this.albumCoverImg = data.albumCoverImg;
    }
}
