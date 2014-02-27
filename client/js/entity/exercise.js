Locker.module('Entity', function(Entity, Locker, Backbone, Marionette, $, _)
{

    Entity.ModelExercise = Backbone.Model.extend(
    {});

    Entity.CollectionExercise = Backbone.Collection.extend(
    {
        url: 'http://localhost:8080/exercise',

        model: Entity.ModelExercise
    });



    Locker.reqres.setHandler('exercise:entities', function()
    {
        var entities = new Entity.CollectionExercise();

        entities.fetch();

        return entities;
    });


    Locker.reqres.setHandler('exercise:entity', function(id)
    {
        var model = new Entity.ModelExercise();

        model.fetch({id: id});

        return model;
    });

});