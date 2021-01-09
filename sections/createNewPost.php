<form hidden id="hiddenForm">
    <input id="hiddenInput" name="postImageFile" type="file">
    <!-- <button type="submit" value="uploadImg" id="hiddenButton"></button> -->
</form>
<div id="newPostWrapper">
    <div id="postClose">
        <p class="closeOverlay">X</p>
    </div>
    <div id="newPostContainer">
        <div id="newPostPictures">
            <div class="newPostUp">New post</div>
            <div id="newPostBigPicture" class="newPostMiddle">
                <img src="../images/stockimages/icons/trash.png" class="imgTrash">
            </div>
            <div id="newPostPics" class="newPostDown">
                <div id="picPreview"></div>
                <div id="pic_" class="nyPic"></div>
            </div>
        </div>
        <div id="newPostDesc">
            <form id="postInformation" action="">
                <input type="file" id="coverImageInput" hidden name="coverImg">
                <div class="newPostUp"></div>
                <div id="newPostContent" class="newPostMiddle">
                    <div id="countryAndCategory">
                        <div id="postCountry">
                            <label for="postCountrySelect">Select country*</label>
                            <select name="country" id="postCountrySelect">
                                <!-- options for all the available countries  -->
                            </select>
                        </div>
                        <div id="postCategory">
                            <label for="postCategorySelect">Select travel category*</label>
                            <select name="categoryID" id="postCategorySelect">
                                <!-- options for all the available categories  -->
                            </select>
                        </div>
                    </div>
                    <div id="postTitle">
                        <label for="postRubrik">Title*</label>
                        <input type="text" placeholder="Title" name="title" id="postRubrik">
                    </div>
                    <div id="postAlbum">
                        <label for="postAlbumSelect">Select album</label>
                        <select name="albumID" id="postAlbumSelect">
                            <!-- options for all the available albums -->
                        </select>
                    </div>
                    <div id="postDesc">
                        <label for="postDescription">Share something about your journey*</label>
                        <textarea name="description" id="postDescription" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div class="newPostDown">
                    <button type="submit" name="postToDB" id="newPostSubmit">post</button>
                </div>
            </form>
            
        </div>
    </div>
</div>
<script src="../js/uploadScript.js"></script>