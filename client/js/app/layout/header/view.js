Locker.module('AppLayout.Header', function(Header, Locker, Backbone, Marionette, $, _)
{

    Header.Navigation = Marionette.ItemView.extend(
    {
        template: "#layout-header",

        events:
        {
            'click a.js-sessions': 'viewSessions',
            'click a.js-progress': 'viewProgress',
            'click a.js-dashboard': 'viewDashboard'
        },

        viewDashboard: function()
        {
            Locker.AppDashboard.Controller.index();
        },

        viewSessions: function()
        {
            Locker.AppSession.List.Controller.getSessions();
        },

        viewProgress: function()
        {
            Locker.AppProgress.Explorer.Controller.setup();
        }
    });
    
});