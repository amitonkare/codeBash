Template.buyerDetails.onRendered(
    function () 
    {
        $(document).ready(function () {
        $('#list-buyers').DataTable();
        $(".tool-tip").tooltip();
        });

    }
);
Template.buyerDetails.helpers({
	buyerList:function()
	{
		return CodeBashApp.buyerDetailsService.getInstance().findBuyer();
	}

});
Template.buyerDetails.events({
	'click #updateDetails':function()
	{
		Session.set('bid',this._id);	
	},
	"submit #editBuyerForm": function(event)
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
	},
	"submit #newBuyerForm": function(event)
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
	},
	'click #deleteBuyer':function()
	{
		CodeBashApp.buyerDetailsService.getInstance().deleteBuyer(this._id);
	}
	
});