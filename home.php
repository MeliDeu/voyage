<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Voyage</title>
        <link rel="stylesheet" href="../css/homeStyle.css">
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800;900&family=Dancing+Script:wght@700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet">
    </head>
    <body>
    <div id='homeBody'>

        <?php  
            include "sections/sidebar.php";
            include "admin/functions.php";
        ?>

        <div id='homeWrapper'>
            <div id='homeInnerWrapper'>

                <!-- kollar om användaren är inloggad -->
                <?php if ($_SESSION["IsLoggedIn"]){
                    $loggedIn = true;
                    // Om en user är klickad ska dens content synas
                    // parametern profile + userName måste fås vid klicket
                    if (isset($_GET["profile"])){
                        // $loggedInAs är nu användarnamnet på den klickade (tex. Mandy1)
                        $clickedUseId = $_GET["profile"];

                        //ska bara synas vid besök på en profil
                        include "sections/profileTop.php";

                        $db = getDatabase();

                        // Hämta och gå igenom users i DB för att hitta personens userId

                        $loggedInId = false;
                        foreach($db['users'] as $index => $user){
                            if($user['id'] == $clickedUseId){
                            // Id:t kan vi nu använda för att få fram den personens content
                                $loggedInId = $user['id'];
                                echo $user;
                            }
                            // Loopa postArray för att se vilka som har matchande creatorId med $loggedInId

                        }
                    } 
                ?> 

                    <!-- ska bara synas vid home deafault (inte countries eller profile) if !$_GET[profile]-->
                    <div id='homeSearchBox' class='searchBox'>
                        <input id='homeSearchField' placeholder=' Search country'>
                    </div>

                    <!-- olika innehåll beroende på om man är på home eller profil -->
                    <div id='homeCategoryBar' class='categoryBar'>
                        <div class='barTitle'>Travel categories</div>
                        <div class='barCategories'>
                            <div class='categoryBox'>
                                <div class='categoryIcon'></div>
                                <div class='categoryTitle'>Backpacking</div>
                            </div>
                        </div>
                    </div>
                
                    <div id='homefeedBox' class='feedBox'>
                        <div id='homeFeedInfo' class='feedInfo'>
                            <div id='homeFeedTitle' class='feedTitle'>Feed</div>
                            <div id='homeFeedView' class='feedView'>All Posts</div>
                        </div>

                        <div id='homeFeedGrid' class='feedGrid'>
                            <!-- test, ska byggas i js sen -->
                            <div class='polaroid'>
                                <div class='polaroidPic'></div>
                                <div class='polaroidBottom'>
                                    <div class='polaroidInfo'>
                                        <div class='polaroidUser'>
                                            <div class='polaroidUserPic'></div>
                                            <div class='polaroidUserName'>Jasmine_test</div>
                                        </div>
                                        <div class='polaroidText'>
                                            <div class='polaroidCountry'>Indonesia</div>
                                            <div class='polaroidTitle'>Min resa var bäst</div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class='polaroid'>
                                <div class='polaroidPic'></div>
                                <div class='polaroidBottom'>
                                    <div class='polaroidInfo'>
                                        <div class='polaroidUser'>
                                            <div class='polaroidUserPic'></div>
                                            <div class='polaroidUserName'>Jasmine_test</div>
                                        </div>
                                        <div class='polaroidText'>
                                            <div class='polaroidCountry'>Indonesia</div>
                                            <div class='polaroidTitle'>Min resa var bäst</div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                        </div> <!-- stänger homeFeedGrid-->
                    </div>
                <?php }?> <!-- stänger if ($_SESSION["IsLoggedIn"] -->
            </div>
        </div>
    </div>
            
        <script src='../js/classes.js'></script>
        <script src='../js/adminArrays.js'></script>
        <script src="../js/functions.js"></script>
        <script src="../js/requests.js"></script>
    </body>
</html>
