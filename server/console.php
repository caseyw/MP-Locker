<?php

require_once('vendor/autoload.php');

$console = new \Symfony\Component\Console\Application();


$config = \Symfony\Component\Yaml\Yaml::parse('config.yml');


$connection = \Doctrine\DBAL\DriverManager::getConnection($config['database'], new \Doctrine\DBAL\Configuration());

$console->getHelperSet()
        ->set(new Doctrine\DBAL\Tools\Console\Helper\ConnectionHelper($connection), 'db');

$console->add(new \Locker\Console\SessionCreate);

$console->run();