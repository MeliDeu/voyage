"use strict";

class PolaroidBase{
    constructor(data){
        this.postID = data.postID;
        this.coverIMG = data.coverIMG;
        this.creatorID = data.creatorID; //Username, UserPic
        this.country = data.country;
        this.title = data.title;
        this.albumID = data.albumID;
        this.travelCategory = data.travelCategory;
        this.description = data.description;
    }
}
class PolaroidStatic extends PolaroidBase{
    constructor(data){
        super(data);
    }
}
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
        this.albumCoverIMG = data.albumCoverIMG;
    }
}
