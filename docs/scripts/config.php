<?php
require_once '../../vendor/autoload.php';
use Dotenv\Dotenv;

class Config
{
    private static $instance = null;

    private function __construct()
    {

        $dotenv = Dotenv::createImmutable(realpath(__DIR__ . '/../../'));
        $dotenv->load();
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new Config();
        }
        return self::$instance;
    }
}

?>