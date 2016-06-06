Template.plantCategoryDetails.onRendered(function(){
	CodeBashApp.plantCategoryDetailsOnReady();
});

Template.plantCategoryDetails.helpers({
	categoryList : function()
    {
        return CodeBashApp.plantCategoryService.getInstance().findPlantCategory();
    },
    editObj:function()
    {
    	return CodeBashApp.plantCategoryService.getInstance().findPlantCategoryById(Session.get('editId'))[0];
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
		existingCategory = CodeBashApp.plantCategoryService.getInstance().findPlantCategoryById(Session.get('editId'))[0].category;
		if(Category == '')
		{
	    	$("#PlantCategoryGroup").addClass('form-group has-error has-feedback');
	   		$("#PlantCategorySpan").html('please Enter plant Category');
		}
		else
		if(Category == existingCategory)
		{
	    	$("#PlantCategoryGroup").addClass('form-group has-error has-feedback');
	   		$("#PlantCategorySpan").html('Category already exists');
		}
		else
		if(Category.length < 4)
		{
			$("#PlantCategoryGroup").addClass('form-group has-error has-feedback');
	   		$("#PlantCategorySpan").html('plant Category must be minimum 4 characters');	
		}
		else
		{
		CodeBashApp.plantCategoryService.getInstance().updatePlantCategory(Session.get('editId'),Category);
		Session.set('editId','');	
		$("#edit-plant-Category").modal('hide');
		}
	},
	"click #deleteCategory":function(event)
	{
		CodeBashApp.plantCategoryService.getInstance().deletePlantCategory(Session.get('deleteId'));
		Session.set('deleteId','');
		event.preventDefault();
	}

});