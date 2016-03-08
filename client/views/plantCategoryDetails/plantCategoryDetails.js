Template.plantCategoryDetails.onRendered(function(){
	CodeBashApp.plantCategoryDetailsOnReady();
});

Template.plantCategoryDetails.helpers({
	categoryList : function()
    {
        return CodeBashApp.plantCategoryService.getInstance().findPlantCategory();
    }

});
Template.plantCategoryDetails.events({
	"submit #newPlantCategoryForm":function(event)
	{
		event.preventDefault();
		var Category = event.target.newPlantCategory.value;
		var validate = CodeBashApp.plantCategoryDetailsNewPlantCategoryValidate(Category);
		if(validate==true)
		{
			var newCategory= CodeBashApp.plantCategoryVO(Category);
			CodeBashApp.plantCategoryService.getInstance().addPlantCategory(newCategory);
		}
	},
	"click #dCategory":function()
	{
		Session.set('deleteId',this._id);
	},
	"click #deleteCategory":function(event)
	{
		CodeBashApp.plantCategoryService.getInstance().deletePlantCategory(Session.get('deleteId'));
		Session.set('deleteId','');
		event.preventDefault();
	},
	"click #updateDetails":function()
	{
		Session.set('editId',this._id);	
	},
	"submit #editPlantCategoryForm":function(event)
	{
		event.preventDefault();
		Category = event.target.PlantCategory.value;//$("#PlantCategory").val();
		console.log(Category);
		CodeBashApp.plantCategoryService.getInstance().updatePlantCategory(Session.get('editId'),Category);
		Session.set('editId','');	
		$("#edit-plant-Category").modal('hide');
	},
	"click #deleteCategory":function(event)
	{
		CodeBashApp.plantCategoryService.getInstance().deletePlantCategory(Session.get('deleteId'));
		Session.set('deleteId','');
		event.preventDefault();
	}

});