Locker.module('AppProgress.Explorer', function(Explorer, Locker, Backbone, Marionette, $, _)
{

    Explorer.Exercise = Marionette.ItemView.extend(
    {
        template: "#progress-explorer-selector",

        events:
        {
            'click a': 'viewGraph'
        },

        viewGraph: function()
        {
            this.trigger('explorer:graph', this.model);
        }
    });


    Explorer.Exercises = Marionette.CollectionView.extend(
    {
        tagName: 'ul',
        itemView: Explorer.Exercise
    });


    Explorer.Heading = Marionette.ItemView.extend(
    {
        template: "#progress-explorer-head"
    });


    Explorer.Graph = Marionette.ItemView.extend(
    {
        template: "#progress-explorer-graph",

        onShow: function()
        {
            new Morris.Line({
                // ID of the element in which to draw the chart.
                element: 'myfirstchart',
                // Chart data records -- each entry in this array corresponds to a point on
                // the chart.
                data: this.collection.toJSON(),
                // The name of the data record attribute that contains x-values.
                xkey: 'date',
                // A list of names of data record attributes that contain y-values.
                ykeys: ['amount', 'reps'],
                // Labels for the ykeys -- will be displayed when you hover over the
                // chart.
                labels: ['Weight (KG)', 'Reps']
            });
        }
    });


    Explorer.Layout = Marionette.Layout.extend(
    {
        template: '#progress-explorer',

        regions:
        {
            regionExplorerList:   '#region-progress-list',
            regionExplorerHeader: '#region-progress-head',
            regionExplorerGraph:  '#region-progress-graph'
        }
    });

});