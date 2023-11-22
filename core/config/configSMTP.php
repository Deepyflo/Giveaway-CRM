<?php
use PHPMailer\PHPMailer\SMTP;

// Load Composer's autoloader
require __DIR__ . '/../../vendor/autoload.php';

function configureSMTP($mail) {
    try {
        // Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = 'e7837e8788f36d';
        $mail->Password = 'eab9cf82629c3c';                                  //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    } catch (Exception $e) {
        echo "SMTP configuration error: {$e->getMessage()}";
    }
}
?>
