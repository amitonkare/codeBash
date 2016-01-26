plants = CodeBashApp.plantDetailsService.getInstance().findPlant('Mango');

Template.searchPlant.events({
    "click #searchPlant": function () {
        var searchKey = $("#searchPlant").val();
        plants = CodeBashApp.plantDetailsService.getInstance().findPlant(searchKey);
    }
});

Template.plantDetails.events({
});

Template.plantDetails.helpers({
    getHeaderName: function () {
        return "Plant Details";
    }
});

Template.plantDetailsTable.events({
    "click #updatePlant": function () {
        CodeBashApp.plantDetailsService.getInstance().updatePlant();
    },
    "click #deletePlant": function () {
        CodeBashApp.plantDetailsService.getInstance().deletePlant();
    }
});

Template.plantDetailsTable.helpers({
    plantsList : function(){
         return plants;
    }
});