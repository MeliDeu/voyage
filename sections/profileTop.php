<?php
    $username = $_SESSION["username"];

    $file = "admin/db.json";  //detta gör vi typ likadant i alla filer just nu så borde skapa en funktion som vi kallar på som hämtar databasen
    $database = [];
    if (file_exists($file)) {
        $data = file_get_contents($file);
        $database = json_decode($data, true);
    }
    $loggedInId = false;
    $bio = false;
    $travelInterest = false;
    $top3Wishes = false;
    $top3Favs = false;
    foreach($database['users'] as $index => $user){
        if($user['id'] == $clickedUserId){
            // Id:t kan vi nu använda för att få fram den personens content
            $loggedInId = $user['id'];
            $bio = $user['bio'];
            $travelInterest = $user['travelStatus'];
            $top3Wishes = $user['top3Wishes'];
            $top3Favs = $user['top3Favs'];
        }
    }
?>
<div id='profileContainer'>

<div id='profileBox'>

        <div id='profilePic'></div>
        <div id='profileInfo'>
            <div id='profileName'><?php echo $username; ?></div>
            <div id='profileBio'><?php echo $bio; ?></div>
            <textarea name="patchBio" id="patchBio" class="hide" cols="50" rows="4"></textarea>
            <div id='profileInterest'>
                <div id='interestIcon'></div>
                <div id='interestText'><?php echo $username;
                    if ($travelInterest !== false){
                        echo " is interested in new travel friends";
                    }
                    else{
                        echo "is not interested in new travel friends";
                    }
                 ?></div>
            </div>
        </div>
    </div>

    <div id='profileFavs'>

        <div id='topFavs'>
            <span>Top favs</span>
            <ul>
            <?php
            foreach($top3Favs as $index => $favs){
                //Loopa igenom array med alla favs för att visa dessa som li element
                echo "<li class='topFavsList'>$favs</li>";
            }
            ?>
                
            </ul>
        </div>

        <div id='topWants'>
            <span>Top wants</span>
                <ul>
                <?php
                foreach($top3Wishes as $index => $favs){
                    //Loopa igenom array med alla favs för att visa dessa som li element
                    echo "<li class='topFavsList'>$favs</li>";
                }
                ?>
                </ul>
        </div>
    </div>

    <div id='profileSettings'></div>
</div>
 
