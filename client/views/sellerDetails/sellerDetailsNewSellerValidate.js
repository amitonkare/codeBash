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
CodeBashApp.sellerDetailsNewSellerValidate=function(){
	   	 var validate = 'false';
        if(validate == 'false')
        {
            if($("#newSellerName").val()=='')
            {
                event.preventDefault();
                $("#newSellerNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newSellerNameSpan").html('please enter name');                
            }
            else
            if($("#newSellerName").val().length>30)
            {
                event.preventDefault();
                $("#newSellerNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newSellerNameSpan").html('name should be maximum 30 characters');                
            }
            else
            if($("#newSellerAddress").val()=='')
            {
                event.preventDefault();
                $("#newSellerAddressGroup").addClass('form-group has-error has-feedback');                 
                $("#newSellerAddressSpan").html('please enter Address');    
            }
            else
            if($("#newSellerAddress").val().length>90)
            {
                event.preventDefault();
                $("#newSellerAddressGroup").addClass('form-group has-error has-feedback');                 
                $("#newSellerAddressSpan").html('Address must be max 90 characters');    
            }
            else
            if($("#newSellerPhoneNo").val()=='')
            {
                event.preventDefault();
                $("#newSellerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
                $("#newSellerPhoneNoSpan").html('please enter Phone no');                
            }
            else
            if($("#newSellerPhoneNo").val().length>10)
            {
                event.preventDefault();
                $("#newSellerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
                $("#newSellerPhoneNoSpan").html('Phone no must be max 10 digits');                
            }
            else
            if($("#newSellerEmailId").val()=='')
            {
                event.preventDefault();
                $("#newSellerEmailIdGroup").addClass('form-group has-error has-feedback');                 
                $("#newSellerEmailIdSpan").html('please enter emailId');
            }
            else
            if(!validateEmail($("#newSellerEmailId").val()))
            {
                event.preventDefault();
                $("#newSellerEmailIdGroup").addClass('form-group has-error has-feedback');                 
                $("#newSellerEmailIdSpan").html('please enter valid emailId');
            }
            else
            if($("#newBankName").val()=='')
            {
                event.preventDefault();
                $("#newBankNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newBankNameSpan").html('please enter bank Name');
            }
            else
            if($("#newBankName").val().length>10)
            {
                event.preventDefault();
                $("#newBankNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newBankNameSpan").html(' bank Name must be max 10 characters');
            }
            else
            if($("#newBranchName").val()=='')
            {
                event.preventDefault();
                $("#newBranchNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newBranchNameSpan").html('please enter BranchName');
            }
            else
            if($("#newBranchName").val().length>10)
            {
                event.preventDefault();
                $("#newBranchNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newBranchNameSpan").html('BranchName must be max 10 characters');
            }
            else
            if($("#newIFSC").val()=='')
            {
                event.preventDefault();
                $("#newIFSCGroup").addClass('form-group has-error has-feedback');                 
                $("#newIFSCSpan").html('please enter IFSC code');
            }
            else
            if($("#newIFSC").val().length != 6)
            {
                event.preventDefault();
                $("#newIFSCGroup").addClass('form-group has-error has-feedback');                 
                $("#newIFSCSpan").html('IFSC code must be 6 characters');
            }
            else	
            if($("#newAccountNumber").val()=='')
            {
                event.preventDefault();
                $("#newAccountNumberGroup").addClass('form-group has-error has-feedback');                 
                $("#newAccountNumberSpan").html('please enter Account Number');
            }
            else
            if($("#newAccountNumber").val().length != 15)
            {
                event.preventDefault();
                $("#newAccountNumberGroup").addClass('form-group has-error has-feedback');                 
                $("#newAccountNumberSpan").html('Account Number must be 15 digits');
            }
            else
            {
                validate = 'true';    
            }      
        }
        return validate;    
};