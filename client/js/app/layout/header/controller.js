Locker.module('AppLayout.Header', function(Header, Locker, Backbone, Marionette, $, _)
{

    Header.Controller = 
    {
        renderNavigation: function(model)
        {

            var viewNavigation = new Locker.AppLayout.Header.Navigation(
            {});

            Locker.regionHeader.show(viewNavigation);
        }
    };


    Header.on("start", function()
    {
        Locker.AppLayout.Header.Controller.renderNavigation();
    });

});