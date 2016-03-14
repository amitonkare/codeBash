CodeBashApp.sellerDetailsEditSellerValidate=function(){
	   	 var validate = 'false';
        if(validate == 'false')
        {
            if($("#sellerName").val()=='')
            {
                event.preventDefault();
                $("#sellerNameGroup").addClass('form-group has-error has-feedback');                 
                $("#sellerNameSpan").html('please enter name');                
            }
            else
            if($("#sellerName").val().length>30)
            {
                event.preventDefault();
                $("#sellerNameGroup").addClass('form-group has-error has-feedback');                 
                $("#sellerNameSpan").html('name should be maximum 30 characters');                   
            }
            else
            if($("#sellerAddress").val()=='')
            {
                event.preventDefault();
                $("#sellerAddressGroup").addClass('form-group has-error has-feedback');                 
                $("#sellerAddressSpan").html('please enter address');    
            }
            else
            if($("#sellerAddress").val().length>90)
            {
                event.preventDefault();
                $("#sellerAddressGroup").addClass('form-group has-error has-feedback');                 
                $("#sellerAddressSpan").html('Seller  address must be maxmimum 90 characters');    
            }
            else
            if($("#sellerPhoneNo").val()=='')
            {
                event.preventDefault();
                $("#sellerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
                $("#sellerPhoneNoSpan").html('please enter Phone no');                
            }
            else
            if($("#sellerPhoneNo").val().length>10)
            {
                event.preventDefault();
                $("#sellerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
                $("#sellerPhoneNoSpan").html('phone no must be maximum 10 characters');                
            }
            else 
            if($("#sellerEmailId").val()=='')
            {
                event.preventDefault();
                $("#sellerEmailIdGroup").addClass('form-group has-error has-feedback');                 
                $("#sellerEmailIdSpan").html('please enter emailId');
            }
            else 
            if(!validateEmail($("#sellerEmailId").val()))
            {
                event.preventDefault();
                $("#sellerEmailIdGroup").addClass('form-group has-error has-feedback');                 
                $("#sellerEmailIdSpan").html('please enter valid emailId');
            }
            else
            if($("#bankName").val()=='')
            {
                event.preventDefault();
                $("#bankNameGroup").addClass('form-group has-error has-feedback');                 
                $("#bankNameSpan").html('please enter bank Name');
            }
            else
            if($("#bankName").val().length > 50)
            {
                event.preventDefault();
                $("#bankNameGroup").addClass('form-group has-error has-feedback');                 
                $("#bankNameSpan").html('bank name must be max 50 characters');
            }
          
            else
            if($("#branchName").val()=='')
            {
                event.preventDefault();
                $("#branchNameGroup").addClass('form-group has-error has-feedback');                 
                $("#branchNameSpan").html('please enter branchName');
            }
            else
            if($("#branchName").val().length > 50)
            {
                event.preventDefault();
                $("#branchNameGroup").addClass('form-group has-error has-feedback');                 
                $("#branchNameSpan").html('branchName must be max 50 characters');
            }
            else
            if($("#IFSC").val()=='')
            {
                event.preventDefault();
                $("#IFSCGroup").addClass('form-group has-error has-feedback');                 
                $("#IFSCSpan").html('please enter IFSC code');
            }
            else
            if($("#IFSC").val().length!=11 || $("#IFSC").val().length < 11 )
            {
                event.preventDefault();
                $("#IFSCGroup").addClass('form-group has-error has-feedback');                 
                $("#IFSCSpan").html('IFSC code must be 11 characters');
            }
            else
            if($("#IFSC").val().length > 11 )
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


