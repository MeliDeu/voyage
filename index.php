<?php 

    error_reporting(-1);
    include "sections/header.php";

?>
    <div id="bgStart"></div>
    <div id="startWrapper">

        <!--nav på startsida-->
        <nav class="flexCenter startNav">
            <div id="logo">V</div>
            <div id="links">
                <a href="/" class="navAboutBtn">About</a>
                <button class="button navLoginBtn">Login/Join</button>
            </div>
        </nav>

        <!--titel på startsidan-->
        <div class="startTitle flexCenter">
            <h1>Collect your <span>travels</span> to inspire and be <span>inspired</span></h1>
        </div>

        <!--polaroidGrid-->
        <div id="startGrid"></div>

        <!--LOGGA IN-->
        <div id="loginModal">
            <form id="login" action="admin/login.php" method="POST">
                <h2 class="formTitle">Log in</h2>

                <?php if (isset($_GET["error"])) { ?>
                <p class="error">Oh no, invalid username or password, please try again!</p>
                <?php } ?>
                            
                <p class="formSmallTitle">Username</p>
                <input type="text" name="username" placeholder="Enter your username"><br>
                <p class="formSmallTitle">Password</p>
                <input type="password" name="password" placeholder="Enter your password"><br>
                <button type="submit">Log in</button>
            </form>

            <!--REGISTRERA-->
            <form id="register" action="home.php" method="POST">
                <h2 class="formTitle">Sign up</h2>
                <p id="errorRegister"></p>
                                
                <p class="formSmallTitle">Username</p>
                <input id="newUsername" type="text" name="username" placeholder="New username"><br>
                <p class="formSmallTitle">Email</p>
                <input id="newEmail" type="text" name="email" placeholder="Email address">
                <p class="formSmallTitle">Password</p>
                <input id="newPassword" type="password" name="password" placeholder="New password"><br>
                <p class="forSmallTitle">Intreseted in new travel friends</p>
                <p>Yes</p>
                <input id="travelStatus" type="checkbox" name="travelStatus">
                <button class="register" type="submit">Register</button>
            </form>
        </div>
    
    
    </div>

<?php
    include "sections/footer.php";
?>