Template.plantTypeDetails.onRendered(function(){
	CodeBashApp.plantTypeDetailsOnReady();
});

Template.plantTypeDetails.helpers({
	typeList : function()
    {
        return CodeBashApp.plantTypeService.getInstance().findPlantType();
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
		event.preventDefault();
		type = event.target.PlantType.value;//$("#PlantType").val();
		console.log(type);
		CodeBashApp.plantTypeService.getInstance().updatePlantType(Session.get('editId'),type);
		Session.set('editId','');	
		$("#edit-plant-type").modal('hide');
	},
	"click #deleteType":function(event)
	{
		CodeBashApp.plantTypeService.getInstance().deletePlantType(Session.get('deleteId'));
		Session.set('deleteId','');
		event.preventDefault();
	}

});