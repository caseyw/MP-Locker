Locker.module('AppDashboard', function(Dashboard, Locker, Backbone, Marionette, $, _)
{

    Dashboard.Index = Marionette.ItemView.extend(
    {
        template: "#dashboard",
    });

});