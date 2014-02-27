<?php

namespace Locker\Console;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;


class Import extends Command
{

    protected function configure()
    {
        ini_set('display_errors', 1);
        ini_set('auto_detect_line_endings',TRUE);

        $this->setName('session:import')
             ->setDescription('Import data from CSV');
    }


    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $handle  = fopen('import.csv', 'r');

        while($x = fgetcsv($handle))
        {
            $sessionId  = $this->_createSession($x[0]);

            $exerciseSessionId = $this->_createExercise($x[1], $sessionId);

            $this->_createSet($exerciseSessionId, $x[2], @$x[3]);
        }

        fclose($handle);
    }


    private function _createSession($unformatted)
    {
        echo "IMPORTING: " . $unformatted;

        $exploded = explode(')', $unformatted);

        if(count($exploded) != 2)
        {
            echo "COULD NOT EXPLODE: " . $unformatted . PHP_EOL;

            $exploded[1] = 0;
        }

        echo "####" . PHP_EOL;

        $date = implode('-', array_reverse(explode('_', trim($exploded[1]))));
        $name = trim($exploded[0] . ')');

        $result = $this->getHelper('db')->getConnection()->fetchAssoc('SELECT * FROM session WHERE name = ? AND date = ?', array($name, $date));

        if($result)
        {
            return $result['id'];
        }

        $this->getHelper('db')->getConnection()->insert('session', array(
            'date'     => $date, 
            'name'     => $name,
            'duration' => 45));

        $id = $this->getHelper('db')->getConnection()->lastInsertId();

        return $id;
    }


    private function _createExercise($name, $sessionId)
    {
        $name = trim(str_replace('*', '', strtoupper($name)));

        $exercise = $this->getHelper('db')->getConnection()->fetchAssoc('SELECT * FROM exercise WHERE name = ?', array($name));

        if(!$exercise)
        {
            $this->getHelper('db')->getConnection()->insert('exercise', array(
                'name'     => $name));

            $id = $this->getHelper('db')->getConnection()->lastInsertId();
        } else {
            $id = $exercise['id'];
        }

        $exerciseSession = $this->getHelper('db')->getConnection()
                                ->fetchAssoc('SELECT * FROM session_exercise WHERE exercise_id = ? AND session_id = ?', array($id, $sessionId));

        if(!$exerciseSession)
        {
            $this->getHelper('db')->getConnection()->insert('session_exercise', array(
                'exercise_id' => $id, 
                'session_id'  => $sessionId));

            $id = $this->getHelper('db')->getConnection()->lastInsertId();

            return $id;
        }

        return $exerciseSession['id'];
    }


    private function _createSet($exerciseSessionId, $amount, $reps = 10)
    {
        if(empty($reps))
        {
            $reps = 10;
        }

        $this->getHelper('db')->getConnection()->insert('session_exercise_set', array(
            'amount' => $amount,
            'b'      => $reps,
            'session_exercise_id'  => $exerciseSessionId));
    }
}