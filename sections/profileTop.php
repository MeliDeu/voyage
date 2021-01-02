<?php
    $database = getDatabase(); //hämtar databasen

    $bio = false;
    $travelInterest = false;
    $top3Wishes = false;
    $top3Favs = false;

    foreach($database['users'] as $index => $user){
        if($user['id'] == $clickedUserId){ //$clickedUserId får sitt värde i home.php
            $username = $user['username'];
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

        <?php if ($travelInterest !== false){ ?>
            <div id='profileInterest'>
                <div id='interestIcon'></div>
                <div id='interestText'><?php echo "$username is interested in new travel friends";?></div>
            </div>
        <?php } ?>
    </div>
    </div>

    <div id='profileFavs'>

        <div id='topFavs'>
            <span>Top favs</span>
            <ul>
            <?php
            if ($top3Favs) {
                foreach($top3Favs as $index => $favs){
                    //Loopa igenom array med alla favs för att visa dessa som li element
                    echo "<li class='topFavsList'>$favs</li>";
                    echo "<input class='hide patchFavs'></input>";
                }
            }
            ?>
                
            </ul>
        </div>

        <div id='topWants'>
            <span>Top wants</span>
                <ul>
                <?php
                if ($top3Wishes) {
                    foreach($top3Wishes as $index => $favs){
                        //Loopa igenom array med alla favs för att visa dessa som li element
                        echo "<li class='topWishesList'>$favs</li>";
                        echo "<input class='hide patchWishes'></input>";
                    }
                }
                ?>
                </ul>
        </div>
    </div>

    <div id='profileSettings'></div>
    <button id='saveBio' class='hide'></button>
</div>
 
