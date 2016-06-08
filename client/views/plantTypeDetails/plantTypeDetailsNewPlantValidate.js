CodeBashApp.plantTypeDetailsTableNewPlantTypeValidate = function(type){
	var validate = 'false';
	if(type == '')
	{
	    $("#newPlantTypeGroup").addClass('form-group has-error has-feedback');
	   	$("#newPlantTypeSpan").html('please Enter plant Type');
	}
	else
	if(type.length < 4)
	{
		$("#newPlantTypeGroup").addClass('form-group has-error has-feedback');
	   	$("#newPlantTypeSpan").html('plant Type must be minimum 4 characters');	
	}
	else
	{
	 	validate = true;
	}
	return validate;
};