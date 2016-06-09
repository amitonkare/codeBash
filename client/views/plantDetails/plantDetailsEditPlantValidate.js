CodeBashApp.plantDetailsEditPlantValidate = function(){
   	 var validate = 'false';
     var flagArray = [];
     var regexWhitespace = /^\S{3,}$/;
        if(validate == 'false')
        {
            if($("#plantName").val()=='')
            {
                flagArray.push(1);
            }
            if($("#plantName").val().length<4)
            {
                flagArray.push(2);
            }
            if($("#plantScientificName").val()=='')
            {
                flagArray.push(3);
                
            }
            if($("#plantScientificName").val().length<4)
            {
                flagArray.push(4);
                
            }
            if(!regexWhitespace.test($("#plantName").val()))
            {
                console.log('regex evaluated');
                flagArray.push(5);
            }
            if(!regexWhitespace.test($("#plantScientificName").val()))
            {
                console.log('regex evaluated');
                flagArray.push(6);
            }
            if(flagArray.length == 0)
            {
                validate = 'true';    
            }      
        }
        if(validate == 'false')
        {
            for (var i = 0; i < flagArray.length; i++) {
                console.log('inside for loop');
                switch(flagArray[i])
                {
                    case 1: event.preventDefault();
                            $("#plantNameGroup").addClass('form-group has-error has-feedback');                 
                            $("#plantNameSpan").html('please enter name');                
                            break;
                    case 2: event.preventDefault();
                            $("#plantNameGroup").addClass('form-group has-error has-feedback');                 
                            $("#plantNameSpan").html('plant name must be more than 4 characters');                
                            break;
                    case 3: event.preventDefault();
                            $("#plantScientificNameGroup").addClass('form-group has-error has-feedback');                 
                            $("#plantScientificNameSpan").html('please enter Scientific name');    
                            break;
                    case 4: event.preventDefault();
                            $("#plantScientificNameGroup").addClass('form-group has-error has-feedback');                 
                            $("#plantScientificNameSpan").html('plant Scientific Name must be more than 4 characters');    
                            break;
                    case 5: event.preventDefault();
                            $("#plantNameGroup").addClass('form-group has-error has-feedback');                 
                            $("#plantNameSpan").html('plant name cannot have whitespaces');                
                            break;
                    case 6: event.preventDefault();
                            $("#plantScientificNameGroup").addClass('form-group has-error has-feedback');                 
                            $("#plantScientificNameSpan").html('Scientific name cannot have whitespaces');  
                }
            }
        }

        return validate;    
};