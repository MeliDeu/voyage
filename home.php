<?php
    session_start();
    
    if (!isset($_SESSION["username"])) {
        header("Location: index.php");
        //var_dump($_SESSION['username']);
        exit();
    }
    include "sections/header.php";
?>

    <div id='homeBody'>

        <?php  
            include "sections/sidebar.php";
            include "admin/functions.php";
        ?>
        <script> 
            let mainUserID = <?php echo json_encode($_SESSION["userID"], JSON_HEX_TAG);?>; //detta hämtar den inloggades ID från PHP till js så att nyckeln mainUserID i STATE fungerar
            let profileParameter = "<?php echo isset($_GET["profile"]) ? $_GET["profile"] : "false";?>"; //om profil parameter i url existerar blir värdet id:et, annars false
            let countryParameter = "<?php echo isset($_GET["country"]) ? $_GET["country"] : "false";?>"; 
            let savedParameter = "<?php echo isset($_GET["saved"]) ? $_GET["saved"] : "false";?>"; 
        </script> 

        <div id='homeWrapper'>
            <div id='homeInnerWrapper'>

                <!-- kollar om användaren är inloggad -->
                <?php if ($_SESSION["isLoggedIn"]){

                    // vad som endast ska synas vid besök på en profil
                    if (isset($_GET["profile"])){ //innehåller id:et för användaren man klickat på, eller mainUserID om man har klickat på profilknappen i navven
                        $clickedUserId = $_GET["profile"]; //get id:et
                        include "sections/profileTop.php"; //profiltop med användaresn beskrivning osv
                        

                    } elseif (isset($_GET["country"])){ ?>  <!--vad som endast ska synas vid besök på en profil-->
                        
                        <div id='homeSearchBox' class='searchBox'>
                            <h3 id="countryTitle"><?php echo $_GET["country"] ?></h3> <!--skriver ut landnamnet överst på sidan (istället för sökruta)-->
                        </div>  

                    <?php } elseif (empty($_GET)) { ?> <!--vad som endast ska synas när man är på home och det ej finns get parametrar-->
                        
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
                    <div id="showPost"></div>
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
