<?php
require_once "../app/vendor/autoload.php";
require_once "config.php";

use mysqli;

class Database
{
    private static $instance = null;
    private $mysqli;

    private function __construct()
    {
        $config = Config::getInstance();

        $dbHost = $_ENV['DB_HOST'];
        $dbName = $_ENV['DB_NAME'];
        $dbUser = $_ENV['DB_USER'];
        $dbPass = $_ENV['DB_PASS'];
        $dbPort = $_ENV['DB_PORT'];

        if (!empty($dbPort)) {
            $dbHost .= ':' . $dbPort;
        }

        $this->mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

        if ($this->mysqli->connect_errno) {
            error_log('Ошибка подключения: ' . $this->mysqli->connect_error);
            throw new Exception('Ошибка подключения: ' . $this->mysqli->connect_error);
        }
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection()
    {
        return $this->mysqli;
    }
}
