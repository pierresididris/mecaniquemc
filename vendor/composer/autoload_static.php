<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit6a0cfc70e172f5c5ccdf5968771a9f83
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit6a0cfc70e172f5c5ccdf5968771a9f83::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit6a0cfc70e172f5c5ccdf5968771a9f83::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}