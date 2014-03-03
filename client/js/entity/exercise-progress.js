Locker.module('Entity', function(Entity, Locker, Backbone, Marionette, $, _)
{

    Entity.ModelExerciseProgress = Backbone.Model.extend(
    {});

    Entity.CollectionExerciseProgress = Backbone.Collection.extend(
    {
        url: function()
        {
            return 'http://localhost:8080/exercise/' + this.id + '/progress';
        },

        model: Entity.ModelExerciseProgress
    });



    Locker.reqres.setHandler('exercise-progress:entities', function(id)
    {
        var defer    = new $.Deferred();

        var entities = new Entity.CollectionExerciseProgress();

        entities.id = id;

        entities.fetch({
            success: function(response)
            {
                defer.resolve(response);
            }
        });

        return defer.promise();
    });

});