Template.plantDetailsTable.onRendered(
    function () 
    {
        CodeBashApp.plantDetailsOnReady();
          }//end of function
);//end of onRendered

Template.plantDetailsTable.helpers({
    update:function(){
        if(Session.get('update') == 'true')
        {
            return true;
        }
    },
       
    plantsList : function(){
                       
        plants = CodeBashApp.plantDetailsService.getInstance().findPlants();
        //console.log("plants -- >" + plants);
        return plants;
    },
    categoryList:function()
    {
        return PlantCategory.find();
    },
    typeList : function()
    {
        return PlantType.find();
    },
    updateObject:function()
    {
        if(Session.get('id'))
        {
         var obj = CodeBashApp.plantDetailsService.getInstance().findPlantById(Session.get('id'))[0];   
        }
        return obj;
    }
});

Template.plantDetailsTable.events({
    "click #dPlant":function()
    {
        Session.set('deletePlantId',this._id);
        $("#deleteModal").modal("show");    
    },
    "click #addPlantDetails":function()
    {
        Session.set('add','true');
    },
    "submit #newPlantForm":function(event)
    {        
        var validate = CodeBashApp.plantDetailsNewPlantValidate();       
        if(validate == 'true')
        {
        console.log(event);
        var plantName = event.target.newPlantName.value;
        event.target.newPlantName.value = '';
        var plantType = event.target.newPlantType.value;
        event.target.newPlantType.value = '';
        var plantScientificName = event.target.newPlantScientificName.value;
        event.target.newPlantScientificName.value = '';
        var plantCategory = event.target.newPlantCategory.value;
        event.target.newPlantCategory.value ='';
        var plantComments = event.target.newPlantComments.value;
        event.target.newPlantComments.value ='';
        var plantToBeAdded = CodeBashApp.plantDetailsVO(plantName, plantType, plantScientificName, plantCategory,plantComments);
        CodeBashApp.plantDetailsService.getInstance().addPlant(plantToBeAdded);     
        $("#new-plant").modal("hide");
        return false;
    /*  var table =  $('#list-plants').DataTable();
        table.clear();
        var dataArray = CodeBashApp.plantDetailsService.getInstance().findPlants();
        //console.log(JSON.stringify(dataArray));                
        for(var i = 0;i<dataArray.length;i++)
        {
        table.row.add([dataArray[i].name,dataArray[i].scientificName,dataArray[i].type,dataArray[i].category,dataArray[i].quantity,dataArray[i].cost,dataArray[i].comments,'<a data-toggle="modal" data-target="#edit-plant" id= "updateDetails">Edit</a> <a id="dPlant" data-toggle="modal" data-target="#deleteModal">Delete</a>']);
        }
        setTimeout(function(){table.draw();},3000);        */
      }
    
          
        
    },
    "click #updateDetails":function()
    {
        Session.set('update','true');
        Session.set('id',this._id);        
        $("#edit-plant").modal("show");
    },
    "submit #editPlantForm": function () {
        var validate = CodeBashApp.plantDetailsEditPlantValidate();
        if(validate=='true')
        {
            console.log('')
            var name = event.target.plantName.value;
            event.target.plantName.value = '';
            var plantType = event.target.plantType.value;
            event.target.plantType.value = '';
            var plantScientificName = event.target.plantScientificName.value;
            event.target.plantScientificName.value = '';
            var plantCategory = event.target.plantCategory.value;
            event.target.plantCategory.value = '';
            var plantComments = event.target.plantComments.value;
            event.target.plantComments.value = '';
            console.log("id -->" + Session.get('id'));
            CodeBashApp.plantDetailsService.getInstance().updatePlant(Session.get('id'),name,plantScientificName,plantType,plantCategory,plantComments);
            Session.set('update','');
            Session.set('id','');
            $("#edit-plant").modal("hide");
        }
        return false;
    },
    "click #deletePlant":function(){
        console.log("delete id -->"+Session.get('deletePlantId'));
        CodeBashApp.plantDetailsService.getInstance().deletePlant(Session.get('deletePlantId'));
        Session.set('deletePlantId','');
    /*    var table =  $('#list-plants').DataTable();
        table.clear();
        var dataArray = CodeBashApp.plantDetailsService.getInstance().findPlants();
        //console.log(JSON.stringify(dataArray));                
        for(var i = 0;i<dataArray.length;i++)
        {
        table.row.add([dataArray[i].name,dataArray[i].scientificName,dataArray[i].type,dataArray[i].category,dataArray[i].quantity,dataArray[i].cost,dataArray[i].comments,'<a data-toggle="modal" data-target="#edit-plant" id= "updateDetails">Edit</a> <a id="dPlant" data-toggle="modal" data-target="#deleteModal">Delete</a>']);
        }
        setTimeout(function(){table.draw();},3000);        */
       
    },
    'click #newplantmodal':function()
    {
        $("#new-plant").modal("show");
    }

});





