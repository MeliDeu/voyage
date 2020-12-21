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

<?php
    include "sections/footer.php";
?>