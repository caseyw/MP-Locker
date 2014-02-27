<?php

namespace Locker\Console;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;


class SessionCreate extends Command
{

    protected function configure()
    {
        $this->setName('session:create')
             ->setDescription('Add a new session');
    }


    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->_promptSetup($output);
    }


    private function _promptSetup(OutputInterface $output)
    {
        $dialog = $this->_dialog();

        $date = $dialog->ask($output, 'Date (YYYY-MM-DD HH:MM): '); 

        $name = $dialog->ask($output, 'Name: '); 

        $this->getHelper('db')->getConnection()->insert('session', array(
            'date'     => $date, 
            'name'     => $name,
            'duration' => 45));

        $id = $this->getHelper('db')->getConnection()->lastInsertId();

        $output->writeln("Created session with id: {$id}");

        $this->_promptExercise($output, $id);
    }


    private function _promptExercise(OutputInterface $output, $sessionId)
    {
        $dialog = $this->_dialog();

        $exercise = $dialog->ask($output, 'Excercise: '); 

        if(!empty($exercise))
        {
            $match = $this->_getExerciseID($exercise);

            $this->getHelper('db')->getConnection()->insert('session_exercise', array(
                'exercise_id' => $match,
                'session_id'  => $sessionId
            ));

            $exerciseId = $this->getHelper('db')->getConnection()->lastInsertId();

            return $this->_promptSet($output, $exerciseId, $sessionId);
        }
    }


    private function _promptSet($output, $exerciseId, $sessionId, $order = 1)
    {
        $dialog = $this->_dialog();

        $set = $dialog->askAndValidate($output, "<info>{$exerciseId}</info> Set (count,amount): ", function($answer)
        {
            if(empty($answer))
            {
                return $answer;
            }

            $set = explode(',', $answer);

            if(count($set) != 2)
            {
                throw new \RunTimeException("Input must equal 2");
            }

            return $set;
        }); 

        if(empty($set))
        {
            return $this->_promptExercise($output, $sessionId);
        } else {
            $this->getHelper('db')->getConnection()->insert('session_exercise_set', array(
                'a'  => $order,
                'b'  => trim($set[0]),
                'amount' => trim($set[1]),
                'session_exercise_id' => $exerciseId,
            ));

            $order++;

            return $this->_promptSet($output, $exerciseId, $sessionId, $order);
        }
    }


    private function _getExerciseID($name)
    {
        $name = strtoupper($name);

        $dataset = $this->getHelper('db')->getConnection()
                        ->fetchAssoc('SELECT * FROM exercise WHERE name = ?', array($name));

        if(!$dataset)
        {
            $this->getHelper('db')->getConnection()->insert('exercise', array(
                'name' => $name
            ));

            return $this->getHelper('db')->getConnection()->lastInsertId();
        }

        return $dataset['id'];
    }


    /**
     * @return \Symfony\Component\Console\Helper\DialogHelper
     */
    private function _dialog()
    {
        return $this->getHelperSet()->get('dialog');
    }

}