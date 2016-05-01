CodeBashApp.buyerDetailsEditBuyerValidate=function(){
  var validate = 'false';
  if(validate == 'false')
  {
    if($("#buyerName").val()=='')
    {
        event.preventDefault();
        $("#buyerNameGroup").addClass('form-group has-error has-feedback');                 
        $("#buyerNameSpan").html('please enter name');                
    }
    else
        if($("#buyerName").val().length>30)
        {
            event.preventDefault();
            $("#buyerNameGroup").addClass('form-group has-error has-feedback');                 
            $("#buyerNameSpan").html('name should be maximum 30 characters');                   
        }
        else
            if($("#buyerAddress").val()=='')
            {
                event.preventDefault();
                $("#buyerAddressGroup").addClass('form-group has-error has-feedback');                 
                $("#buyerAddressSpan").html('please enter address');    
            }
            else
                if($("#buyerAddress").val().length>90)
                {
                    event.preventDefault();
                    $("#buyerAddressGroup").addClass('form-group has-error has-feedback');                 
                    $("#buyerAddressSpan").html('buyer  address must be maxmimum 90 characters');    
                }
                else
                    if($("#buyerPhoneNo").val()=='')
                    {
                        event.preventDefault();
                        $("#buyerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
                        $("#buyerPhoneNoSpan").html('please enter Phone no');                
                    }
                    else
                        if($("#buyerPhoneNo").val().length>10)
                        {
                            event.preventDefault();
                            $("#buyerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
                            $("#buyerPhoneNoSpan").html('phone no must be maximum 10 characters');                
                        }
                        else 
                            if($("#buyerEmailId").val()=='')
                            {
                                event.preventDefault();
                                $("#buyerEmailIdGroup").addClass('form-group has-error has-feedback');                 
                                $("#buyerEmailIdSpan").html('please enter emailId');
                            }
                            else 
                                if(!validateEmail($("#buyerEmailId").val()))
                                {
                                    event.preventDefault();
                                    $("#buyerEmailIdGroup").addClass('form-group has-error has-feedback');                 
                                    $("#buyerEmailIdSpan").html('please enter valid emailId');
                                }
                                else
                                    if($("#bankName").val()=='')
                                    {
                                        event.preventDefault();
                                        $("#bankNameGroup").addClass('form-group has-error has-feedback');                 
                                        $("#bankNameSpan").html('please enter bank Name');
                                    }
                                    else
                                        if($("#bankName").val().length>10)
                                        {
                                            event.preventDefault();
                                            $("#bankNameGroup").addClass('form-group has-error has-feedback');                 
                                            $("#bankNameSpan").html('bank name must be max 10 characters');
                                        }
                                        
                                        else
                                            if($("#branchName").val()=='')
                                            {
                                                event.preventDefault();
                                                $("#branchNameGroup").addClass('form-group has-error has-feedback');                 
                                                $("#branchNameSpan").html('please enter branchName');
                                            }
                                            else
                                                if($("#branchName").val().length>10)
                                                {
                                                    event.preventDefault();
                                                    $("#branchNameGroup").addClass('form-group has-error has-feedback');                 
                                                    $("#branchNameSpan").html('branchName must be max 10 characters');
                                                }
                                                else
                                                    if($("#IFSC").val()=='')
                                                    {
                                                        event.preventDefault();
                                                        $("#IFSCGroup").addClass('form-group has-error has-feedback');                 
                                                        $("#IFSCSpan").html('please enter IFSC code');
                                                    }
                                                    else
                                                        if($("#IFSC").val().length!=11)
                                                        {
                                                            event.preventDefault();
                                                            $("#IFSCGroup").addClass('form-group has-error has-feedback');                 
                                                            $("#IFSCSpan").html('IFSC code must be 11 characters');
                                                        }
                                                        else
                                                            if($("#IFSC").val().length < 11 || $("#IFSC").val().length > 11)
                                                            {
                                                                event.preventDefault();
                                                                $("#IFSCGroup").addClass('form-group has-error has-feedback');                 
                                                                $("#IFSCSpan").html('IFSC code must be 11 characters');
                                                            }
                                                            else	
                                                                if($("#accountNumber").val()=='')
                                                                {
                                                                    event.preventDefault();
                                                                    $("#accountNumberGroup").addClass('form-group has-error has-feedback');                 
                                                                    $("#accountNumberSpan").html('please enter account Number');
                                                                }
                                                                else   
                                                                    if($("#accountNumber").val().length!=15)
                                                                    {
                                                                        event.preventDefault();
                                                                        $("#accountNumberGroup").addClass('form-group has-error has-feedback');                 
                                                                        $("#accountNumberSpan").html('bank account Number must be 15 characters');
                                                                    }
                                                                    else
                                                                    {
                                                                        validate = 'true';    
                                                                    }      
                                                                }
                                                                return validate;    
                                                            };

                                                            function validateEmail(x) {
                                                                var atpos = x.indexOf("@");
                                                                var dotpos = x.lastIndexOf(".");
                                                                if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
                                                                    return false;
                                                                }
                                                                else
                                                                {
                                                                    return true;
                                                                }
                                                            }


