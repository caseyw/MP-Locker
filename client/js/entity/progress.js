Locker.module('Entity', function(Entity, Locker, Backbone, Marionette, $, _)
{

    Entity.ModelProgress = Backbone.Model.extend(
    {});

    Entity.CollectionProgress = Backbone.Collection.extend(
    {
        url: 'http://localhost:8080/progress',

        model: Entity.ModelProgress
    });



    Locker.reqres.setHandler('progress:entities', function(id)
    {
        var defer    = new $.Deferred();

        var entities = new Entity.CollectionProgress();

        entities.fetch({
            traditional: true,
            data: {exercise: id},
            success: function(response)
            {
                defer.resolve(response);
            }
        });

        return defer.promise();
    });

});