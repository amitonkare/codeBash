Template.buyerDetailsTable.onRendered(
	function () 
	{
		CodeBashApp.buyerDetailsOnReady();
	}
	);

Template.buyerDetailsTable.helpers({
	buyerList:function()
	{
		return CodeBashApp.buyerDetailsService.getInstance().findBuyer();
	},
	updateObj:function()
	{
		if(Session.get('bid'))
		{
			return CodeBashApp.buyerDetailsService.getInstance().findBuyerById(Session.get('bid'))[0];
		}
	}
});

Template.buyerDetailsTable.events({
	'click #updateDetails':function()
	{
		Session.set('bid',this._id);	
		$("#edit-buyer").modal("show");    
		$("#editBuyerSpan").html('');
	},
	"submit #editBuyerForm": function(event)
	{
		event.preventDefault();
		var flag = 1,flag2 = 1,flag3 = 0;

		var validate = CodeBashApp.buyerDetailsEditBuyerValidate();
		//console.log(validate);
		if(validate =='true')
		{
			//console.log("inside edit submit");
			var name =    event.target.buyerName.value;
			var address = event.target.buyerAddress.value;
			var phoneNo = event.target.buyerPhoneNo.value;
			var emailId = event.target.buyerEmailId.value;
			var bankName = event.target.bankName.value;
			var branch = event.target.branchName.value;
			var IFSCCode = event.target.IFSC.value;
			var accountNumber = event.target.accountNumber.value;
			var obj = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(Session.get('bid'))[0];
			console.log(obj);
			
			if(obj.name == name && obj.address == address && obj.phoneNo == phoneNo && obj.emailId == emailId && obj.bankAccountDetails.bankName == bankName && obj.bankAccountDetails.branch == branch && obj.bankAccountDetails.IFSCCode == IFSCCode && obj.bankAccountDetails.accountNumber == accountNumber) 
			{
				flag = 0;
			}
			

			console.log(flag);
			if(flag == 1)
			{
				CodeBashApp.buyerDetailsService.getInstance().updateBuyer(Session.get('bid'),name,address,phoneNo,emailId,bankName,branch,IFSCCode,accountNumber);
				Session.set('bid','');
				$("#edit-buyer").modal("hide");    
				event.target.buyerName.value = '';
				event.target.buyerAddress.value = '';
				event.target.buyerPhoneNo.value = '';
				event.target.buyerEmailId.value = '';
				event.target.bankName.value = '';
				event.target.branchName.value = '';
				event.target.IFSC.value = '';
				event.target.accountNumber.value = '';
			}
			else
			{
				$("#editBuyerSpan").html('Buyer Already Exists');
			}
		}
		
		
	},
	"submit #newBuyerForm": function(event)
	{
		event.preventDefault();
		var validate = CodeBashApp.buyerDetailsNewBuyerValidate();
		if(validate == 'true')
		{
			//console.log("inside submit event");
			var name = event.target.newBuyerName.value;
			var address = event.target.newBuyerAddress.value;
			var phoneNo = event.target.newBuyerPhoneNo.value;
			var emailId = event.target.newBuyerEmailId.value;
			var bankName = event.target.newBankName.value;
			var branch = event.target.newBranchName.value;
			var IFSCCode = event.target.newIFSC.value;
			var accountNumber = event.target.newAccountNumber.value;
			var newBuyer = CodeBashApp.buyerDetailsVO(name,address,phoneNo,emailId,bankName,branch,IFSCCode,accountNumber)
			CodeBashApp.buyerDetailsService.getInstance().addBuyer(newBuyer);		
			event.target.newBuyerName.value = '';
			event.target.newBuyerAddress.value = '';
			event.target.newBuyerPhoneNo.value = '';
			event.target.newBuyerEmailId.value = '';
			event.target.newBankName.value = '';
			event.target.newIFSC.value = '';
			event.target.newAccountNumber.value = '';
			$("#new-buyer").modal("hide");    
		   // $("#rootDiv").remove();
   		   // Router.current().render(Template.buyerDetails);
   		   Router.current().render(Template.buyerDetails);
   		   Router.current().render(Template.buyerDetailsTable);
   		}
   	},
   	'click #deleteBuyerId': function()
   	{
   		Session.set('deleteId',this._id);
   		$("#deleteModal").modal("show");
   	},
   	'click #deleteBuyer': function()
   	{
   		CodeBashApp.buyerDetailsService.getInstance().deleteBuyer(Session.get('deleteId'));
//		$("#rootDiv").remove();
//   	    Router.current().render(Template.buyerDetails);
Router.current().render(Template.buyerDetails);
Router.current().render(Template.buyerDetailsTable);
},
'click #newbuyermodal':function()
{
	$("#new-buyer").modal("show");    
},
'click #cancelNewBuyer':function()
{
	$("#newBuyerName").val('');
	$("#newBuyerAddress").val('');
	$("#newBuyerPhoneNo").val('');
	$("#newBuyerEmailId").val('');
	$("#newBankName").val('');
	$("#newIFSC").val('');
	$("#newAccountNumber").val('');
	$("#newBuyerNameGroup").removeClass('form-group has-error has-feedback');
	$("#newBuyerNameGroup").addClass('form-group');
	$("#newBuyerNameSpan").html('');
	$("#newBuyerAddressGroup").removeClass('form-group has-error has-feedback');
	$("#newBuyerAddressGroup").addClass('form-group');
	$("#newBuyerAddressSpan").html('');
	$("#newBuyerPhoneNoGroup").removeClass('form-group has-error has-feedback');
	$("#newBuyerPhoneNoGroup").addClass('form-group');
	$("#newBuyerPhoneNoSpan").html('');
	$("#newBuyerEmailIdGroup").removeClass('form-group has-error has-feedback');
	$("#newBuyerEmailIdGroup").addClass('form-group');
	$("#newBuyerEmailIdSpan").html('');
	$("#newBankNameGroup").removeClass('form-group has-error has-feedback');
	$("#newBankNameGroup").addClass('form-group');
	$("#newBankNameSpan").html('');
	$("#newBranchNameGroup").removeClass('form-group has-error has-feedback');
	$("#newBranchNameGroup").addClass('form-group');
	$("#newBranchNameSpan").html('');
	$("#newIFSCGroup").removeClass('form-group has-error has-feedback');
	$("#newIFSCGroup").addClass('form-group');
	$("#newIFSCSpan").html('');
	$("#newAccountNumberGroup").removeClass('form-group has-error has-feedback');
	$("#newAccountNumberGroup").addClass('form-group');
	$("#newAccountNumberSpan").html('');
	$("#newConfirmAccountNumberGroup").removeClass('form-group has-error has-feedback');
	$("#newConfirmAccountNumberGroup").addClass('form-group');
	$("#newConfirmAccountNumberSpan").html('');
},
'click #editBuyerCancel':function()
{
	$("#buyerNameGroup").removeClass('form-group has-error has-feedback');
	$("#buyerNameGroup").addClass('form-group');
	$("#buyerNameSpan").html('');
	$("#buyerAddressGroup").removeClass('form-group has-error has-feedback');
	$("#buyerAddressGroup").addClass('form-group');
	$("#buyerAddressSpan").html('');
	$("#buyerPhoneNoGroup").removeClass('form-group has-error has-feedback');
	$("#buyerPhoneNoGroup").addClass('form-group');
	$("#buyerPhoneNoSpan").html('');
	$("#buyerEmailIdGroup").removeClass('form-group has-error has-feedback');
	$("#buyerEmailIdGroup").addClass('form-group');
	$("#buyerEmailIdSpan").html('');
	$("#bankNameGroup").removeClass('form-group has-error has-feedback');
	$("#bankNameGroup").addClass('form-group');
	$("#bankNameSpan").html('');
	$("#branchNameGroup").removeClass('form-group has-error has-feedback');
	$("#branchNameGroup").addClass('form-group');
	$("#branchNameSpan").html('');
	$("#IFSCGroup").removeClass('form-group has-error has-feedback');
	$("#IFSCGroup").addClass('form-group');
	$("#IFSCSpan").html('');
	$("#accountNumberGroup").removeClass('form-group has-error has-feedback');
	$("#accountNumberGroup").addClass('form-group');
	$("#accountNumberSpan").html('');
	$("#confirmAccountNumberGroup").removeClass('form-group has-error has-feedback');
	$("#confirmAccountNumberGroup").addClass('form-group');
	$("#confirmAccountNumberSpan").html('');
	
	var obj = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(Session.get('bid'))[0];
	$("#buyerName").val(obj.name);
	$("#buyerAddress").val(obj.address);
	$("#buyerPhoneNo").val(obj.phoneNo);
	$("#buyerEmailId").val(obj.emailId);
	$("#bankName").val(obj.bankAccountDetails.bankName);
	$("#branchName").val(obj.bankAccountDetails.branch);
	$("#IFSC").val(obj.bankAccountDetails.IFSCCode);
	$("#accountNumber").val(obj.bankAccountDetails.accountNumber);

}

});