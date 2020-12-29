<?php
session_start();

if(isset($_SESSION["username"]) == false){
    header("Location: ..index.php");
    exit();
}

include "../sections/header.php";
include "../sections/sidebar.php";
include "../sections/profileTop.php";

$username = $_SESSION["username"];
?>
    <script src='../js/classes.js'></script>
    <script src='../js/adminPolaroidArray.js'></script>
    <script src='../js/startGrid.js'></script>
    <script src="../js/functions.js"></script>
    <script src="../js/requests.js"></script>
