<!-- hiddenform används för att ladda upp bilden  -->
<form id="hiddenForm">
    <input id="hiddenInput" name="postImageFile" type="file">
    <button type="submit" id="hiddenButton"></button>
</form>
<div id="newPostWrapper">
    <div id="postClose">
        <p class="closeOverlay">+</p>
    </div>
    <div id="newPostContainer">
        <div id="newPostPictures">
            <div class="newPostUp">New post</div>
            <div id="newPostBigPicture" class="newPostMiddle">
                <img src="assets/trash.png" class="imgTrash">
            </div>
            <div id="newPostPics" class="newPostDown">
                <div id="pic_1" class="nyPic">
                    <img src="assets/trash.png" class="imgTrash">
                </div>
                <div id="pic_2" class="nyPic">
                    <img src="assets/trash.png" class="imgTrash">
                </div>
                <div id="pic_3" class="nyPic">
                    <img src="assets/trash.png" class="imgTrash">
                </div>
                <div id="pic_4" class="nyPic">
                    <img src="assets/trash.png" class="imgTrash">
                </div>
                <div id="pic_5" class="nyPic">
                    <img src="assets/trash.png" class="imgTrash">
                </div>
            </div>
        </div>
        <div id="newPostDesc">
            <form id="postInformation" action="">
                <div class="newPostUp"></div>
                <div id="newPostContent" class="newPostMiddle">
                    <div id="countryAndCategory">
                        <div id="postCountry">
                            <label for="postCountrySelect">Select country</label>
                            <select name="" id="postCountrySelect">
                                <!-- options for all the available countries  -->
                            </select>
                        </div>
                        <div id="postCategory">
                            <label for="postCategorySelect">Select travel category</label>
                            <select name="category" id="postCategorySelect">
                                <!-- options for all the available categories  -->
                            </select>
                        </div>
                    </div>
                    <div id="postTitle">
                        <label for="postRubrik">Title</label>
                        <input type="text" placeholder="Title" name="title" id="postRubrik">
                    </div>
                    <div id="postAlbum">
                        <label for="postAlbumSelect">Select album</label>
                        <select name="album" id="postAlbumSelect">
                            <!-- options for all the available albums -->
                        </select>
                    </div>
                    <div id="postDesc">
                        <label for="postDescription">Share something about your journey</label>
                        <textarea name="postDescription" id="postDescription" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div class="newPostDown">
                    <button type="submit" id="newPostSubmit">post</button>
                </div>
            </form>
            
        </div>
    </div>
</div>
<script src=""></script>
<script src="../js/requests.js"></script>
<script src="../js/uploadScript.js"></script>

