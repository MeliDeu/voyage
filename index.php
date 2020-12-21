<?php error_reporting(-1);?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800;900&family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>
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
    
    
</body>
</html>