Locker.module('Entity', function(Entity, Locker, Backbone, Marionette, $, _)
{

    Entity.ModelUserProgress = Backbone.Model.extend(
    {});

    Entity.CollectionUserProgress = Backbone.Collection.extend(
    {
        url: function()
        {
            return 'http://localhost:8080/user/1/progress/' + this.id;
        },

        model: Entity.ModelUserProgress
    });



    Locker.reqres.setHandler('user.progress:entities', function(id)
    {
        var defer    = new $.Deferred();

        var entities = new Entity.CollectionUserProgress();

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