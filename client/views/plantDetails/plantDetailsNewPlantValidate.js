CodeBashApp.plantDetailsNewPlantValidate = function(){
   	 var validate = 'false';
     var flagArray = [];
        if(validate == 'false')
        {
            if($("#newPlantName").val()=='')
            {
                flagArray.push(1);        
            }
            if($("#newPlantName").val().length<4 || $("#newPlantName").val().length>20)
            {
               flagArray.push(2);                        
            }   
            if($("#newPlantScientificName").val()=='')
            {
                flagArray.push(3);
            }
            if($("#newPlantScientificName").val().length<4 || $("#newPlantScientificName").val().length>20 )
            {
                flagArray.push(4);                    
            }  
            if(flagArray.length == 0)
            {
                validate = "true";
                console.log("validate value-->"+validate);
            }       
        }
        for(var i=0;i<4;i++)
        {
            console.log("index-->"+i+"  value="+flagArray[i]);
        }
     
        if(validate !='true')
        {

            for (var i = 0; i < flagArray.length; i++) {
                console.log('inside for loop');
                switch(flagArray[i])
                {
                    case 1: $("#newPlantNameGroup").addClass('form-group has-error has-feedback');                 
                            $("#newPlantNameSpan").html('please enter name');
                            break;
                    case 2: $("#newPlantNameGroup").addClass('form-group has-error has-feedback');                 
                            $("#newPlantNameSpan").html('name should have minimum four characters and maximum 20 characters');                
                            break;
                    case 3: $("#newPlantScientificNameGroup").addClass('form-group has-error has-feedback');                 
                            $("#newPlantScientificNameSpan").html('please enter Scientific name');               
                            break;
                    case 4: $("#newPlantScientificNameGroup").addClass('form-group has-error has-feedback');                 
                            $("#newPlantScientificNameSpan").html('Scientific name should have four characters and maximum 20 characters');    
                            break;
                }
            };
        }
        return validate;    
};