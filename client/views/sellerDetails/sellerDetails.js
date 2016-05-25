Template.sellerDetailsTable.onRendered(
	function () 
	{
		CodeBashApp.sellerDetailsOnReady();
	}
	);
Template.sellerDetailsTable.helpers({
	sellerList:function()
	{
		return CodeBashApp.sellerDetailsService.getInstance().findSeller();
	},
	updateObj:function()
	{
		if(Session.get('bid'))
		{
			return CodeBashApp.sellerDetailsService.getInstance().findSellerById(Session.get('bid'))[0];		
		}

	}

});
Template.sellerDetailsTable.events({
	'click #newSellermodal':function()
	{
		$("#new-seller").modal('show');
	},	
	'click #updateDetails':function()
	{
		$("#edit-seller").modal('show');
		Session.set('bid',this._id);	
		$("#editSellerSpan").html('');
	},
	"submit #editSellerForm":function(event)
	{
		event.preventDefault();
		var flag = 1;
		var validate = CodeBashApp.sellerDetailsEditSellerValidate();
		if(validate=='true')
		{
			var name = event.target.sellerName.value;
			var address = event.target.sellerAddress.value;
			var phoneNo = event.target.sellerPhoneNo.value;
			var emailId = event.target.sellerEmailId.value;
			var bankName = event.target.bankName.value;
			var branch = event.target.branchName.value;
			var IFSCCode = event.target.IFSC.value;
			var accountNumber = event.target.accountNumber.value;
			var obj = CodeBashApp.sellerDetailsService.getInstance().findSellerById(Session.get('bid'))[0];
			if(obj.name == name && obj.address == address && obj.phoneNo == phoneNo && obj.emailId == emailId && obj.bankAccountDetails.bankName == bankName && obj.bankAccountDetails.branch == branch && obj.bankAccountDetails.IFSCCode == IFSCCode && obj.bankAccountDetails.accountNumber == accountNumber) 
			{
				flag = 0;
			}
			if(flag == 1)
			{
				CodeBashApp.sellerDetailsService.getInstance().updateSeller(Session.get('bid'),name,address,phoneNo,emailId,bankName,branch,IFSCCode,accountNumber);
				Session.set('bid','');
				$('#edit-seller').modal('hide');
			}
			else
			{
				$("#editSellerSpan").html('Seller Already Exists');
			}
		}
	},
	"submit #newSellerForm": function(event)
	{
		event.preventDefault();
		var validate = CodeBashApp.sellerDetailsNewSellerValidate();
		if(validate=='true')
		{
			
			console.log("inside submit event");
			var name = event.target.newSellerName.value;
			var address = event.target.newSellerAddress.value;
			var phoneNo = event.target.newSellerPhoneNo.value;
			var emailId = event.target.newSellerEmailId.value;
			var bankName = event.target.newBankName.value;
			var branch = event.target.newBranchName.value;
			var IFSCCode = event.target.newIFSC.value;
			var accountNumber = event.target.newAccountNumber.value;
			var newseller = CodeBashApp.sellerDetailsVO(name,address,phoneNo,emailId,bankName,branch,IFSCCode,accountNumber)
			CodeBashApp.sellerDetailsService.getInstance().addSeller(newseller);		
			event.target.newSellerName.value ='';
			event.target.newSellerAddress.value ='';
			event.target.newSellerPhoneNo.value = '';
			event.target.newSellerEmailId.value = '';
			event.target.newBankName.value = '';
			event.target.newIFSC.value = '';
			event.target.newBranchName.value = '';
			event.target.newAccountNumber.value = '';
			$('#new-seller').modal('hide');
	    //$("#rootDiv").remove();
   		//Router.current().render(Template.sellerDetails);
   		Router.current().render(Template.sellerDetails);
   		Router.current().render(Template.sellerDetailsTable);
   	}
   },
   'click #deleteSellerId':function()
   {
   	$("#deleteModal").modal('show');
   	Session.set('deleteId',this._id);
		//CodeBashApp.sellerDetailsService.getInstance().deleteseller(this._id);
	},
	'click #deleteSeller':function()
	{
		if(Session.get('deleteId'))
		{
			CodeBashApp.sellerDetailsService.getInstance().deleteSeller(Session.get('deleteId'));
		//		$("#rootDiv").remove();
   		//		Router.current().render(Template.sellerDetails);
   		Router.current().render(Template.sellerDetails);
   		Router.current().render(Template.sellerDetailsTable);
   	}
   },
   'click #newSellerCancel':function()
   {
   	$('#newSellerName').val('');
   	$('#newSellerAddress').val('');
   	$('#newSellerPhoneNo').val('');
   	$('#newSellerEmailId').val('');
   	$('#newBankName').val('');
   	$('#newIFSC').val('');
   	$('#newAccountNumber').val('');
   	$('#newConfirmAccountNumber').val('');
   	$('#newBranchName').val('');	
   	$("#newSellerNameGroup").removeClass('form-group has-error has-feedback');
   	$("#newSellerNameGroup").addClass('form-group');
   	$("#newSellerNameSpan").html('');
   	$("#newSellerAddressGroup").removeClass('form-group has-error has-feedback');
   	$("#newSellerAddressGroup").addClass('form-group');
   	$("#newSellerAddressSpan").html('');
   	$("#newSellerPhoneNoGroup").removeClass('form-group has-error has-feedback');
   	$("#newSellerPhoneNoGroup").addClass('form-group');
   	$("#newSellerPhoneNoSpan").html('');
   	$("#newSellerEmailIdGroup").removeClass('form-group has-error has-feedback');
   	$("#newSellerEmailIdGroup").addClass('form-group');
   	$("#newSellerEmailIdSpan").html('');
   	$("#newBankNameGroup").removeClass('form-group has-error has-feedback');
   	$("#newBankNameGroup").addClass('form-group');
   	$("#newBankNameSpan").html('');
   	$("#newBranchNameGroup").removeClass('form-group has-error has-feedback');
   	$("#newBranchNameGroup").addClass('form-group');
   	$("#newBranchNameSpan").html('');
   	$("#newAccountNumberGroup").removeClass('form-group has-error has-feedback');
   	$("#newAccountNumberGroup").addClass('form-group');
   	$("#newAccountNumberSpan").html('');
   	$("#newConfirmAccountNumberGroup").removeClass('form-group has-error has-feedback');
   	$("#newConfirmAccountNumberGroup").addClass('form-group');
   	$("#newConfirmAccountNumberSpan").html('');
   	$("#newIFSCGroup").removeClass('form-group has-error has-feedback');
   	$("#newIFSCGroup").addClass('form-group');
   	$("#newIFSCSpan").html('');
   	
   },
   'click #editSellerCancel':function()
   {
   	$("#sellerNameGroup").removeClass('form-group has-error has-feedback');
   	$("#sellerNameGroup").addClass('form-group');
   	$("#sellerNameSpan").html('');
   	$("#sellerAddressGroup").removeClass('form-group has-error has-feedback');
   	$("#sellerAddressGroup").addClass('form-group');
   	$("#sellerAddressSpan").html('');
   	$("#sellerPhoneNoGroup").removeClass('form-group has-error has-feedback');
   	$("#sellerPhoneNoGroup").addClass('form-group');
   	$("#sellerPhoneNoSpan").html('');
   	$("#sellerEmailIdGroup").removeClass('form-group has-error has-feedback');
   	$("#sellerEmailIdGroup").addClass('form-group');
   	$("#sellerEmailIdSpan").html('');
   	$("#bankNameGroup").removeClass('form-group has-error has-feedback');
   	$("#bankNameGroup").addClass('form-group');
   	$("#bankNameSpan").html('');
   	$("#branchNameGroup").removeClass('form-group has-error has-feedback');
   	$("#branchNameGroup").addClass('form-group');
   	$("#branchNameSpan").html('');
   	$("#accountNumberGroup").removeClass('form-group has-error has-feedback');
   	$("#accountNumberGroup").addClass('form-group');
   	$("#accountNumberSpan").html('');
   	$("#confirmAccountNumberGroup").removeClass('form-group has-error has-feedback');
   	$("#confirmAccountNumberGroup").addClass('form-group');
   	$("#confirmAccountNumberSpan").html('');

   	$("#IFSCGroup").removeClass('form-group has-error has-feedback');
   	$("#IFSCGroup").addClass('form-group');
   	$("#IFSCSpan").html('');
   	var obj = CodeBashApp.sellerDetailsService.getInstance().findSellerById(Session.get('bid'))[0];
   	$("#sellerName").val(obj.name);
   	$("#sellerAddress").val(obj.address);
   	$("#sellerPhoneNo").val(obj.phoneNo);
   	$("#sellerEmailId").val(obj.emailId);
   	$("#bankName").val(obj.bankAccountDetails.bankName);
   	$("#branchName").val(obj.bankAccountDetails.branch);
   	$("#accountNumber").val(obj.bankAccountDetails.accountNumber);
   	$("#IFSC").val(obj.bankAccountDetails.IFSCCode);
   }
});