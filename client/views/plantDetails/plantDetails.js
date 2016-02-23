Template.plantDetailsTable.onRendered(
    function () 
    {
        $(document).ready(function () {
            $('#list-plants').DataTable();
            $(".tool-tip").tooltip();
        });

            $("#newPlantCost,#plantCost").keydown(function(event) {
    // Allow only backspace and delete
    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 190) {
        // let it happen, don't do anything
    }
    else {
        // Ensure that it is a number and stop the keypress
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault(); 
                }   
            }
        });

    $("#newPlantQuantity,#plantQuantity").keydown(function(event) {
    // Allow only backspace and delete
    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 ) {
        // let it happen, don't do anything
    }
    else {
        // Ensure that it is a number and stop the keypress
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault(); 
                }   
            }
        });

    //validation code
    $('#newPlantForm,#editPlantForm').validate({
    rules: {
        newPlantName: {
            minlength: 2,
            required: true
        },
        newPlantScientificName: {
            minlength: 2,
            required: true
        },
        newPlantComments: {
            minlength: 2,
            required: true
        },
        newPlantCost: {
            minlength: 2,
            required: true
        },
        newPlantQuantity: {
            minlength: 2,
            required: true
        },
        plantName: {
            minlength: 2,
            required: true
        },
        plantScientificName: {
            minlength: 2,
            required: true
        },
        plantComments: {
            minlength: 2,
            required: true
        },
        plantCost: {
            minlength: 2,
            required: true
        },
        plantQuantity: {
            minlength: 2,
            required: true
        },
    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        element.text('OK!').addClass('valid')
            .closest('.control-group').removeClass('error').addClass('success');
    }


});









    }//end of function
);//end of onRendered

Template.plantDetailsTable.events({
    "click #dPlant":function()
    {
        Session.set('deleteId',this._id);
    },
    "click #addPlantDetails":function()
    {
        Session.set('add','true');
    },
    "click #addPlant":function(event)
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
        Session.set('add',''); 
        var table = $('#list-plants').DataTable();
        table.ajax.reload();
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
        var table = $('#list-plants').DataTable();
        table.ajax.reload();
    },
    "click #deletePlant": function () {
        console.log("delete id -->"+Session.get('deleteId'));
        CodeBashApp.plantDetailsService.getInstance().deletePlant(Session.get('deleteId'));
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
        /*if(Session.get('searchKey')) 
         {              
         plants = CodeBashApp.plantDetailsService.getInstance().findPlantByName(Session.get('searchKey')); 
         return plants;
        }
        if(Session.get('searchType'))
        {
         plants = CodeBashApp.plantDetailsService.getInstance().findPlantByType(Session.get('searchType')); 
         return plants;   
        }  */                
        plants = CodeBashApp.plantDetailsService.getInstance().findPlants();
        console.log("plants -- >" + plants);
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