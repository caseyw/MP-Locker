Locker.module('AppProgress.Explorer', function(Explorer, Locker, Backbone, Marionette, $, _)
{

    var layout;


    Explorer.Controller =
    {
        setup: function()
        {
            layout = new Explorer.Layout();

            var listExercises = new Locker.AppProgress.Explorer.Exercises(
            {
                collection: Locker.request('exercise:entities')
            });

            listExercises.on('itemview:explorer:graph', function(childView, model)
            {
                Explorer.Controller.showGraph(model);
            });

            layout.on("show", function()
            {
                layout.regionExplorerList.show(listExercises);
            });

            Locker.regionMaster.show(layout);
        },


        showGraph: function(model)
        {
            var graphHeader = new Locker.AppProgress.Explorer.Heading(
            {
                model: model
            });

            layout.regionExplorerHeader.show(graphHeader);


            var query = Locker.request('user.progress:entities', model.get("id"));

            $.when(query).done(function(report)
            {
                var graphContent = new Locker.AppProgress.Explorer.Graph(
                {
                    collection: report
                });

                layout.regionExplorerGraph.show(graphContent);
            });
        }

    }

});