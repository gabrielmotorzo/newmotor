<?php

session_cache_limiter('nocache');
header('Expires: ' . gmdate('r', 0));

header('Content-type: application/json');

// Step 1 - Enter your email address below.
//$to = 'gabriel@motorzo.in';
// $to = 'support@motorzo.freshdesk.com';

//$subject = $_POST['subject'];
$phone = $_POST['phone'];

if(isset($_POST['phone'])) {

    $fields = array(
        0 => array(
            'text' => 'Phone number',
            'val' => $phone
        ),
    );

    $message = "";

    foreach($fields as $field) {
        $message .= $field['text'].": " . htmlspecialchars($field['val'], ENT_QUOTES) . "<br>\n";
    }

    // Simple Mail
    if(!$enablePHPMailer) {

        $headers = '';
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        if (mail($to, "New Link request", $message, $headers)){
            $arrResult = array ('response'=>'success');
        } else{
            $arrResult = array ('response'=>'error');
        }

        // PHP Mailer Library - Docs: https://github.com/PHPMailer/PHPMailer
    } else {

        include("php-mailer/PHPMailerAutoload.php");

        $mail = new PHPMailer;

        $mail->IsSMTP();                                      // Set mailer to use SMTP
        $mail->SMTPDebug = 0;                                 // Debug Mode

        $mail->AddAddress($to);                               // Add a recipient

        $mail->IsHTML(true);                                  // Set email format to HTML

        $mail->CharSet = 'UTF-8';

        $mail->Subject = "New Link request";
        $mail->Body    = $message;

        if(!$mail->Send()) {
            $arrResult = array ('response'=>'error');
        }

        $arrResult = array ('response'=>'success');

    }

    echo json_encode($arrResult);

} else {

    $arrResult = array ('response'=>'error');
    echo json_encode($arrResult);

}
?>