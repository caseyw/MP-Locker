Locker.module('Entity', function(Entity, Locker, Backbone, Marionette, $, _)
{

    Entity.ModelSession = Backbone.Model.extend(
    {});


    Entity.CollectionSession = Backbone.Collection.extend(
    {
        url: 'http://localhost:8080/session',

        model: Entity.ModelSession
    });


    Locker.reqres.setHandler('session:entities', function()
    {
        var entities = new Entity.CollectionSession();

        entities.fetch();

        return entities;
    });

});