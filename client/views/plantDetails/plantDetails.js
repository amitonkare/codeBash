var plantDetailsService = CodeBashApp.plantDetailsService.getInstance();
Templates.searchPlant.Events({
    "click #searchPlant": function () {
        var searchKey = $("#searchPlant").val();
        CodeBashApp.platDetails.plantArray = plantDetailsService.findTree(searchKey);
    }
});

Templates.plantDetails.Events({

});

Templates.plantDetails.helpers({
    getHeaderName: function () {
        return "Plant Details";
    }
});

Templates.plantDetailsTable.events({
    "click #updatePlant": function () {
        plantDetailsService.updatePlant();
    },
    "click #deletePlant": function () {
        plantDetailsService.deletePlant();
    }
    });