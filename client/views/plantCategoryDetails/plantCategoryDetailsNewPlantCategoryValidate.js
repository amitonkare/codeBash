CodeBashApp.plantCategoryDetailsNewPlantCategoryValidate = function(Category){
	var validate = 'false';
	var regexWhitespace = /^\S{3,}$/;
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
	if(!regexWhitespace.test(Category))
    {
    	$("#newPlantCategoryGroup").addClass('form-group has-error has-feedback');
	   	$("#newPlantCategorySpan").html('plant Category cannot have white spaces');		
    }
	else
	{
	 	validate = true;
	}
	return validate;
};