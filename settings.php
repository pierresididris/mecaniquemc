<?php

class Settings{
    private $host = 'localhost';
    private $adminMail = 'beaug867@gmail.com';
    private $adminPwd = 'M1234567890M';
    private $smtpHost = 'smtp.gmail.com';
    private $adminTel = '0256.256.12.53';

    public function getHost(){
        return $this->host;
    }

    public function getAdminMail(){
        return $this->adminMail;
    }

    public function getAdminPwd(){
        return $this->adminPwd;
    }

    public function getSmtpHost(){
        return $this->smtpHost;
    }

    public function getAdminTel(){
        return $this->adminTel;
    }
}