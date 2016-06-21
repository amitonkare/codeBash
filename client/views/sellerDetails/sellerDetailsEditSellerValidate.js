CodeBashApp.sellerDetailsEditSellerValidate=function(){
  var validate = 'false';
  var flagArray=[];
  var regexIFSC = /^[^\s]{4}\d{7}$/;
  var regexWhitespace = /^\S{3,}$/;
  var specialCharRegex = /[^\w\s]/gi;
  var str;
  if(validate == 'false')
  {
    if($("#sellerName").val()=='')
    {
        flagArray.push(1); 
    }
    
    if($("#sellerName").val().length>30)
    {
        str = $.trim($("#sellerName").val());
        var cleaned = str.replace(/\s+/g, "");
        if(cleaned.length > 30)
        {
            flagArray.push(2); 
        }
    }
    
    if($("#sellerAddress").val()=='')
    {
        flagArray.push(3);    
    }
    
    if($("#sellerAddress").val().length>90)
    {
        str = $.trim($("#sellerAddress").val());
        var cleaned = str.replace(/\s+/g, "");
        if(cleaned.length > 30)
        {
            flagArray.push(4); 
        }
    }
    
    if($("#sellerPhoneNo").val()=='')
    {
        flagArray.push(5);                
    }
    
    if($("#sellerPhoneNo").val().length>10)
    {
        flagArray.push(6);
    }
    
    if($("#sellerEmailId").val())
    {
        if(!validateEmail($("#sellerEmailId").val()))
        {
            flagArray.push(7); 
        } 
    }
    
    
    if($("#bankName").val()=='')
    {
        flagArray.push(8);
    }
    
    if($("#bankName").val().length > 50)
    {
        str = $.trim($("#bankName").val());
        var cleaned = str.replace(/\s+/g, "");
        if(cleaned.length > 50)
        {
            flagArray.push(9); 
        }   
    }
    
    
    if($("#branchName").val()=='')
    {
        flagArray.push(10); 
    }
    
    if($("#branchName").val().length > 50)
    {
        str = $.trim($("#branchName").val());
        var cleaned = str.replace(/\s+/g, "");
        if(cleaned.length > 50)
        {
            flagArray.push(11); 
        }   
    }
    
    if($("#IFSC").val()=='')
    {
        flagArray.push(12);
    }
    
    if($("#IFSC").val().length!=11 || $("#IFSC").val().length < 11 )
    {
        flagArray.push(13);
    }
    
    if($("#IFSC").val().length > 11 )
    {
        flagArray.push(14); 
    }	
    if($("#accountNumber").val()=='')
    {
        flagArray.push(15); 
    }  
    if($("#accountNumber").val().length!=15)
    {
        flagArray.push(16); 
    }
    if($("#accountNumber").val()!= $("#confirmAccountNumber").val())
    {
        flagArray.push(17); 
    }
    if (!regexIFSC.test($("#IFSC").val()))
    {
        console.log('regex evaluated');
        flagArray.push(18);
    }
    if(!regexWhitespace.test($("#sellerName").val()))
    {
        if($.trim($("#sellerName").val()).length == 0)
        {
            flagArray.push(19);
        }
    }
    if(!regexWhitespace.test($("#sellerAddress").val()))
    {
        if($.trim($("#sellerAddress").val()).length == 0)
        {
            flagArray.push(20);
        }
    }
    if(!regexWhitespace.test($("#bankName").val()))
    {
        if($.trim($("#bankName").val()).length == 0)
        {
            flagArray.push(21);
        }
    }
    if(!regexWhitespace.test($("#branchName").val()))
    {
        if($.trim($("#branchName").val()).length == 0)
        {
            flagArray.push(22);
        }
    }
    if(specialCharRegex.test($("#bankName").val()))
    {
        flagArray.push(23);
    }
    if(specialCharRegex.test($("#branchName").val()))
    {
        flagArray.push(24);
    }
    if(specialCharRegex.test($("#sellerName").val()))
    {
        flagArray.push(25);
    }    
    if(flagArray.length == 0)
    {
        validate = 'true';    
    }      
}
if(validate != 'true')
{
    for (var i = 0; i < flagArray.length; i++) {
        console.log('inside for loop');
        switch(flagArray[i])
        {
            case 1: event.preventDefault();
            $("#sellerNameGroup").addClass('form-group has-error has-feedback');                 
            $("#sellerNameSpan").html('please enter name');                
            break;
            case 2:event.preventDefault();
            $("#sellerNameGroup").addClass('form-group has-error has-feedback');                 
            $("#sellerNameSpan").html('name should be maximum 30 characters');                   
            break;
            case 3:event.preventDefault();
            $("#sellerAddressGroup").addClass('form-group has-error has-feedback');                 
            $("#sellerAddressSpan").html('please enter address');
            break;
            case 4: event.preventDefault();
            $("#sellerAddressGroup").addClass('form-group has-error has-feedback');                 
            $("#sellerAddressSpan").html('Seller  address must be maxmimum 90 characters');    
            break;
            case 5:event.preventDefault();
            $("#sellerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
            $("#sellerPhoneNoSpan").html('please enter Phone no');
            break;
            case 6:event.preventDefault();
            $("#sellerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
            $("#sellerPhoneNoSpan").html('phone no must be maximum 10 characters');                
            break;
            case 7: event.preventDefault();
            $("#sellerEmailIdGroup").addClass('form-group has-error has-feedback');                 
            $("#sellerEmailIdSpan").html('please enter valid emailId');
            break;
            case 8: event.preventDefault();
            $("#bankNameGroup").addClass('form-group has-error has-feedback');                 
            $("#bankNameSpan").html('please enter bank Name');
            break;
            case 9: event.preventDefault();
            $("#bankNameGroup").addClass('form-group has-error has-feedback');                 
            $("#bankNameSpan").html('bank name must be max 50 characters');
            break;
            case 10:event.preventDefault();
            $("#branchNameGroup").addClass('form-group has-error has-feedback');                 
            $("#branchNameSpan").html('please enter branchName');
            break;
            case 11:event.preventDefault();
            $("#branchNameGroup").addClass('form-group has-error has-feedback');                 
            $("#branchNameSpan").html('branchName must be max 50 characters');
            break;
            case 12:event.preventDefault();
            $("#IFSCGroup").addClass('form-group has-error has-feedback');                 
            $("#IFSCSpan").html('please enter IFSC code');
            break;
            case 13:event.preventDefault();
            $("#IFSCGroup").addClass('form-group has-error has-feedback');                 
            $("#IFSCSpan").html('IFSC code must be 11 characters');
            break;
            case 14:event.preventDefault();
            $("#IFSCGroup").addClass('form-group has-error has-feedback');                 
            $("#IFSCSpan").html('IFSC code must be 11 characters');
            break;
            case 15:event.preventDefault();
            $("#accountNumberGroup").addClass('form-group has-error has-feedback');                 
            $("#accountNumberSpan").html('please enter account Number');
            break;
            case 16:event.preventDefault();
            $("#accountNumberGroup").addClass('form-group has-error has-feedback');                 
            $("#accountNumberSpan").html('bank account Number must be 15 characters');
            break;
            case 17:event.preventDefault();
            $("#accountNumberGroup").addClass('form-group has-error has-feedback');                 
            $("#accountNumberSpan").html('bank account Number and confirm bank Account number must be same');
            $("#confirmAccountNumberGroup").addClass('form-group has-error has-feedback');                 
            $("#confirmAccountNumberSpan").html('bank account Number and confirm bank Account number must be same');
            
            break;
            case 18:event.preventDefault();
            $("#IFSCGroup").addClass('form-group has-error has-feedback');                 
            $("#IFSCSpan").html('please enter valid IFSC code');
            break;
            case 19: event.preventDefault();
            $("#sellerNameGroup").addClass('form-group has-error has-feedback');                 
            $("#sellerNameSpan").html('name cannot have white space');
            break;
            case 20:event.preventDefault();
            $("#sellerAddressGroup").addClass('form-group has-error has-feedback');                 
            $("#sellerAddressSpan").html('Address cannot have white space');
            break;
            case 21:event.preventDefault();
            $("#bankNameGroup").addClass('form-group has-error has-feedback');                 
            $("#bankNameSpan").html(' bank Name cannot have white space');
            break;
            case 22:event.preventDefault();
            $("#branchNameGroup").addClass('form-group has-error has-feedback');                 
            $("#branchNameSpan").html('BranchName cannot have white space');
            break;
            case 23:event.preventDefault();
            $("#bankNameGroup").addClass('form-group has-error has-feedback');                 
            $("#bankNameSpan").html(' bank Name cannot have special symbols');
            break;
            case 24:event.preventDefault();
            $("#branchNameGroup").addClass('form-group has-error has-feedback');                 
            $("#branchNameSpan").html('BranchName cannot have special symbols');
            break;
            case 25: event.preventDefault();
            $("#sellerNameGroup").addClass('form-group has-error has-feedback');                 
            $("#sellerNameSpan").html('name cannot have special symbols');
            break;
        }
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
    
    {
        return true;
    }
}


