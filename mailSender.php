<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

if(empty($_POST['email']) && empty($_POST['phone'])){
    header('HTTP1/1 400');
    echo json_encode(array("result" => false));
}else{
    $emailCustomer = $_POST['email'];
    $phoneCustomer = $_POST['phone'];
    $gender = $_POST['gender'];
    $lastnameCustomer = $_POST['lastname'];
    $firstnameCustomer = $_POST['firstname'];
    $goal = $_POST['goal'];

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Port = 587;
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPSecure = 'tls';
    $mail->SMTPAuth = true;
    $mail->Username = 'beaug867@gmail.com';
    $mail->Password = 'M1234567890M';
    $mail->setFrom('pierre.sididris@live.fr');
    $mail->addReplyTo('pierre.sididris@live.fr');
    $mail->addAddress('mathieuferron06@gmail.com');
    $mail->Subject = 'First phpmailer mail';
    $mail->msgHtml( "
    <div>$gender $firstnameCustomer $lastnameCustomer souhaiterez prendre rendez vous pour</div>
    <div>$goal
    tel : $phoneCustomer
    email: $emailCustomer</div> ");

    if(!$mail->send()) {
        header('HTTP1/1 400');
        echo json_encode(array("result" => $mail->ErrorInfo));
    } else {
        header('HTTP1/1 200');
        echo json_encode(array("result" => true));
      }

}