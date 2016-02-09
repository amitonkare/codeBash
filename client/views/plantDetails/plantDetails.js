
Template.plantDetailsTable.events({
    "click #addPlantDetails":function()
    {
        Session.set('add','true');
    },
    "click #addPlant":function()
    {
        var addPlantName = $("#addPlantName").val();
        var addPlantType = $("#addPlantType").val();
        var addPlantScientificName = $("#addPlantScientificName").val();
        var addPlantCategory = $("#addPlantCategory").val();
        var addPlantCost = $("#addPlantCost").val();
        var addPlantQuantity = $("#addPlantQuantity").val();
        var addPlantComments = $("#addPlantComments").val();
        var obj = {};
        obj.id = Math.random();
        obj.name = addPlantName;
        obj.scientificName = addPlantScientificName;
        obj.comments = addPlantComments;
        obj.type = addPlantType;
        obj.category = addPlantCategory;
        obj.cost = addPlantCost;
        obj.unit = addPlantQuantity;
        console.log(obj);
        CodeBashApp.plantDetailsService.getInstance().addPlant(obj);
        Session.set('add','');  
    },
    "click #updateDetails":function()
    {
        Session.set('update','true');
        Session.set('id',this._id);        
    },
    "click #updatePlant": function () {
        var name = $("#plantName").val();
        var plantType = $("#plantType").val();
        var plantScientificName = $("#plantScientificName").val();
        var plantCategory = $("#plantCategory").val();
        var plantCost = $("#plantCost").val();
        var plantQuantity = $("#plantQuantity").val();
        var plantComments = $("#plantComments").val();
        console.log("id -->" + Session.get('id'));
        CodeBashApp.plantDetailsService.getInstance().updatePlant(Session.get('id'),name,plantScientificName,plantType,plantCategory,plantCost,plantQuantity,plantComments);
        Session.set('update','');
        Session.set('id','');
    },
    "click #deletePlant": function () {
        CodeBashApp.plantDetailsService.getInstance().deletePlant(this._id);
    }
});

Template.plantDetailsTable.helpers({
    update:function(){
        if(Session.get('update') == 'true')
        {
            return true;
        }
    },   
    plantsList : function(){
         if(Session.get('searchKey')) 
         {              
         plants = CodeBashApp.plantDetailsService.getInstance().findPlantByName(Session.get('searchKey')); 
         return plants;
        }
        if(Session.get('searchType'))
        {
         plants = CodeBashApp.plantDetailsService.getInstance().findPlantByType(Session.get('searchType')); 
         return plants;   
        }                  
        plants = PlantDetails.find().fetch();
        console.log("plants -- >" + plants);
        return plants;
    }
});