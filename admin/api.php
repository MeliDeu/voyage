

<?php   
session_start();

// Hämta innehållet i DB och gör om det till php och lägg i $database
$file = "db.json";
$database = [];
if (file_exists($file)) {
  $data = file_get_contents($file);
  // Gör om database till PHP
  $database = json_decode($data, true);
}

// Kolla vilken metod som använts
$method = $_SERVER['REQUEST_METHOD'];
// Säger att det endast är metoderna POST, GET, PATCH och DELETE som är godkända
if ( $method !== "POST" && $method !== "GET" && $method !== "PATCH" && $method !== "DELETE" ) {
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

    if ($_SESSION[”loggedIn”]){

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

        // GET by default om någon är inloggad - skicka tillbaka alla post
        http_response_code(200);
        header("Content-Type: application/json");
        // Skicka med hela DB
        $message = ["data" => $database];
        echo json_encode($message);
        exit();
    }
}

// Denna kontroll sträcker sig över hela POST, PATCH, DELETE
if ($_SESSION[”loggedIn”]){
//-------------------------------------------- POST ------------------------------

if ($method === "POST") {

    // NY ANVÄNDARE – kontrollera:
        // Innehåll i input (fås från login.php)
        // Skapa nytt ID
        // Skapa ett nytt object och pusha in i DB

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
        // postID (fås från klickad post)
        // Lägg i ny array och spara på user i DB

}

//-------------------------------------------- PATCH ------------------------------

if ($method === "PATCH") {
  
    // ÄNDRA EN EGEN POST(country, title, description)
    // $_PATCH[”changePost”] (changePost?=param) 

    // ÄNDRA PROFIL(bio, top3wishes, top3favs)
    // $_PATCH[”changeProfile”] (changeProfile?=param) 

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

} // Denna stänger if session loggedin


//Annat:
// Kontrollera contenttype,  tillåtna filtyper osv
// ! OBS !  Begränsa resultat från API (posts) till MAX 20 st? View more…
// ! OBS !  Spara en kopia av gamla DB  


?>

  
