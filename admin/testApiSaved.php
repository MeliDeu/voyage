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

}


?>