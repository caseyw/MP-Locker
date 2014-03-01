<?php

require_once(__DIR__ . '/../vendor/autoload.php');

$app = new Silex\Application();
$app['debug'] = true;


$config = \Symfony\Component\Yaml\Yaml::parse('../config.yml');


$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => $config['database']
));


$app->get('/', function() use ($app)
{
    return $app->json('');
});


$app->get('/session', function() use ($app)
{
    $dataset = $app['db']->fetchAll('SELECT * FROM session ORDER BY date DESC');

    return $app->json($dataset);
});


$app->get('/session/{id}', function($id) use ($app)
{
    $dataset = $app['db']->fetchAssoc('SELECT * FROM session WHERE id = ?', array($id));

    return $app->json($dataset);
});


$app->get('/exercise', function() use ($app)
{
    $dataset = $app['db']->fetchAll('SELECT * FROM exercise WHERE track = 1 ORDER BY name ASC');

    return $app->json($dataset);
});


$app->get('/progress', function(\Symfony\Component\HttpFoundation\Request $request) use ($app)
{
    $dataset = $app['db']->fetchAll('SELECT `date`, reps, MAX(amount) as amount FROM session_exercise_set ses
        LEFT JOIN session_exercise se ON ses.session_exercise_id = se.id
        LEFT JOIN `session` s ON se.session_id = s.id
        WHERE se.exercise_id = ?
        GROUP BY s.id, ses.id
        ORDER BY s.date ASC', array($request->get('exercise')));

    return $app->json($dataset);
});

$app->run();