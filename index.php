<?php 

    error_reporting(-1);
    include "sections/header.php";

?>


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

<?php
    include "sections/footer.php";
?>