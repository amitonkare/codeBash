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
CodeBashApp.buyerDetailsNewBuyerValidate=function(){
	var validate = 'false';
	var flagArray = [];
	if(validate == 'false')
	{
		if($("#newBuyerName").val()=='')
		{
			flagArray.push(1);	                
		}
		if($("#newBuyerName").val().length>30)
		{
			flagArray.push(2);		
		}
		
		if($("#newBuyerAddress").val()=='')
		{
			flagArray.push(3);
		}
		
		if($("#newBuyerAddress").val().length>90)
		{
			flagArray.push(4);    
		}
		
		if($("#newBuyerPhoneNo").val()=='')
		{
			flagArray.push(5);	
		}
		
		if($("#newBuyerPhoneNo").val().length>10)
		{
			flagArray.push(6);                
		}

		if($("#newBuyerEmailId").val())
		{
			if(!validateEmail($("#newBuyerEmailId").val()))
			{
				flagArray.push(7);
			}
		}
		
		if($("#newBankName").val()=='')
		{
			flagArray.push(8);
		}
		
		if($("#newBankName").val().length > 50)
		{
			flagArray.push(9);	
		}
		
		if($("#newBranchName").val()=='')
		{
			flagArray.push(10);	
		}
		
		if($("#newBranchName").val().length > 50)
		{
			flagArray.push(11);
		}
		
		if($("#newIFSC").val()=='')
		{
			flagArray.push(12);
		}
		
		if($("#newIFSC").val().length != 11 || $("#newIFSC").val().length < 11 )
		{
			flagArray.push(13);	
		}
		
		if($("#newIFSC").val().length > 11 )
		{
			flagArray.push(14);	
		}
		
		if($("#newAccountNumber").val()=='')
		{
			flagArray.push(15);	
		}
		
		if($("#newAccountNumber").val().length != 15)
		{
			flagArray.push(16);
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
				$("#newBuyerNameGroup").addClass('form-group has-error has-feedback');                 
				$("#newBuyerNameSpan").html('please enter name');
				break;
				case 2: event.preventDefault();
				$("#newBuyerNameGroup").addClass('form-group has-error has-feedback');                 
				$("#newBuyerNameSpan").html('name should be maximum 30 characters');                
				break;
				case 3:event.preventDefault();
				$("#newBuyerAddressGroup").addClass('form-group has-error has-feedback');                 
				$("#newBuyerAddressSpan").html('please enter Address');    
				break;
				case 4:event.preventDefault();
				$("#newBuyerAddressGroup").addClass('form-group has-error has-feedback');                 
				$("#newBuyerAddressSpan").html('Address must be max 90 characters');
				break;
				case 5:event.preventDefault();
				$("#newBuyerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
				$("#newBuyerPhoneNoSpan").html('please enter Phone no');                
				break;
				case 6:event.preventDefault();
				$("#newBuyerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
				$("#newBuyerPhoneNoSpan").html('Phone no must be max 10 digits');
				break;
				case 7:event.preventDefault();
				$("#newBuyerEmailIdGroup").addClass('form-group has-error has-feedback');                 
				$("#newBuyerEmailIdSpan").html('please enter valid emailId');
				break;
				case 8:event.preventDefault();
				$("#newBankNameGroup").addClass('form-group has-error has-feedback');                 
				$("#newBankNameSpan").html('please enter bank Name');
				break;
				case 9:event.preventDefault();
				$("#newBankNameGroup").addClass('form-group has-error has-feedback');                 
				$("#newBankNameSpan").html(' bank Name must be max 50 characters');
				break;
				case 10:event.preventDefault();
				$("#newBranchNameGroup").addClass('form-group has-error has-feedback');                 
				$("#newBranchNameSpan").html('please enter BranchName');
				break;
				case 11:event.preventDefault();
				$("#newBranchNameGroup").addClass('form-group has-error has-feedback');                 
				$("#newBranchNameSpan").html('BranchName must be max 50 characters');
				break;
				case 12:event.preventDefault();
				$("#newIFSCGroup").addClass('form-group has-error has-feedback');                 
				$("#newIFSCSpan").html('please enter IFSC code');
				break;
				case 13:event.preventDefault();
				$("#newIFSCGroup").addClass('form-group has-error has-feedback');                 
				$("#newIFSCSpan").html('IFSC code must be 11 characters');
				break;
				case 14:event.preventDefault();
				$("#newIFSCGroup").addClass('form-group has-error has-feedback');                 
				$("#newIFSCSpan").html('IFSC code must be 11 characters');
				break;
				case 15:event.preventDefault();
				$("#newAccountNumberGroup").addClass('form-group has-error has-feedback');                 
				$("#newAccountNumberSpan").html('please enter Account Number');
				break;
				case 16: event.preventDefault();
				$("#newAccountNumberGroup").addClass('form-group has-error has-feedback');                 
				$("#newAccountNumberSpan").html('Account Number must be 15 digits');
				break;
			}
		}
	}
	return validate;    
};