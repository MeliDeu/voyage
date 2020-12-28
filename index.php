<?php 

    error_reporting(-1);
    include "sections/header.php";

?>
    <div id="bgStart"></div>
    <div id="startWrapper">

        <!--Startsida overlay-->
        <div id="bgDark"></div>
        <div id="startModalWrapper">
            <div id="close">x</div>
            <div id="loginModal">

                <ul class="tabMenu">
                    <li class="tab active"><p id="modalLoginBtn">Login</p></li>
                    <li class="tab"><p id="modalJoinBtn">Join</a></li>
                </ul>

                <h1>Welcome to <span>Voyage</span></h1>

                <div class="tabContent">

                    <!--LOGGA IN-->
                    <div id="login">

                        <form id="login" action="admin/login.php" method="POST">          
                            <p class="formInputTitle">Username
                                <input type="text" name="username" placeholder="Username">
                            </p>
                            <p class="formInputTitle">Password
                                <input type="password" name="password" placeholder="Password">
                            </p>

                            <?php if (isset($_GET["error"])) { ?>
                                <script>
                                    document.getElementById("bgDark").style.display = "block";
                                    document.getElementById("startModalWrapper").style.display = "flex";
                                    document.getElementById("loginModal").style.display = "flex";
                                    document.getElementById("close").style.display = "block";
                                </script>
                            <p class="error">Oh no, incorrect username or password. Please try again.</p>
                            <?php } ?>

                            <button type="submit">Login</button>
                        </form>

                    </div>

                    <!--REGISTRERA-->
                    <div id="join">
                        <form id="register" action="/home.php" method="POST">
                            <p id="errorRegister" class="error"></p>
                                            
                            <p class="formInputTitle">Username</p>
                            <input id="newUsername" type="text" name="username" placeholder="New username"><br>
                            <p class="formInputTitle">Email</p>
                            <input id="newEmail" type="text" name="email" placeholder="Email address">
                            <p class="formInputTitle">Password</p>
                            <input id="newPassword" type="password" name="password" placeholder="New password"><br>
                            <p class="formInputTitle">I'm intreseted in new travel friends</p>

                            <label class="switch">
                                <input id="travelStatus" type="checkbox" name="travelStatus">
                                <span class="slider round"></span>
                            </label>

                            <!--<input id="travelStatus" type="checkbox" name="travelStatus"><span class="formInputTitle">Yes</span><br>-->
                            <button class="register" type="submit">Bon voyage!</button>
                        </form>
                    </div>

                </div>

            </div>
        </div>

        <!--nav på startsida-->
        <nav class="flexCenter startNav">
            <div id="logo">V</div>
            <div id="links">
                <a href="/" class="navAboutBtn">About</a>
                <button id="navLoginBtn">Login/Join</button>
            </div>
        </nav>

        <!--titel på startsidan-->
        <div class="startTitle flexCenter">
            <h1>Collect your <span>travels</span> to inspire and be <span>inspired</span></h1>
        </div>

        <!--polaroidGrid-->
        <div id="startGrid"></div>
    
        <footer></footer>
    </div>


<?php
    include "sections/footer.php";
?>