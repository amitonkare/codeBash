CodeBashApp.plantDetailsEditPlantValidate = function(){
   	 var validate = 'false';
        if(validate == 'false')
        {
            if($("#plantName").val()=='')
            {
                event.preventDefault();
                $("#PlantNameGroup").addClass('form-group has-error has-feedback');                 
                $("#PlantNameSpan").html('please enter name');                
            }
            else
            if($("#plantName").val().length<4)
            {
                event.preventDefault();
                $("#PlantNameGroup").addClass('form-group has-error has-feedback');                 
                $("#PlantNameSpan").html('plant name must be more than 4 characters');                
            }
            else
            if($("#plantScientificName").val()=='')
            {
                event.preventDefault();
                $("#PlantScientificNameGroup").addClass('form-group has-error has-feedback');                 
                $("#PlantScientificNameSpan").html('please enter Scientific name');    
            }
            else
            if($("#plantScientificName").val().length<4)
            {
                event.preventDefault();
                $("#PlantScientificNameGroup").addClass('form-group has-error has-feedback');                 
                $("#PlantScientificNameSpan").html('plant Scientific Name must be more than 4 characters');    
            }
            else
            {
                validate = 'true';    
            }      
        }
        return validate;    
};


