Locker.module('AppSession.List', function(List, Locker, Backbone, Marionette, $, _)
{

    List.Controller =
    {
        getSessions: function()
        {
            var listSessions = new Locker.AppSession.List.Sessions(
            {
                collection: Locker.request('session:entities')
            });

            listSessions.on('itemview:session:view', function(childView, model)
            {
                Locker.AppSession.View.Controller.viewSession(model);
            });

            Locker.regionMaster.show(listSessions);
        }
    }

});