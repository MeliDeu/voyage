<?php 
    //Här ska vi hämta den inloggade användarens ID för att kunna sätta det som en variabel i nedan länkar
    $userID = 1;
?>
<div id='sideBar'>
    <div id="sideBarLogo" class="logo">V</div>
    <div id=sideBarNav>
        <a class='icon active' href='../home.php'><div id="home"></div></a>
        <div class='icon'><div id="countries"></div></div> <!--vid klick ska ett sidoblock öppnas med länder som finns, iconen behöver ej vara länk bara display block på sidoblocket-->
        <a class='icon' href='<?php echo "../home.php?profile=$userID";?>'><div id="profile"></div></a> <!--vid klick kollas get-parameter i home.php och inkluderar då profileTop samt byter till albumcirklar-->
        <div class='icon'><div id="add"></div></div> <!--vid klick ska modalfönster öppnas, behöver ej vara länk, bara display block på elementet-->
        <a class='icon' href='<?php echo "../home.php?saved=$userID";?>'><div id="saved"></div></a> <!--vid klick kollas get-parameter i home.php och exkluderar då allt förutom polaroidfeed där användarens sparade visas-->
        <a class='icon' class=navLink href='../admin/logout.php' class='logout'><div id="logout"></div></a>
    </div>
</div>