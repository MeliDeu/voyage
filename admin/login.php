<?php 

session_start();
$data = file_get_contents("../admin/db.json");
$database = json_decode($data, true);

if (isset($_POST["username"]) && isset($_POST["password"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];

    //Här loopar vi igenom alla användare som finns saparade och kollar om det stämmer överrens med det som användaren fyllt i formuläret
    foreach ($database["users"] as $user) {
        if ($user["username"] == $username && $user["password"] == $password) {
            $foundUser = $user;
        }
    }

    //Om användaren finns så skicka användaren till home sidan
    if ($foundUser !== null) {
        $_SESSION["userID"] = $foundUser["id"]; //ändrat till ID istället för användarnamn då det är mer användbart
        $_SESSION["username"] = $foundUser["username"]; //ändrat till ID istället för användarnamn då det är mer användbart
        $_SESSION["IsLoggedIn"] = true;
        header("Location: /home.php");
        exit();
    }
   
}
header("Location: ../index.php?error=1");
//http_response_code(405);
exit();
?>