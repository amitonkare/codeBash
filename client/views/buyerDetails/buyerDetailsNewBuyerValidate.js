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
CodeBashApp.buyerDetailsNewBuyerValidate=function(){
	   	 var validate = 'false';
        if(validate == 'false')
        {
            if($("#newBuyerName").val()=='')
            {
                event.preventDefault();
                $("#newBuyerNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newBuyerNameSpan").html('please enter name');                
            }
            else
            if($("#newBuyerName").val().length>30)
            {
                event.preventDefault();
                $("#newBuyerNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newBuyerNameSpan").html('name should be maximum 30 characters');                
            }
            else
            if($("#newBuyerAddress").val()=='')
            {
                event.preventDefault();
                $("#newBuyerAddressGroup").addClass('form-group has-error has-feedback');                 
                $("#newBuyerAddressSpan").html('please enter Address');    
            }
            else
            if($("#newBuyerAddress").val().length>90)
            {
                event.preventDefault();
                $("#newBuyerAddressGroup").addClass('form-group has-error has-feedback');                 
                $("#newBuyerAddressSpan").html('Address must be max 90 characters');    
            }
            else
            if($("#newBuyerPhoneNo").val()=='')
            {
                event.preventDefault();
                $("#newBuyerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
                $("#newBuyerPhoneNoSpan").html('please enter Phone no');                
            }
            else
            if($("#newBuyerPhoneNo").val().length>10)
            {
                event.preventDefault();
                $("#newBuyerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
                $("#newBuyerPhoneNoSpan").html('Phone no must be max 10 digits');                
            }
            else
            if($("#newBuyerEmailId").val()=='')
            {
                event.preventDefault();
                $("#newBuyerEmailIdGroup").addClass('form-group has-error has-feedback');                 
                $("#newBuyerEmailIdSpan").html('please enter emailId');
            }
            else
            if(!validateEmail($("#newBuyerEmailId").val()))
            {
                event.preventDefault();
                $("#newBuyerEmailIdGroup").addClass('form-group has-error has-feedback');                 
                $("#newBuyerEmailIdSpan").html('please enter valid emailId');
            }
            else
            if($("#newBankName").val()=='')
            {
                event.preventDefault();
                $("#newBankNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newBankNameSpan").html('please enter bank Name');
            }
            else
            if($("#newBankName").val().length > 50)
            {
                event.preventDefault();
                $("#newBankNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newBankNameSpan").html(' bank Name must be max 50 characters');
            }
            else
            if($("#newBranchName").val()=='')
            {
                event.preventDefault();
                $("#newBranchNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newBranchNameSpan").html('please enter BranchName');
            }
            else
            if($("#newBranchName").val().length > 50)
            {
                event.preventDefault();
                $("#newBranchNameGroup").addClass('form-group has-error has-feedback');                 
                $("#newBranchNameSpan").html('BranchName must be max 50 characters');
            }
            else
            if($("#newIFSC").val()=='')
            {
                event.preventDefault();
                $("#newIFSCGroup").addClass('form-group has-error has-feedback');                 
                $("#newIFSCSpan").html('please enter IFSC code');
            }
            else
            if($("#newIFSC").val().length != 11 || $("#newIFSC").val().length < 11 )
            {
                event.preventDefault();
                $("#newIFSCGroup").addClass('form-group has-error has-feedback');                 
                $("#newIFSCSpan").html('IFSC code must be 1 characters');
            }
            else
            if($("#newIFSC").val().length > 11 )
            {
                event.preventDefault();
                $("#newIFSCGroup").addClass('form-group has-error has-feedback');                 
                $("#newIFSCSpan").html('IFSC code must be 11 characters');
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