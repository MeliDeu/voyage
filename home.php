<?php
    include "sections/header.php";

    //headers fungerar inte....
    if (isset($_SESSION["username"]) == false) {
        header("Location: ../index.php");
        exit();
    }
?>

    <div id='homeBody'>

        <?php  
            include "sections/sidebar.php";
            include "admin/functions.php";
        ?>
        <script> //detta hämtar den inloggades ID från PHP till js så att nyckeln mainUserID i STATE fungerar
            let mainUserID = <?php echo json_encode($_SESSION["userID"], JSON_HEX_TAG);?>;
            let profileParameter = "<?php echo isset($_GET["profile"]) ? $_GET["profile"] : "false";?>"; //av någon anledning behövde jag kaninöron utanför../kaj
            let countryParameter = "<?php echo isset($_GET["country"]) ? $_GET["country"] : "false";?>"; 
            let savedParameter = "<?php echo isset($_GET["saved"]) ? $_GET["saved"] : "false";?>"; 
        </script> 

        <div id='homeWrapper'>
            <div id='homeInnerWrapper'>

                <!-- kollar om användaren är inloggad -->
                <?php if ($_SESSION["isLoggedIn"]){
                    //$loggedIn = true; //detta använd ingenstans, ta bort?/kaj
                    // Om en user är klickad ska dens content synas
                    // parametern profile + userName måste fås vid klicket

                    if (isset($_GET["profile"])){ //innehåller id:et för användaren man klickat på, eller mainUserID om man har klickat på profilknappen i navven
                        $clickedUserId = $_GET["profile"]; //get id:et
                        //ska bara synas vid besök på en profil
                        include "sections/profileTop.php";
                        
                        if ($_GET["profile"] == $_SESSION["userID"]) { //detta innebär att man är på den inloggades profilsida
                            //här kan man då lägga in att man ska kunna redigera sin profil
                        }

                        //om id:et i GET inte är samma som den inloggades betyder det att vi visar en annan användares profil

                        //$clickedUseId = $_GET["profile"];
                        // en till if som kollar om , jämför detta id med den sessionuserID
                        // om det är samma -> redigerbar profil + spotunna


                        $db = getDatabase();
                        // Hämta och gå igenom users i DB för att hitta personens userId

                        $loggedInId = false;
                        foreach($db['users'] as $index => $user){
                            if($user['id'] == $clickedUserId){
                            // Id:t kan vi nu använda för att få fram den personens content
                                $loggedInId = $user['id'];
                            }
                            // Loopa postArray för att se vilka som har matchande creatorId med $loggedInId

                        }
                    } elseif (isset($_GET["country"])){ ?>
                        <!--här ska det som skiljer sig från profilsidan inkluderas, tex sökrutan-->
                        <!-- ska bara synas vid home deafault (inte countries eller profile) if !$_GET[profile]-->
                        
                        <div id='homeSearchBox' class='searchBox'>
                            <h3 id="countryTitle"><?php echo $_GET["country"] ?></h3>
                        </div>  

                    <?php } elseif (empty($_GET)) { ?>
                        <!--här ska det som skiljer sig från profilsidan inkluderas, tex sökrutan-->
                        <!-- ska bara synas vid home deafault (inte countries eller profile) if !$_GET[profile]-->
                        
                        <div id='homeSearchBox' class='searchBox'>
                            <input id='homeSearchField' placeholder=' Search'>
                            <button class='hide' id='searchButton'></button>
                        </div>  

                    <?php } ?> 



                    <!-- olika innehåll beroende på om man är på home eller profil -->
                    <div id='homeCategoryBar' class='categoryBar'>
                        <div class='barTitle'>
                            <?php if (isset($_GET["profile"])) { 
                                echo "Album";
                            } elseif (isset($_GET["saved"])) {
                                echo "Saved posts";
                            } else { 
                                echo "Travel categories";
                             } ?>
                        </div>
                        <div id="barCategories" class='barCategories'></div>
                    </div>
                
                    <div id='homefeedBox' class='feedBox'>
                        <div id='homeFeedInfo' class='feedInfo'>
                            <div id='homeFeedView' class='feedView'></div>
                            <div id='homeFeedTitle' class='feedTitle'></div>
                            
                        </div>

                        <div id='homeFeedGrid' class='feedGrid'></div>
                    </div>

                    <div id="newPostOverlay">
                        <?php include "sections/createNewPost.php"?>
                    </div>
                <?php }?> <!-- stänger if ($_SESSION["isLoggedIn"] -->
            </div>
        </div>
    </div>
            
        <script src='../js/classes.js'></script>
        <script src='../js/adminArrays.js'></script>
        <script src='../js/editProfile.js'></script>
        <script src='../js/searchBar.js'></script>
        <script src="../js/functions.js"></script>
        <script src="../js/requests.js"></script>
    </body>
</html>
