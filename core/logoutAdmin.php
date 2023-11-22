<?php

if (isset($_COOKIE['adminID'])) {
    unset($_COOKIE['adminID']);
    setcookie('adminID', '', -1, '/'); 
    session_destroy();
    session_abort();
    echo 'true';
} else {
    echo 'false';
}