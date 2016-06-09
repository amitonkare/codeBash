CodeBashApp.buyerDetailsEditBuyerValidate=function(){
  var validate = 'false';
  var flagArray = [];
  var regexIFSC = /^[^\s]{4}\d{7}$/;
  var regexWhitespace = /^\S{3,}$/;
  if(validate == 'false')
  {
	if($("#buyerName").val()=='')
	{
		flagArray.push(1); 
	}
	if($("#buyerName").val().length>30)
	{
		flagArray.push(2);        
	}
	if($("#buyerAddress").val()=='')
	{
		flagArray.push(3);      
	}
	if($("#buyerAddress").val().length>90)
	{
		flagArray.push(4);        
	}
	if($("#buyerPhoneNo").val()=='')
	{
		flagArray.push(5);  
	}
	if($("#buyerPhoneNo").val().length>10)
	{
		flagArray.push(6);
	}
	if($("#buyerEmailId").val())
	{
		if(!validateEmail($("#buyerEmailId").val()))
		{
			flagArray.push(7);
		}
	}
	if($("#bankName").val()=='')
	{
		flagArray.push(8);
	}
	if($("#bankName").val().length>10)
	{
		flagArray.push(9);        
	}
	if($("#branchName").val()=='')
	{
		flagArray.push(10); 
	}
	if($("#branchName").val().length>10)
	{
		flagArray.push(11); 
	}

	if($("#IFSC").val()=='')
	{
		flagArray.push(12); 
	}

	if($("#IFSC").val().length!=11)
	{
		flagArray.push(13); 
	}

	if($("#IFSC").val().length < 11 || $("#IFSC").val().length > 11)
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
	if($("#accountNumber").val() != $("#confirmAccountNumber").val())
	{
		flagArray.push(17); 	
	}
	if (!regexIFSC.test($("#IFSC").val()))
	{
		 	console.log('regex evaluated');
		 	flagArray.push(18);
	}
	if(!regexWhitespace.test($("#buyerName").val()))
        {
            console.log('regex evaluated');
            flagArray.push(19);
        }
		if(!regexWhitespace.test($("#buyerAddress").val()))
        {
            console.log('regex evaluated');
            flagArray.push(20);
        }
        if(!regexWhitespace.test($("#bankName").val()))
        {
            console.log('regex evaluated');
            flagArray.push(21);
        }
        if(!regexWhitespace.test($("#branchName").val()))
        {
            console.log('regex evaluated');
            flagArray.push(22);
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
		$("#buyerNameGroup").addClass('form-group has-error has-feedback');                 
		$("#buyerNameSpan").html('please enter name');                
		break;
		case 2: event.preventDefault();
		$("#buyerNameGroup").addClass('form-group has-error has-feedback');                 
		$("#buyerNameSpan").html('name should be maximum 30 characters');                               
		break;
		case 3: event.preventDefault();
		$("#buyerAddressGroup").addClass('form-group has-error has-feedback');                 
		$("#buyerAddressSpan").html('please enter address');                
		break;
		case 4: event.preventDefault();
		$("#buyerAddressGroup").addClass('form-group has-error has-feedback');                 
		$("#buyerAddressSpan").html('buyer  address must be maxmimum 90 characters');
		break;
		case 5: event.preventDefault();
		$("#buyerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
		$("#buyerPhoneNoSpan").html('please enter Phone no');                
		break;
		case 6: event.preventDefault();
		$("#buyerPhoneNoGroup").addClass('form-group has-error has-feedback');                 
		$("#buyerPhoneNoSpan").html('phone no must be maximum 10 characters');                
		break;
		case 7: event.preventDefault();
		$("#buyerEmailIdGroup").addClass('form-group has-error has-feedback');                 
		$("#buyerEmailIdSpan").html('please enter valid emailId');
		break;
		case 8: event.preventDefault();
		$("#bankNameGroup").addClass('form-group has-error has-feedback');                 
		$("#bankNameSpan").html('please enter bank Name');
		break;
		case 9: event.preventDefault();
		$("#bankNameGroup").addClass('form-group has-error has-feedback');                 
		$("#bankNameSpan").html('bank name must be max 10 characters');
		break;
		case 10: event.preventDefault();
		$("#branchNameGroup").addClass('form-group has-error has-feedback');                 
		$("#branchNameSpan").html('please enter branchName');
		break;
		case 11:event.preventDefault();
		$("#branchNameGroup").addClass('form-group has-error has-feedback');                 
		$("#branchNameSpan").html('branchName must be max 10 characters');
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
		$("#IFSCSpan").html('please enter valid IFSC Code');
		break;

		case 19: event.preventDefault();
				$("#buyerNameGroup").addClass('form-group has-error has-feedback');                 
				$("#buyerNameSpan").html('name cannot have white space');
				break;
				case 20:event.preventDefault();
				$("#buyerAddressGroup").addClass('form-group has-error has-feedback');                 
				$("#buyerAddressSpan").html('Address cannot have white space');
				break;
				case 21:event.preventDefault();
				$("#bankNameGroup").addClass('form-group has-error has-feedback');                 
				$("#bankNameSpan").html(' bank Name cannot have white space');
				break;
				case 22:event.preventDefault();
				$("#branchNameGroup").addClass('form-group has-error has-feedback');                 
				$("#branchNameSpan").html('BranchName cannot have white space');
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


