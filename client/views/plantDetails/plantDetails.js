Template.plantDetailsTable.onRendered(
    function () 
    {
        $(document).ready(function () {
            $('#list-plants').DataTable();
            $(".tool-tip").tooltip();
        });
    }
);

Template.plantDetailsTable.events({
    "click #addPlantDetails":function()
    {
        Session.set('add','true');
    },
    "click #addPlant":function(event)
    {
        console.log(event);
        var plantName = $("#addPlantName").val();
        var plantType = $("#addPlantType").val();
        var plantScientificName = $("#addPlantScientificName").val();
        var plantCategory = $("#addPlantCategory").val();
        var plantCost = $("#addPlantCost").val();
        var plantQuantity = $("#addPlantQuantity").val();
        var plantComments = $("#addPlantComments").val();
        var plantToBeAdded = CodeBashApp.plantDetailsVO(plantName, plantType, plantScientificName, plantCategory, plantCost, plantQuantity, plantComments);
        CodeBashApp.plantDetailsService.getInstance().addPlant(plantToBeAdded);
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
        plants = CodeBashApp.plantDetailsService.getInstance().findPlants();
        console.log("plants -- >" + plants);
        return plants;
    }
});