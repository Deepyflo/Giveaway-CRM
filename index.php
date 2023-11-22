<?php 
    include './template/header.php';
    require './core/checkUUID.php';

    if (isset($_GET['UUID'])) {
        if (checkUUID($_GET['UUID'])) {
            include './template/index/index.php';
        } else {
            include './template/error/badUUID.php';
        }
    } else {
        include './template/error/badUUID.php';
    }


    include './template/footer.php';
?>