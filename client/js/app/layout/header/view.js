Locker.module('AppLayout.Header', function(Header, Locker, Backbone, Marionette, $, _)
{

    Header.Navigation = Marionette.ItemView.extend(
    {
        template: "#layout-header",

        events:
        {
            'click a.js-sessions': 'viewSessions',
            'click a.js-progress': 'viewProgress'
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