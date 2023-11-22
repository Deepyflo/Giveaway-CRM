<?php 
    session_start();

    include './template/header.php';
    if (isset($_COOKIE['adminID'])) {
        include './template/admin/add-user.php';
    } else {
        include './template/admin/login.php';
    }

    include './template/footer.php';
?>