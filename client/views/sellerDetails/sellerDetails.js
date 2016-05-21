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
	},
	"submit #editSellerForm":function(event)
	{
		event.preventDefault();
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
			CodeBashApp.sellerDetailsService.getInstance().updateSeller(Session.get('bid'),name,address,phoneNo,emailId,bankName,branch,IFSCCode,accountNumber);
			Session.set('bid','');
			$('#edit-seller').modal('hide');
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
		$('#newBranchName').val('');	
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