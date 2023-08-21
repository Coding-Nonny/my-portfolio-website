<?php

require_once(__DIR__ .'/../../assets/php/config.php');

try {
    $database = "localhost";
    $user = USER;
    $password = PASSWORD;
    $name = DB;
    $connect = new mysqli($database, $user, $password, $name);
    if ($connect->connect_error) {
        throw new Exception("Connection failed: " . $connect->connect_error);
    }
} catch (Exception $error) {
    echo $error->getMessage();
}
