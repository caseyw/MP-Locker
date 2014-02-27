Locker.module('AppSession.View', function(View, Locker, Backbone, Marionette, $, _)
{

    View.Session = Marionette.ItemView.extend(
    {
        template: "#session-view"
    });
    
});