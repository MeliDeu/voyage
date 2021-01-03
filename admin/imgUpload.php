<?php
    $method = $_SERVER["REQUEST_METHOD"];
    if ($method === "POST") {
    
        //variabler som behövs för kontroller
        $imgFile = $_FILES["postImageFile"];
        $pathInfo = pathinfo($imgFile["name"]);
        $imageName = sha1($imgFile["name"]);
        $imageType = $imgFile["type"];
        //i bytes --> 1000bytes är 1kb
        $imageSize = $imgFile["size"];
        $imageError = $imgFile["error"];
        $imageExt = $pathInfo["extension"];
        $allowedExt = ["jpg", "jpeg", "png"];
        $imageTempName = $imgFile["tmp_name"];
        $uploadFolder = "../images/uploads/";
        //måste slumpa fram namn --> www.php.net/manual/en/function.sha1
        $fileName = $uploadFolder . $imageName;

        if (file_exists($fileName)) {
            // om fil med samma namn redan finns, slumpa fram en ny
        }

        //kontrollera ändelse, om inte allowed, early abort
        if (!in_array($imageExt, $allowedExt)){
            //felmeddelande till användaren
        }

        //kontrollera size
        if ($imageSize > 500000) {
            //skicka meddelande till användaren om fel storlek
        } 

        //kontrollera om bilden är korrupt
        if ($imageError !== 0) {
            //skicka meddelande till användaren om att någonting är fel med bilden
        }

        //om alla kontroller har gått bra, då kan bilden laddas upp
        //obs måste lägga till random filnamn
        //nytt filnamn för bilden, extension samt punkt måste läggas till då den annars inte visades i korrekt filformat
        $fileName = $fileName . "." . $imageExt;
        //om nåt går fel vid upload så returnerar move upload-methoden false
        move_uploaded_file($imageTempName, $fileName);

        http_response_code(201);
        header("Content-Type: application/json");
        $imgPath = ["file" => $fileName];
        echo json_encode($imgPath);
        exit();
    }
    // return $fileName;

    if ($method === "DELETE") {
        //unlink bild, ta bort post från db, 
    }

?>