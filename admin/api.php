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

//problem med detta: den funkar för uploadPost.php men inte för api.php, sätter man den här så utförs den inte utan ett felmeddelande dyker upp: jsonparse non-whitespace character... JSON.parse: unexpected non-whitespace character after JSON data at line 1 column 11293 of the JSON data, 
//ingen funktion utförs därefter men en backup av DB görs, sätter man det efter get, samma sak där bara att man inte heller får någon backup-file
//felet var att jag echoade både här och sen ännu en gång vid utförd

//göra en kopia av databasen om den har kommit hit så är det antingen GET, POST eller PATCH, så då kan vi bara kopiera över allt innehåll från databasen till en annan fil
//göra en kopia av databasen om den har kommit hit så är det antingen GET, POST eller PATCH, så då kan vi bara kopiera över allt innehåll från databasen till en annan fil

// $backupFile = "backup/databaseBackup.json";

// //$json är själva datan från databasen
// $json = json_encode($database, JSON_PRETTY_PRINT);
// file_put_contents($backupFile, $json);


// Hämtar innehållet i php://input och lägger det i variabeln $json
$input = file_get_contents("php://input");
$json = json_decode($input, true);




//-------------------------------------------- GET (get används i requests.js i window.onload där STATE fylls på genom att man får tillbaka hela databasen) ------------------------------

// Om metoden är GET
if ($method === "GET") {

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

    $backupFile = "backup/databaseBackup.json";

    //$json är själva datan från databasen
    $json = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents($backupFile, $json);

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
            //header("Content-Type: application/json");
            $message = [
                "errors" => ["Max file size is 500kb"]
            ];
            echo json_encode($message);
            exit();
        }
        if (!in_array($ext, $allowedExts)) { //KONTROLLERA FILÄNDELSE! 
            http_response_code(400);
            //header("Content-Type: application/json");
            $message = [
                "errors" => ["File format not supported. Supported file formats: jpg, jpeg and png"]
            ];
            echo json_encode($message);
            exit();
        }
        if (file_exists($fileName)) { //KONTROLLERA OM FILNAMN ÄR UPPTAGET! 
            http_response_code(400);
            //header("Content-Type: application/json");
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
        //header("Content-Type: application/json");
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
            //header("Location: /home.php");
            $message = [
                "data" => $user
            ];
            echo json_encode($message);
            exit();


        //}


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
}

//-------------------------------------------- PATCH ------------------------------

if ($method === "PATCH") {
    $backupFile = "backup/databaseBackup.json";

    //$json är själva datan från databasen
    $json = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents($backupFile, $json);

    // ÄNDRA PROFIL(bio, top3wishes, top3favs)

    $thisOne = false;

    foreach($database["users"] as $index => $user){
        if ($user['id'] == $json['id']) {
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
    $backupFile = "backup/databaseBackup.json";

    //$json är själva datan från databasen
    $json = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents($backupFile, $json);

    // TA BORT EN POST (borde även ta bort album om album endast har denna post i sig)
    // postID (fås från klickad post)
    // Loopa posts för att hitta postID, kolla vad creatorID är och jämför detta med userID i users
    // Ta bort från DB
    // Skicka tillbaka ny uppdaterad array/skicka tillbaka borttaget ID så att elementet med det ID tas bort
    foreach ($database["posts"] as $index => $post) {
        if ($post["postID"] == $json["postID"]) {

            foreach ($database["users"] as $i => $currentUser) { //kollar igenom alla användares savedPosts och tar bort post:idet som ligger i den arrayen om den matchar med posten som tagits bort
                foreach ($currentUser["savedPosts"] as $ind => $p) {
                    if ($p["postID"] == $post["postID"]) {
                        array_splice($database["users"][$i]["savedPosts"], $ind, 1);
                    }
                }
            }

            //tar bort posten från databasen
            array_splice($database["posts"], $index, 1);

            $pathToImg = $post["coverImg"]; //bildens namn
            unlink($pathToImg);

            //när vi har fler bilder i images:
            /*foreach ($post["images"] as $indexImg => $img) {
                $path = $img["img"]; //images borde vara en array som består av bilder som har en nyckel som är "img": "länk till bild"
                unlink($path);
            }*/

            // DENNA DEL TAR BORT LANDET FRÅN SIDEBAR NÄR INGEN POST HAR LANDET LÄNGRE
            if( array_search($post["country"], array_column($database["posts"], "country")) !== false){
                // Det finns en annan post i databasen med det landet så gör inget med countriesArray!
            } else {
                // Det finns ingen annan post i databasen med det landet så nu ska vi splicea
                // bort landet från countriesArray så det landet inte syns i sidebar

                // Loopa countriesArray för att hitta landet
                foreach ($database["countriesArray"] as $thisIndex => $thisCountry){
                    // Detta är landet som ska deletas
                    $countryFromDelete = $post["country"];
                    // Kollar om den som ska deletas är samma som ett land för en post som finns i arrayen
                    if ($thisCountry["name"] == $countryFromDelete){
                        // splicea det ovject som har name = country
                        array_splice($database["countriesArray"], $thisIndex, 1);
                    }
                } 
            }
            

        }
    }

    file_put_contents($file, json_encode($database, JSON_PRETTY_PRINT));
    http_response_code(200); //svara att borttagningen gått igenom 
    //header("Content-Type: application/json");
    $message = [
        "data" => "Post was removed successfully"
    ];
    echo json_encode($message);
    exit();


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

  
