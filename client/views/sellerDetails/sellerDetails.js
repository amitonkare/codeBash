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
	'click #updateDetails':function()
	{
		Session.set('bid',this._id);	
	},
	"submit #editSellerForm":function(event)
	{
		event.preventDefault();
		var validate = CodeBashApp.sellerDetailsEditSellerValidate();
		if(validate=='true')
		{
			console.log("inside edit submit");
			var name = $("#sellerName").val();
			var address = $("#sellerAddress").val();
			var phoneNo = $("#sellerPhoneNo").val();
			var emailId = $("#sellerEmailId").val();
			var bankName = $("#bankName").val();
			var branch = $("#branchName").val();
			var IFSCCode = $("#IFSC").val();
			var accountNumber = $("#accountNumber").val();	
			CodeBashApp.sellerDetailsService.getInstance().updateSeller(Session.get('bid'),name,address,phoneNo,emailId,bankName,branch,IFSCCode,accountNumber);
			Session.set('bid','');
			$('#edit-seller').modal('toggle');
		}
	},
	"submit #newSellerForm": function(event)
	{
		event.preventDefault();
		var validate = CodeBashApp.sellerDetailsNewSellerValidate();
		if(validate=='true')
		{
		console.log("inside submit event");
		var name = $("#newSellerName").val();
		var address = $("#newSellerAddress").val();
		var phoneNo = $("#newSellerPhoneNo").val();
		var emailId = $("#newSellerEmailId").val();
		var bankName = $("#newBankName").val();
		var branch = $("#newBranchName").val();
		var IFSCCode = $("#newIFSC").val();
		var accountNumber = $("#newAccountNumber").val();
		var newseller = CodeBashApp.sellerDetailsVO(name,address,phoneNo,emailId,bankName,branch,IFSCCode,accountNumber)
		CodeBashApp.sellerDetailsService.getInstance().addSeller(newseller);		
		$('#new-seller').modal('toggle');
		}
	},
	'click #deleteSellerId':function()
	{
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