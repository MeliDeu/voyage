<?php

    function getDatabase() {
        $file = dirname(__FILE__) . "/db.json";
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

?>