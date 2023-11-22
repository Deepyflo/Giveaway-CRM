<?php 
    session_start();

    include './template/header.php';
    if (isset($_COOKIE['adminID'])) { ?>
        <script>location.href = "/admin";</script>
    <?php } else if (isset($_GET['token'])) {
        require './core/checkResetToken.php';

        if (checkToken($_GET['token'])) {
            include './template/admin/resetPassword.php';
        } else {
            include './template/admin/forgotPassword.php';
        }
    } else {
        include './template/admin/forgotPassword.php';
    }

    include './template/footer.php';