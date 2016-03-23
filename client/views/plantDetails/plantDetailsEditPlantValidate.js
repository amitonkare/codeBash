CodeBashApp.plantDetailsEditPlantValidate = function(){
   	 var validate = 'false';
        if(validate == 'false')
        {
            if($("#plantName").val()=='')
            {
                event.preventDefault();
                $("#plantNameGroup").addClass('form-group has-error has-feedback');                 
                $("#plantNameSpan").html('please enter name');                
            }
            else
            if($("#plantName").val().length<4)
            {
                event.preventDefault();
                $("#plantNameGroup").addClass('form-group has-error has-feedback');                 
                $("#plantNameSpan").html('plant name must be more than 4 characters');                
            }
            else
            if($("#plantScientificName").val()=='')
            {
                event.preventDefault();
                $("#plantScientificNameGroup").addClass('form-group has-error has-feedback');                 
                $("#plantScientificNameSpan").html('please enter Scientific name');    
            }
            else
            if($("#plantScientificName").val().length<4)
            {
                event.preventDefault();
                $("#plantScientificNameGroup").addClass('form-group has-error has-feedback');                 
                $("#plantScientificNameSpan").html('plant Scientific Name must be more than 4 characters');    
            }
            else
            {
                validate = 'true';    
            }      
        }
        return validate;    
};


