CodeBashApp.plantCategoryDetailsNewPlantCategoryValidate = function(Category){
	var validate = 'false';
	if(Category == '')
	{
	    $("#newPlantCategoryGroup").addClass('form-group has-error has-feedback');
	   	$("#newPlantCategorySpan").html('please Enter plant Category');
	}
	else
	if(Category < 4)
	{
		$("#newPlantCategoryGroup").addClass('form-group has-error has-feedback');
	   	$("#newPlantCategorySpan").html('plant Category must be minimum 4 characters');	
	}
	else
	{
	 	validate = true;
	}
	return validate;
};