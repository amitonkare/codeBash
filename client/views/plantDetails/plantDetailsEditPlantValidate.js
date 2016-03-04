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
            if($("#plantCost").val()=='')
            {
                event.preventDefault();
                $("#PlantCostGroup").addClass('form-group has-error has-feedback');                 
                $("#PlantCostSpan").html('please enter Cost');                
            }
            else     
            if($("#plantCost").val().length>4)
            {
                event.preventDefault();
                $("#PlantCostGroup").addClass('form-group has-error has-feedback');                 
                $("#PlantCostSpan").html('plant cost must have max 4 digits');                
            }
            else
            if($("#plantQuantity").val()=='')
            {
                event.preventDefault();
                $("#PlantQuantityGroup").addClass('form-group has-error has-feedback');                 
                $("#PlantQuantitySpan").html('please enter Quantity');
            }
            else
            if($("#plantQuantity").val().length>4)
            {
                event.preventDefault();
                $("#PlantQuantityGroup").addClass('form-group has-error has-feedback');                 
                $("#PlantQuantitySpan").html('Quantity must be maximum 4 digits');
            }
            else
            {
                $("#PlantQuantityGroup,#PlantCostGroup,#PlantScientificNameGroup,#PlantNameGroup").addClass('form-group has-success has-feedback');
                validate = 'true';    
            }      
        }
        return validate;    
};


