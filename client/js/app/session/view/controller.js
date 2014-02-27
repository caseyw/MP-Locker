Locker.module('AppSession.View', function(View, Locker, Backbone, Marionette, $, _)
{

    View.Controller = 
    {
        viewSession: function(model)
        {
            var viewSession = new Locker.AppSession.View.Session(
            {
                model: model
            });

            Locker.regionMaster.show(viewSession);
        }
    }

});