Template.plantTypeDetailsTable.onRendered(function(){
	CodeBashApp.plantTypeDetailsTableOnReady();
});

Template.plantTypeDetailsTable.helpers({
	typeList : function()
	{
		return CodeBashApp.plantTypeService.getInstance().findPlantType();
	},
	editObj:function()
	{
		return CodeBashApp.plantTypeService.getInstance().findPlantTypeById(Session.get('editId'))[0];
	}

});
Template.plantTypeDetailsTable.events({
	"submit #newPlantTypeForm":function(event)
	{
		event.preventDefault();
		var type = event.target.newPlantType.value;
		var validate = CodeBashApp.plantTypeDetailsTableNewPlantTypeValidate(type);
		if(validate==true)
		{
			var newType= CodeBashApp.plantTypeVO(type);
			CodeBashApp.plantTypeService.getInstance().addPlantType(newType);
			Router.current().render(Template.plantTypeDetails);
			Router.current().render(Template.plantTypeDetailsTable);
		}

	},
	"click #dType":function()
	{
		$("#deleteModal").modal("show");    
		Session.set('deleteId',this._id);
	},
	"click #deleteType":function(event)
	{
		CodeBashApp.plantTypeService.getInstance().deletePlantType(Session.get('deleteId'));
		Session.set('deleteId','');
		$("#deleteModal").modal("hide");    
		$("#rootDiv").remove();
		Router.current().render(Template.plantTypeDetails);
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