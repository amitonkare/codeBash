CodeBashApp.plantDetailsNewPlantValidate = function(){
   	 var validate = 'false';
        if(validate == 'false')
        {
            if($("#newPlantName").val()=='')
            {
                 event.preventDefault();
                $("#newPlantNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newPlantNameSpan").html('please enter name');                
            }
            else
                if($("#newPlantName").val().length<4 || $("#newPlantName").val().length>20)
                {
                     event.preventDefault();
                    $("#newPlantNameGroup").addClass('form-group has-error has-feedback');                 
                    $("#newPlantNameSpan").html('name should have minimum four characters and maximum 20 characters');                
         
                }
                else
            if($("#newPlantScientificName").val()=='')
            {
                 event.preventDefault();
                $("#newPlantScientificNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newPlantScientificNameSpan").html('please enter Scientific name');    
            }
            else
            if($("#newPlantScientificName").val().length<4 || $("#newPlantScientificName").val().length>20 )
            {
                event.preventDefault();
                $("#newPlantScientificNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newPlantScientificNameSpan").html('Scientific name should have four characters and maximum 20 characters');    
            }   
            else
            {
                validate = 'true';    
            }      
        }
        return validate;    
};