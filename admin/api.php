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

// //göra en kopia av databasen om den har kommit hit så är det antingen GET, POST eller PATCH, så då kan vi bara kopiera över allt innehåll från databasen till en annan fil
// //göra en kopia av databasen om den har kommit hit så är det antingen GET, POST eller PATCH, så då kan vi bara kopiera över allt innehåll från databasen till en annan fil

// $backupFile = "backup/databaseBackup.json";

// //$json är själva datan från databasen
// $json = json_encode($database, JSON_PRETTY_PRINT);
// file_put_contents($backupFile, $json);
// echo json_encode($database);

// Denna kontroll sträcker sig över hela POST, PATCH, DELETE
//Kanske inte ska göra det, pga registrering sker här...
//if ($_SESSION[”loggedIn”]){


//-------------------------------------------- DELETE ------------------------------

if ($method === "DELETE") {
  

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

  
