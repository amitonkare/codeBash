Template.buyerDetails.onRendered(
    function () 
    {
		CodeBashApp.buyerDetailsOnReady();
    }
);

Template.buyerDetails.helpers({
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

Template.buyerDetails.events({
	'click #updateDetails':function()
	{
		Session.set('bid',this._id);	
		$("#edit-buyer").modal("show");    
	},
	"submit #editBuyerForm": function(event)
	{
		event.preventDefault();
		var validate = CodeBashApp.buyerDetailsEditBuyerValidate();
		console.log(validate);
		if(validate =='true')
		{
			console.log("inside edit submit");
			var name = $("#buyerName").val();
			var address = $("#buyerAddress").val();
			var phoneNo = $("#buyerPhoneNo").val();
			var emailId = $("#buyerEmailId").val();
			var bankName = $("#bankName").val();
			var branch = $("#branchName").val();
			var IFSCCode = $("#IFSC").val();
			var accountNumber = $("#accountNumber").val();	
			CodeBashApp.buyerDetailsService.getInstance().updateBuyer(Session.get('bid'),name,address,phoneNo,emailId,bankName,branch,IFSCCode,accountNumber);
			Session.set('bid','');
		}
			$("#edit-buyer").modal("hide");    
	},
	"submit #newBuyerForm": function(event)
	{
		event.preventDefault();
		var validate = CodeBashApp.buyerDetailsNewBuyerValidate();
		if(validate == 'true')
		{
			console.log("inside submit event");
			var name = $("#newBuyerName").val();
			var address = $("#newBuyerAddress").val();
			var phoneNo = $("#newBuyerPhoneNo").val();
			var emailId = $("#newBuyerEmailId").val();
			var bankName = $("#newBankName").val();
			var branch = $("#newBranchName").val();
			var IFSCCode = $("#newIFSC").val();
			var accountNumber = $("#newAccountNumber").val();
			var newBuyer = CodeBashApp.buyerDetailsVO(name,address,phoneNo,emailId,bankName,branch,IFSCCode,accountNumber)
			CodeBashApp.buyerDetailsService.getInstance().addBuyer(newBuyer);		
		}
		$("#new-buyer").modal("hide");    
	},
	'click #deleteBuyerId': function()
	{
		Session.set('deleteId',this._id);
		$("#deleteModal").modal("show");
	},
	'click #deleteBuyer': function()
	{
		CodeBashApp.buyerDetailsService.getInstance().deleteBuyer(Session.get('deleteId'));
	},
	'click #newbuyermodal':function()
	{
		$("#new-buyer").modal("show");    
	}

});