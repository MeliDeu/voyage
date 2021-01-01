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
        <script> //detta hämtar den inloggades ID från PHP till js så att nyckeln mainUserID i STATE fungerar
            let mainUserID = <?php echo json_encode($_SESSION["userID"], JSON_HEX_TAG);?>;
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
                        include "sections/profileTop.php"; //denna måste justeras i dens fil för just nu hämtar den bara den inloggades info /kaj
                        
                        if ($_GET["profile"] == $_SESSION["userID"]) { //detta innebär att man har klickat på profilikonen i navven
                            //echo '<script type="text/javascript"> loadPosts(STATE.mainUserPosts); </script>'; //försök till att ladda upp alla posts som tillhör inloggade användaren i feeden på profilsidan
                            //här kan man då också lägga in att man ska kunna redigera sin profil
                        }

                        //om id:et i GET inte är samma som den inloggades betyder det att vi visar en annan användares profil
                        //echo "<script type='text/javascript'> loadPosts(STATE.allPosts, {$clickedUserId}, 'creatorID'); </script>"; //ett försök 

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
                    } else {
                        //kalla på loadPosts(allPosts), om det inte finns en get parameter pga att det betyder att man har klickat på home i navven
                        //echo "<script type='text/javascript'> loadPosts(STATE.allPosts); </script>"; //enligt google ska man kunna kalla på js-function såhär i php men fungerar inte just nu /kaj
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

                        <div id='homeFeedGrid' class='feedGrid'></div>
                    </div>
                <?php }?> <!-- stänger if ($_SESSION["isLoggedIn"] -->
            </div>
        </div>
    </div>
            
        <script src='../js/classes.js'></script>
        <script src='../js/adminArrays.js'></script>
        <script src="../js/functions.js"></script>
        <script src="../js/requests.js"></script>
    </body>
</html>
