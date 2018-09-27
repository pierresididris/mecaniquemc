<?php
require 'vendor/autoload.php';
require './settings.php';
use PHPMailer\PHPMailer\PHPMailer;

$settings = new Settings();

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
    $extraInfo = $_POST['extraInfo'];

    if($goal != 'undefined'){
        $goal =  'pour <b>'.$goal.'</b>';
    }else{
        $goal = '';
    }

    if($extraInfo != null){
        $extraInfo = '
         <div>
            <p>
                Informations complémentaires sur les réparations à effectuer : <br>
                '.$extraInfo.'
            </p>
        </div>';
    }else{
        $extraInfo = '';
    }

    $mail = new PHPMailer(true);
    
    $mail->isSMTP();
    $mail->Port = 587;
    $mail->Host = $settings->getSmtpHost();
    $mail->SMTPSecure = 'tls';
    $mail->SMTPAuth = true;
    $mail->Username = $settings->getAdminMail();
    $mail->Password = $settings->getAdminPwd();

    $mail->setFrom($emailCustomer);
    $mail->addReplyTo($emailCustomer);

    //set adress of the admin
    $mail->addAddress($settings->getAdminMail());
    $mail->Subject = 'Prise de rendez-vous';
    $mail->msgHtml( '
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>Rendez-vous</title>
                
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0 " />

                <style>
                    .content{
                        margin: 2em;
                    }
                </style>
            </head>



            <body>
                
                <div class="content">
                    <div>
                        <table>
                            <tr>
                                <td><img src="http://'.$settings->getHost().'/mecaniquemc/img/logo.jpg" height="800px" width="1000px" alt=""></td>
                                <td>
                                    <p>
                                        <h1>Demande de rendez-vous</h1>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
            
                    <div>
                        <p>
                            '.$gender.' <b>'.$lastnameCustomer.' '.$firstnameCustomer.'</b> souhaiterez prendre rendez-vous '.$goal.'<br>
                        </p>
                    </div>
                        '.$extraInfo.'
                    <div>
                        <p>
                            <h3>Coordonnées</h3>
                            <b>tel</b> : '.$phoneCustomer.' <br>
                            <b>email</b> : '.$emailCustomer.'
                        </p>
                    </div>
                </div>

            </body>
        </html>
    ' );

    if(!$mail->send()) {
        header('HTTP1/1 400');
        echo json_encode(array("result" => $mail->ErrorInfo));
    } else {
        header('HTTP1/1 200');
        echo json_encode(array("result" => true));
      }

}