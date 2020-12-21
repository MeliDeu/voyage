"use strict";

class PolaroidBase{
    //Endast bas till resterande classes
    constructor(data){
        this.postID = data.postID;
        this.creatorID = data.creatorID;
        this.coverIMG = data.coverIMG;
        this.albumID = data.albumID;
        this.country = data.country;
        this.travelCategory = data.travelCategory;
        this.title = data.title;
        thid.description = data.description;
    }
}
class PostsUser extends PolaroidBase{
    //Skapar Polaroid elementen
    constructor(data){
        super(data);
    }
    createPolaroidUser(){
        let polaroidBoxWrapper = document.createElement("div")
        let polaroidImgWraper = document.createElement("div")
        let polaroidInfoWrapper = document.createElement("div")
        //Saknas CoverIMG +  all text!
    }
}
class PostsOther extends PolaroidBase{
    //Skapar Tips elementen
    constructor(data){
        super(data);
        this.tips;
    }
    createPolaroidOther(){
        let tipsBoxWrapper = document.createElement("div")
        let tipsImgWrapper = document.createElement("div")
        let tipsInfoWrapper = document.createElement("div")
        //Saknas CoverIMG + all text!
    }
}
class PostsShow extends PolaroidBase{
    //Skapar element när man visar en post
    constructor(data){
        super(data);
        this.images = data.images;
    }
    createPostsShow(){
        let postsBoxWrapper = document.createElement("div")
        let postsImgWrapper = document.createElement("div")
        let postsGalleryWrapper = document.createElement("div")
        let postsInfpWrapper = document.createElement("div")
    }
}