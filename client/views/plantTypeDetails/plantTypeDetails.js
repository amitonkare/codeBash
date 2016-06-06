Template.plantTypeDetails.onRendered(function(){
	CodeBashApp.plantTypeDetailsOnReady();
});

Template.plantTypeDetails.helpers({
	typeList : function()
    {
        return CodeBashApp.plantTypeService.getInstance().findPlantType();
    },
    editObj:function()
    {
    	return CodeBashApp.plantTypeService.getInstance().findPlantTypeById(Session.get('editId'))[0];
    }

});
Template.plantTypeDetails.events({
	"submit #newPlantTypeForm":function(event)
	{
		event.preventDefault();
		var type = event.target.newPlantType.value;
		var validate = CodeBashApp.plantTypeDetailsNewPlantTypeValidate(type);
		if(validate==true)
		{
			var newType= CodeBashApp.plantTypeVO(type);
			CodeBashApp.plantTypeService.getInstance().addPlantType(newType);
		}
	},
	"click #dType":function()
	{
		Session.set('deleteId',this._id);
	},
	"click #deleteType":function(event)
	{
		CodeBashApp.plantTypeService.getInstance().deletePlantType(Session.get('deleteId'));
		Session.set('deleteId','');
		event.preventDefault();
	},
	"click #updateDetails":function()
	{
		Session.set('editId',this._id);	
	},
	"submit #editPlantTypeForm":function(event)
	{
		type = event.target.PlantType.value;//$("#PlantType").val();
		console.log(type);
		existingType = CodeBashApp.plantTypeService.getInstance().findPlantTypeById(Session.get('editId'))[0].type;
		if(type == '')
		{
	    	$("#PlantTypeGroup").addClass('form-group has-error has-feedback');
	   		$("#PlantTypeSpan").html('please Enter plant Type');
		}
		else
		if(type.length < 4)
		{
			$("#PlantTypeGroup").addClass('form-group has-error has-feedback');
	   		$("#PlantTypeSpan").html('plant Type must be minimum 4 characters');	
		}
		else
		if(type == existingType)
		{
			$("#PlantTypeGroup").addClass('form-group has-error has-feedback');
	   		$("#PlantTypeSpan").html('plant Type already exists');
		}
		else{
		CodeBashApp.plantTypeService.getInstance().updatePlantType(Session.get('editId'),type);
		Session.set('editId','');	
		$("#edit-plant-type").modal('hide');
		}
		return false;
	},
	"click #deleteType":function(event)
	{
		CodeBashApp.plantTypeService.getInstance().deletePlantType(Session.get('deleteId'));
		Session.set('deleteId','');
		event.preventDefault();
	}

});