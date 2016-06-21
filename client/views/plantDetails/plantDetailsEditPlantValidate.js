CodeBashApp.plantDetailsEditPlantValidate = function(){
   	 var validate = 'false';
     var flagArray = [];
     var regexWhitespace = /^\S{3,}$/;
     var specialCharRegex = /[^\w\s]/gi;
     var str;
        if(validate == 'false')
        {
            if($("#plantName").val()=='')
            {
                flagArray.push(1);
            }
            if($("#plantName").val().length<4)
            {
                str = $.trim($("#plantName").val());
                var cleaned = str.replace(/\s+/g, "");
                if(cleaned.length > 20 || cleaned.length<4)
                {
                    flagArray.push(2); 
                }
                
            }
            if($("#plantScientificName").val()=='')
            {
                flagArray.push(3);
                
            }
            if($("#plantScientificName").val().length<4)
            {
                str = $.trim($("#plantScientificName").val());
                var cleaned = str.replace(/\s+/g, "");
                if(cleaned.length > 20 || cleaned.length<4)
                {
                    flagArray.push(4); 
                }                
            }
            if(!regexWhitespace.test($("#plantName").val()))
            {
                if($.trim($("#plantName").val()).length == 0)
                {
                    flagArray.push(5);
                }
            }
            if(!regexWhitespace.test($("#plantScientificName").val()))
            {
                if($.trim($("#plantScientificName")).val().length == 0)
                {
                    flagArray.push(6);
                }
            }
            if(specialCharRegex.test($("#plantName").val()))
            {
                flagArray.push(7);
            }
            if(specialCharRegex.test($("#plantScientificName").val()))
            {
                flagArray.push(8);
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
                    case 7: event.preventDefault();
                            $("#plantNameGroup").addClass('form-group has-error has-feedback');                 
                            $("#plantNameSpan").html('plant name cannot have special symbols');                
                            break;
                    case 8: event.preventDefault();
                            $("#plantScientificNameGroup").addClass('form-group has-error has-feedback');                 
                            $("#plantScientificNameSpan").html('Scientific name cannot have special symbols' );    
                            break;
                
                }
            }
        }

        return validate;    
};