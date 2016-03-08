Template.sellerDetails.onRendered(
    function () 
    {
       CodeBashApp.sellerDetailsOnReady();
    }
);
Template.sellerDetails.helpers({
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
Template.sellerDetails.events({
	'click #newSellerModal':function()
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
		$('#new-seller').modal('hide');
		}
		event.target.newSellerName.value ='';
		event.target.newSellerAddress.value ='';
		event.target.newSellerPhoneNo.value = '';
		event.target.newSellerEmailId.value = '';
		event.target.newBankName.value = '';
		event.target.newIFSC.value = '';
		event.target.newAccountNumber.value = '';
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
		}
	}
});