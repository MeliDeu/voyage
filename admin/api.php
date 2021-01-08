

<?php
//session_start();
include "functions.php";



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

//-------------------------------------------- GET ------------------------------

// Om metoden är GET och om användaren är inloggad
if ($method === "GET") {

    //DEFAULT(utan att vara inloggad): 
    //Alla posts (med ett max-antal?) 

    //Var tvungen att släcka denna del, till rad 68 för att GET skulle fungera och ge databasen som svar till requesten i request.js som fyller på allt i STATE
    /*if ($_SESSION["isLoggedIn"]){

        // Om parametern country skickas med (om anv sorterar på land)
        if (isset($_GET["country"])){

        }
        // Om parametern country skickas med (om anv sorterar på land)
        if (isset($_GET["user"])){
            
        }
        // Om parametern country skickas med (om anv sorterar på land)
        if (isset($_GET["travelCategory"])){
            
        }
        // Om parametern country skickas med (om anv sorterar på land)
        if (isset($_GET["album"])){
            
        }
        // Om parametern country skickas med (om anv sorterar på land)
        if (isset($_GET["search"])){
            // $search är det ord som anv har sökt på som param innehåller
            $search = $_GET["search"];  
        }

        //behövs verkligen ovan ifs för country, user, travelCategory, album och search?
        //vid GET-req från requests.js svarar vi med hela databasen och lägger in alla posts i STATE,
        //så sortering på tex country är ju något vi ställer in i home.php om det finns en get-parameter /kaj

        // GET by default om någon är inloggad - skicka tillbaka alla post
        http_response_code(200);
        header("Content-Type: application/json");
        // Skicka med hela DB
        $message = ["data" => $database];
        echo json_encode($message);
        exit();
    }*/

    http_response_code(200);
    //header("Content-Type: application/json");
    // Skicka med hela DB
    $message = ["data" => $database];
    echo json_encode($message);
    exit();
}

// Denna kontroll sträcker sig över hela POST, PATCH, DELETE
//Kanske inte ska göra det, pga registrering sker här...
//if ($_SESSION[”loggedIn”]){
//-------------------------------------------- POST ------------------------------

if ($method === "POST") {

    if (isset($_FILES['file'])) {

        $currentUser = false;
        $thisOne = false;

        foreach($database["users"] as $index => $user){
            if ($user['id'] == $json['id']) {
                $currentUser = $user;
                $thisOne = $index;
            }
        }

        $folder = "uploads/";
        $name = $_FILES['file']['name'];
        $tmp = $_FILES['file']['tmp_name'];
        $fileName = $folder . $name;

        //Kolla filstorlek på filen samt filändelse
        $size = $_FILES["file"]["size"]; //Sparar storleken på bilden
        $info = pathinfo($name); 
        $ext = $info["extension"]; //Sparar filens filändelse

        $allowedExts = ["jpg", "jpeg", "png"];

        if ($size > 500000) { //KONTROLLERA FILSTORLEK! FIL FÅR EJ VARA MER 500KB
            http_response_code(400);
            //header("Content-Type: application/json");
            $message = [
                "errors" => ["Max file size is 500kb"]
            ];
            echo json_encode($message);
            exit();
        }
        /*if (!in_array($ext, $allowedExts)) { //KONTROLLERA FILÄNDELSE! 
            http_response_code(400);
            //header("Content-Type: application/json");
            $message = [
                "errors" => ["File format not supported. Supported file formats: jpg, jpeg and png"]
            ];
            echo json_encode($message);
            exit();
        }*/
        if (file_exists($fileName)) { //KONTROLLERA OM FILNAMN ÄR UPPTAGET! 
            http_response_code(400);
            //header("Content-Type: application/json");
            $message = [
                "errors" => ["File name already exists"]
            ];
            echo json_encode($message);
            exit();
        }
        move_uploaded_file($tmp, $folder . $name);

        $newProfilePic = $database["profilePic"][$thisOne]["profilePic"] = $fileName;

        $dataJSON = json_encode($database, JSON_PRETTY_PRINT);
        file_put_contents($file, $dataJSON);
        http_response_code(201);
        //header("Content-Type: application/json");
        $message = [
            "data" => $newData
        ];
        echo json_encode($message);
        //var_dump($message);
        exit();
        }

    // NY ANVÄNDARE – kontrollera:
        // Innehåll i input (fås från login.php)
        // Skapa nytt ID
        // Skapa ett nytt object och pusha in i DB

            if ($json["username"] === "" || $json["password"] === "" || $json["email"] === "") {
                http_response_code(400);
                //header("Content-Type: application/json");
                echo json_encode(["errors" => "All fields must to be filled out"]);
                exit();
            }
            if (!isset($json["username"]) || !isset($json["password"]) || !isset($json["email"])) {
                http_response_code(400);
                //header("Content-Type: application/json");
                echo json_encode(["errors" => "All fields must to be filled out)"]);
                exit();
            }
            if (preg_match('/\s/',$json["username"])) {
                http_response_code(400);
                //header("Location: /index.php");
                echo json_encode(["errors" => "No spaces allowed in username"]);
                exit();
            }
            foreach ($database["users"] as $user => $value) {
                if ($value["username"] == $json["username"]) {
                    http_response_code(400);
                    //header("Content-Type: application/json");
                    echo json_encode(["errors" => "Username already exists"]);
                    exit();
                }
            }
            $highestID = 0;
            //Letar efter det högsta existerande ID:et 
            foreach ($database["users"] as $user) {
                if ($user["id"] > $highestID) {
                    $highestID = $user["id"];
                }
            }
            // Lägg till det nya ID:et 
            $okId = $highestID + 1;

            $username = $json["username"];

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


            //$user = ["id" => $okId, "username" => $username];
            $database["users"][] = $user;

            $dataJSON = json_encode($database, JSON_PRETTY_PRINT);
            file_put_contents($file, $dataJSON);
            http_response_code(201);
            //header("Location: /home.php");
            $message = [
                "data" => $user
            ];
            echo json_encode($message);
            //var_dump($message);
            exit();


        //}

    // NY PROFLBILD
        // kommer….

    // NY POST – kontrollera:
        // Bildstorlek
        // Filtyp
        // Innehåll i input
        // Content-type
        // Textlängd
        // Skapa nytt object med ovanstående + annat från inputs (tex. Country)
        // Pusha in i DB
        
    // NYTT ALBUM – kontrollera:
        // kommer….

    // NY SAVED – kontrollera:
        // kolla om post har en param som heter saved (isset osv ) isf gör nedan
        // postID (fås från klickad post)
        // Lägg i ny array och spara på user i DB

    

}

//-------------------------------------------- PATCH ------------------------------

if ($method === "PATCH") {

    // ÄNDRA PROFIL(bio, top3wishes, top3favs)

    $currentUser = false;
    $thisOne = false;

    foreach($database["users"] as $index => $user){
        if ($user['id'] == $json['id']) {
            $currentUser = $user;
            $thisOne = $index;
        }
    }
    //PROFILBILD
    //Skickar feedback till användaren om de ej fyllt i alla fält
    /*if ($_FILES["file"]["error"] !== 0) {
        //Om file error inte är 0, så har något gått snett
        http_response_code(400);
        //header("Content-Type: application/json");
        $message = [
            "errors" => ["All fields must to be filled out"]
        ];
        echo json_encode($message);
        exit();
        //Använder nycklarna data och errors för att berätta för användaren om något gått snett eller ok, skickar det som message till användaren
    }*/

    

    //Sparar den nya informationen i databasen
    $newDataBio = $database["users"][$thisOne]["bio"] = $json["bio"];
    $newWhises = $database["users"][$thisOne]["top3Wishes"] = $json["top3Wishes"];
    $newFavs = $database["users"][$thisOne]["top3Favs"] = $json["top3Favs"];
    

    $newData = $database["users"][$thisOne];
    

    $dataJSON = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents($file, $dataJSON);
    http_response_code(201);
    //header("Content-Type: application/json");
    $message = [
        "data" => $newData
    ];
    echo json_encode($message);
    //var_dump($message);
    exit();

    // ÄNDRA PROFILBILD(kommer...)
    //$_PATCH[”changeAvatar”] (changeAvatar?=id) 
 

}


//-------------------------------------------- DELETE ------------------------------

if ($method === "DELETE") {
  
    // TA BORT EN ANVÄNDARE – kontrollera:
    // userID (fås från bekräftad avregistrering?)
    // Loopa users och jämför userID
    // Ta bort från DB

    // TA BORT EN POST
    // postID (fås från klickad post)
    // Loopa posts för att hitta postID, kolla vad creatorID är och jämför detta med userID i users
    // Ta bort från DB
    // Skicka tillbaka ny uppdaterad array/skicka tillbaka borttaget ID så att elementet med det ID tas bort

    // TA BORT EN FAVORIT
    // postID (fås från klickad post)
    // Jamför med users med $_SESSION[”userID”] och sedan dennes favs
    // Ta bort från DB
    // Skicka tillbaka ny uppdaterad array/skicka tillbaka borttaget ID så att elementet med det ID tas bort
    
    // TA BORT ETT ALBUM – kontrollera:
    // om ingen post finns -> tas bort

}

//} // Denna stänger if session loggedin


//Annat:
// Kontrollera contenttype,  tillåtna filtyper osv
// ! OBS !  Begränsa resultat från API (posts) till MAX 20 st? View more…
// ! OBS !  Spara en kopia av gamla DB  
?>

  
