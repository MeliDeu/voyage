<?php
    $username = $_SESSION["username"];
?>
<div id='profileContainer'>

<div id='profileBox'>

        <div id='profilePic'></div>
        <div id='profileInfo'>
            <div id='profileName'><?php echo $username; ?></div>
            <div id='profileBio'>Hejsan hoppsan här kommer en kort presentation om vem jag är typ</div>
            <div id='profileInterest'>
                <div id='interestIcon'></div>
                <div id='interestText'><?php echo $username; ?> is interested in new travel friends</div>
            </div>
        </div>
    </div>

    <div id='profileFavs'>

        <div id='topFavs'>
            <span>Top favs</span>
            <ul>
                <li>Indonesia</li>
                <li>Australia</li>
                <li>Scotland</li>
            </ul>
        </div>

        <div id='topWants'>
            <span>Top wants</span>
                <ul>
                    <li>Canada</li>
                    <li>Iceland</li>
                    <li>Italy</li>
                </ul>
        </div>
    </div>

    <div id='profileSettings'></div>
</div>

