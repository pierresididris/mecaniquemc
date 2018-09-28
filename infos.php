<?php
require 'settings.php';


$data = array();
$settings = new Settings();

$data['host'] = $settings->getHost();
$data['adminMail'] = $settings->getAdminMail();
$data['adminTel'] = $settings->getAdminTel();


header('HTTP1/1 200');
echo json_encode(array('result' => $data));