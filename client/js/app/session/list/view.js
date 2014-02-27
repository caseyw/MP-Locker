Locker.module('AppSession.List', function(List, Locker, Backbone, Marionette, $, _)
{

    List.Session = Marionette.ItemView.extend(
    {
        template: "#session-selector",

        events:
        {
            'click a': 'viewSession'
        },

        viewSession: function()
        {
            this.trigger('session:view', this.model);
        }

    });

    List.Sessions = Marionette.CollectionView.extend(
    {
        tagName: 'ul',
        itemView: List.Session
    });

});