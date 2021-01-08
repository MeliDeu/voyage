<?php

    include "functions.php";

    // Hämta innehållet i DB och gör om det till php och lägg i $database
    $database = getDatabase();
    $method = $_SERVER["REQUEST_METHOD"];
    if ($method === "POST") {

    //------------------------bilder-----------------------------//
        //innehåller file som finns i coverImg
        $coverImgFile = $_FILES["coverImg"];
        // echo json_encode(pathinfo($imagesFiles[0]["name"], PATHINFO_EXTENSION));
        // exit();

        //transforms multiple files into usable array
        // https://www.php.net/manual/de/features.file-upload.multiple.php
        function reArrayFiles($file_post) {
            //skapar en ny array
            $file_ary = array();
            //räknar hur många element som finns i arrayn
            $file_count = count($file_post['name']);
            //returnerar alla keys som en array har
            $file_keys = array_keys($file_post);
            
            for ($i = 0; $i < $file_count; $i++) {
                foreach ($file_keys as $key) {
                    $file_ary[$i][$key] = $file_post[$key][$i];
                }
            }
            return $file_ary;
        }

        //endast $_FILES("images) innehåll flera små arrayer, där alla namn från alla filer utgjorde en array, alla temp en annan etc. 
        $imagesFiles = reArrayFiles($_FILES["images"]);

        //funktion för att flytta bilden samt kontroll
        function uploadFile($file){
            $fileExtension = pathinfo($file["name"], PATHINFO_EXTENSION);
            if ($file["size"] > 500000) {
                http_response_code(400);
                header("Content-Type: application/json");
                echo json_encode("the file is too big");
                exit();
            }
            if (!in_array($fileExtension, ["jpg", "jpeg", "png"])){
                http_response_code(400);
                header("Content-Type: application/json");
                echo json_encode("$fileExtension is the the wrong type");
                exit();
            }
            if ($file["error"] !== 0) {
                http_response_code(400);
                header("Content-Type: application/json");
                echo json_encode("the file is corrupt");
                exit();
            }
            // echo $fileExtension;
            $imageName = uniqid() . "." . $fileExtension;
            $imageTempName = $file["tmp_name"];
            $uploadFolder = "../images/uploads/";
            $fileName = $uploadFolder . $imageName;
            move_uploaded_file($imageTempName, $fileName);
            $imgPath = ["file" => $fileName];
            return $imgPath;
        }
        //funktionen körs och path till coverimgFile sparas i variable
        $coverImgPath = uploadFile($coverImgFile);
        //do the same for all other images // loop och put path in array
        $imagePaths = [];
        //funktionen körs och path till varenda imagefile för de små bilderna sparas i variable
        foreach($imagesFiles as $image) {
            array_push($imagePaths, uploadFile($image));
        }

    //--------------------annan Post-data-------------------------//
        
        //alla variabler från post
        $title = $_POST["title"];
        $categoryID = $_POST["categoryID"];
        $country = $_POST["country"];
        $description = $_POST["description"];
        $creatorID = $_POST["creatorID"];

        //skapa ID
        $highestID = 0;
        foreach ($database["posts"] as $post) {
            if ($post["postID"] > $highestID) {
                $highestID = $post["postID"];
            }
        }
        
    //--------------------skriva till DB-------------------------//
        // echo json_encode($categoryID);
        // exit();
        $newPost = [
            "postID" => $highestID + 1,
            "creatorID" => $creatorID,
            "title" => $title,
            "coverImg" => $coverImgPath,
            "images" => $imagePaths,
            "albumID" => false,
            "country" => $country,
            "categoryID" => $categoryID,
            "description" => $description
        ];

        $database["posts"][] = $newPost;

        $dataJSON = json_encode($database, JSON_PRETTY_PRINT);
        //file finns i functions.php
        file_put_contents($file, $dataJSON);
        http_response_code(201);
        $message = [
            "data" => $newPost
        ];
        
        echo json_encode($message);
        header("Content-Type: application/json");
        // header("Location: ../home.php");
        exit();
    }

    if ($method === "DELETE") {
        //unlink bild, ta bort post från db, 
    }

?>