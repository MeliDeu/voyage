"use strict";
<<<<<<< HEAD
//<<<<<<< HEAD
//hej jasse bror, riktig bror
//hola senor
//=======
//<<<<<<< HEAD

// hajsan alnur
// test 2

//=======
//hej jasse bror, n riktig bror
//>>>>>>> 066fed96bee268c4d42dbc6c7e5c00c9499f20e0
//>>>>>>> c1bb632e50d1a386d2bdf73a700bb62fe2a1692c
=======


//BASEN TILL BÅDE POLAROIDFOTON PÅ STARTSIDA, HEM/PROFIL FEED & MODAL NÄR MAN KLICKAR PÅ POLAROID
>>>>>>> 11cab6611360f17da21464eddc888f379e91b46f
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
    }

    createPolaroidBase(){
        //.polaroid
        let html = document.createElement("div");
        html.classList.add("polaroid");
            //.polaroidPic
            let pic = document.createElement("div");
            pic.style.backgroundImage = `url('${this.coverImg}')`;

            //.polaroidBottom --> KOMMA ÅT I ACTIVE

                //.polaroidInfo --> KOMMA ÅT I POLAROIDUSER & FEED
                    //.polaroidUser
                        //.polaroidUserPic
                        //.polaroidUserName
                    //.polaroidText
                        //.polaroidCountry
                        //.polaroidTitle
                    //(.polaroidIcon)

                //(.polaroidDescription)
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
        this.travelCategory = data.travelCategory;//Detta avser antingen resekategori eller albumnamn
        this.categoryTitle = data.categoryTitle;
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
