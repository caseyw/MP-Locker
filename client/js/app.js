
var Locker = new Marionette.Application();


Locker.addRegions(
{
    regionMaster: "#region-master",
    regionHeader: "#region-header"
});


Locker.on("initialize:after", function()
{
    Backbone.history.start();

    Locker.AppDashboard.Controller.index();
});
