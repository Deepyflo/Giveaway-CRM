<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require __DIR__ . '/../vendor/autoload.php';
require_once './config/configSMTP.php'; // Inclure la configuration SMTP

function sendEmail($subject, $recipientEmail, $recipientName, $type) {
    // Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    // Configure SMTP
    configureSMTP($mail);

    try {
        // Recipients
        $mail->setFrom('info@bigsmile.be', 'Bigsmile Agency');
        $mail->addAddress($recipientEmail, $recipientName);
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = $subject;
        if ($type == 'participation') {
            $mail->Body = file_get_contents(__DIR__ . '/../template/email/participation.php');
        } else if ($type == 'password') {
            // Load the e-mail template
            $emailBody = file_get_contents(__DIR__ . '/../template/email/forgotPassword.php');
            
            // Replace a placeholder in the template with the actual token
            $emailBody = str_replace('$token', $_POST['token'], $emailBody);
            
            $mail->Body = $emailBody;
        }

        // Send the email
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$e->getMessage()}";
    }
}

$subject = $_POST['subject'];
$recipientEmail = $_POST['email'];
$recipientName = $_POST['username'];
$type = $_POST['type'];

sendEmail($subject, $recipientEmail, $recipientName, $type);