Locker.module('AppDashboard', function(Dashboard, Locker, Backbone, Marionette, $, _)
{

    Dashboard.Controller =
    {
        index: function()
        {
            var dashboard = new Locker.AppDashboard.Index();

            Locker.regionMaster.show(dashboard);
        }

    }

});