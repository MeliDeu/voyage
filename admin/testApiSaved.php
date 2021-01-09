<?php

session_start();

    $file = dirname(__FILE__) . "/db.json"; 

    function getDatabase() {
        global $file;
        $database = ["users" => [], "posts" => []];
    
        if (!file_exists($file)) {
            return $database;
        }
    
        $data = file_get_contents($file);
    
        if ($data === false) {
            return $database;
        }
    
        $json = json_decode($data, true);
    
        if ($json === null) {
            return $database;
        }
    
        return $json;
    }

// Hämta innehållet i DB och gör om det till php och lägg i $database
$database = getDatabase();

// Kolla vilken metod som använts
$method = $_SERVER["REQUEST_METHOD"];
// Säger att det endast är metoderna POST, GET, PATCH och DELETE som är godkända
if ($method !== "POST" && $method !== "GET" && $method !== "PATCH" && $method !== "DELETE" ){
    http_response_code(401);
    header("Content-Type: application/json");
    echo json_encode(["message" => "Ingen giltig metod"]);
    exit();
}

// Hämtar innehållet i php://input och lägger det i variabeln $json
$input = file_get_contents("php://input");
$json = json_decode($input, true);

//------------------------------------------------------

if ($method === 'POST'){

    // Om json innehåller nyckeln savedPost vet vi att det är post req som lägger till en saved post
    if (isset($json['savedPost'])){


        $contentType = $_SERVER["CONTENT_TYPE"];

        // Vi tillåter bara JSON (https://httpstatuses.com/400)
        if ($contentType !== "application/json") {
            http_response_code(400);
            header("Content-Type: application/json");
            echo json_encode(["message" => "Bad request 1"]);
            logIt("Fel contenttype", "ERROR");
            exit();
        }

        $postID = $json['postID'];
        $loggedInID = $_SESSION["userID"];
        

        // Hitta den inloggade usern för att kunna hitta rätt savedArray
        $rightUser = false;
        foreach($database["users"] as $index => $user){
            if ($user['id'] == $loggedInID) {

                foreach($user["savedPosts"] as $indexP => $post){
                    if ($post["postID"] == $postID){
                        http_response_code(400);
                        header("Content-Type: application/json");
                        $message = [
                            "error" => 'Post is already saved'
                        ];
                        echo json_encode($message);
                        exit();
                    }
                }

                $rightUser = $index;
            }
        }
        
        $saved = ['postID' => $postID];
        $senthis = $database['users'][$rightUser]['savedPosts'][] = $saved;
      

        $dataJSON = json_encode($database, JSON_PRETTY_PRINT);
        file_put_contents($file, $dataJSON);
        http_response_code(201);
        header("Content-Type: application/json");
        $message = [
            "data" => $database['users'][$rightUser]['savedPosts']
        ];
        echo json_encode($message);
        exit();
    }
    if (isset($_FILES['file'])) { //denna avser profilbild för tillfället och är inte i funktion ännu

        $currentProfilePic = false;
        $thisOne = false;
        //loopar igenom databasen för att spara den inloggades index samt den nuvarande profilbilden
        foreach($database["users"] as $index => $user){
            if ($user['id'] == $_POST['id']) {
                $thisOne = $index;
                $currentProfilePic = $user['profilePic'];
            }
        }
        
        //Tar bort den nuvarande profilbilden
        unlink($currentProfilePic);
        //Sparar filvägarna

        $folder = "../images/uploads/";
        $name = $_FILES['file']['name'];
        $tmp = $_FILES['file']['tmp_name'];
        $fileName = $folder . $name;

        //Kolla filstorlek på filen samt filändelse
        $size = $_FILES["file"]["size"]; //Sparar storleken på bilden
        $info = pathinfo($name); 
        $ext = $info["extension"]; //Sparar filens filändelse

        //Dessa filändelser kommer vi att acceptera
        $allowedExts = ["jpg", "jpeg", "png"];

        if ($size > 500000) { //KONTROLLERA FILSTORLEK! FIL FÅR EJ VARA MER 500KB
            http_response_code(400);
            header("Content-Type: application/json");
            $message = [
                "errors" => ["Max file size is 500kb"]
            ];
            echo json_encode($message);
            exit();
        }
        if (!in_array($ext, $allowedExts)) { //KONTROLLERA FILÄNDELSE! 
            http_response_code(400);
            header("Content-Type: application/json");
            $message = [
                "errors" => ["File format not supported. Supported file formats: jpg, jpeg and png"]
            ];
            echo json_encode($message);
            exit();
        }
        if (file_exists($fileName)) { //KONTROLLERA OM FILNAMN ÄR UPPTAGET! 
            http_response_code(400);
            header("Content-Type: application/json");
            $message = [
                "errors" => ["File name already exists"]
            ];
            echo json_encode($message);
            exit();
        }
        //Flyttar profilbilden till uploads
        move_uploaded_file($tmp, $folder . $name);

        //Byter ut profilbilden i databasen
        $newProfilePic = $database["users"][$thisOne]["profilePic"] = $fileName;
        $newData = $database["users"][$thisOne];

        //Sparar innehållet i databasen på nytt med den nya profilbilden
        $dataJSON = json_encode($database, JSON_PRETTY_PRINT);
        file_put_contents($file, $dataJSON);
        http_response_code(201);
        header("Content-Type: application/json");
        $message = [
            "data" => $newData
        ];
        echo json_encode($message);
        exit();
        }
        //NY ANVÄNDARE – kontrollera:
        // Innehåll i input (fås från login.php)
        // Skapa nytt ID
        // Skapa ett nytt object och pusha in i DB

        //kontroller för om fälten är tomma, har mellanrum och om användarnamn är upptaget
        if ($json["username"] === "" || $json["password"] === "" || $json["email"] === "") {
            http_response_code(400);
            header("Content-Type: application/json");
            echo json_encode(["errors" => "All fields must to be filled out"]);
            exit();
        }
        if (!isset($json["username"]) || !isset($json["password"]) || !isset($json["email"])) {
            http_response_code(400);
            header("Content-Type: application/json");
            echo json_encode(["errors" => "All fields must to be filled out)"]);
            exit();
        }
        if (preg_match('/\s/',$json["username"])) {
            http_response_code(400);
            header("Location: /index.php");
            echo json_encode(["errors" => "No spaces allowed in username"]);
            exit();
        }
        foreach ($database["users"] as $user => $value) {
            if ($value["username"] == $json["username"]) {
                http_response_code(400);
                header("Content-Type: application/json");
                echo json_encode(["errors" => "Username already exists"]);
                exit();
            }
        }

        //skapar ett ID för användaren
        $highestID = 0;
        //Letar efter det högsta existerande ID:et 
        foreach ($database["users"] as $user) {
            if ($user["id"] > $highestID) {
                $highestID = $user["id"];
            }
        }
        // Lägg till det nya ID:et 
        $okId = $highestID + 1;

        //skapar ett objekt med användarens info som ska in i databasen
        $user = ["id" => $okId, 
                "username" => $json["username"], 
                "password" => $json["password"], 
                "email" => $json["email"], 
                "travelStatus" => $json["travelStatus"], 
                "profilePic" => false, 
                "bio" => false, 
                "top3Wishes" => false, 
                "top3Favs" => false,
                "savedPosts" => [], //sparade postIDs
                "album" => [] //sparade album som har sina egna nycklar, som albumNamn, ID, bild
            ];

        //lägger till user-objektet i databasen        
        $database["users"][] = $user;

        $dataJSON = json_encode($database, JSON_PRETTY_PRINT);
        file_put_contents($file, $dataJSON);
        http_response_code(201);
        header("Location: /home.php");
        $message = [
            "data" => $user
        ];
        echo json_encode($message);
        exit();

}

if ($method === "PATCH") {

    // ÄNDRA PROFIL(bio, top3wishes, top3favs)

    $thisOne = false;

    foreach($database["users"] as $index => $user){
        if ($user['id'] == $json['id']) {
            $thisOne = $index;
        }
    }

    //Sparar den nya informationen i databasen
    $newDataBio = $database["users"][$thisOne]["bio"] = $json["bio"];
    $newWhises = $database["users"][$thisOne]["top3Wishes"] = $json["top3Wishes"];
    $newFavs = $database["users"][$thisOne]["top3Favs"] = $json["top3Favs"];
    

    $newData = $database["users"][$thisOne];
    

    $dataJSON = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents($file, $dataJSON);
    http_response_code(201);
    header("Content-Type: application/json");
    $message = [
        "data" => $newData
    ];
    echo json_encode($message);
    exit();

 

}


?>