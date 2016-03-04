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
            if($("#newPlantCost").val()=='')
            {
             event.preventDefault();
             $("#newPlantCostGroup").addClass('form-group has-error has-feedback');                 
             $("#newPlantCostSpan").html('please enter Cost');                
            }
            else
            if($("#newPlantCost").val().length>4)
            {
             event.preventDefault();
             $("#newPlantCostGroup").addClass('form-group has-error has-feedback');                 
             $("#newPlantCostSpan").html('cost must be in max 4 digits');                
            } 
            else
            if($("#newPlantQuantity").val()=='')
            {
             event.preventDefault();
             $("#newPlantQuantityGroup").addClass('form-group has-error has-feedback');                 
             $("#newPlantQuantitySpan").html('please enter Quantity');
            }
            else
            if($("#newPlantQuantity").val().length>4)
            {
                event.preventDefault();
             $("#newPlantQuantityGroup").addClass('form-group has-error has-feedback');                 
             $("#newPlantQuantitySpan").html('plant quantity must be in max 4 digits');
            }
            else
            {
                validate = 'true';    
            }      
        }
        return validate;    
};