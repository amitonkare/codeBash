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
    },
    "click #addPlantDetails":function()
    {
        Session.set('add','true');
    },
    "submit #newPlantForm":function(event)
    {
        event.preventDefault();
        var validate = CodeBashApp.plantDetailsNewPlantValidate();       
        if(validate == 'true')
        {
        console.log(event);
        var plantName = $("#newPlantName").val(); 
        var plantType = $("#newPlantType").val();
        var plantScientificName = $("#newPlantScientificName").val();
        var plantCategory = $("#newPlantCategory").val();
        var plantCost = $("#newPlantCost").val();
        var plantQuantity = $("#newPlantQuantity").val();
        var plantComments = $("#newPlantComments").val();
        var plantToBeAdded = CodeBashApp.plantDetailsVO(plantName, plantType, plantScientificName, plantCategory, plantCost, plantQuantity, plantComments);
        CodeBashApp.plantDetailsService.getInstance().addPlant(plantToBeAdded);     
        var obj = CodeBashApp.plantDetailsService.getInstance().findPlantByScientificName(plantScientificName);
        console.log(obj);
        var stockObj ={}
        console.log(JSON.stringify(obj));
        stockObj.plantId = obj[0]._id;
        stockObj.quantity = obj[0].quantity;
        stockObj.avgCost = obj[0].cost;
        CodeBashApp.stockDetailsService.getInstance().addStock(stockObj);
        $("#new-plant").modal("toggle");
        /*var table =  $('#list-plants').DataTable();
        table.clear();
        var dataArray = CodeBashApp.plantDetailsService.getInstance().findPlants();
        //console.log(JSON.stringify(dataArray));                
        var obj={};
        obj = JSON.stringify(dataArray);
        table.rows.add(obj);
        setTimeout(function(){table.draw();},30000);        */
        
        
        
        //window.location.reload();
        }
       /* var table =  $('#list-plants').DataTable();
        table.clear();
        var dataArray = CodeBashApp.plantDetailsService.getInstance().findPlants();
        console.log(JSON.stringify(dataArray));         
       
          */ 
          
        
    },
    "click #updateDetails":function()
    {
        Session.set('update','true');
        Session.set('id',this._id);        
    },
    "submit #editPlantForm": function () {
        event.preventDefault();
        var validate = CodeBashApp.plantDetailsEditPlantValidate();
        if(validate=='true')
        {
            console.log('')
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
            $("#edit-plant").modal("toggle");
        }
    },
    "click #deletePlant":function(){
        console.log("delete id -->"+Session.get('deletePlantId'));
        CodeBashApp.plantDetailsService.getInstance().deletePlant(Session.get('deletePlantId'));
        CodeBashApp.stockDetailsService.getInstance().deleteStockByPlantId(Session.get('deletePlantId'));
        Session.set('deletePlantId','');

       /* var table =  $('#list-plants').DataTable();
        table.clear();
        var dataArray = CodeBashApp.plantDetailsService.getInstance().findPlants();*/        
    }
});





