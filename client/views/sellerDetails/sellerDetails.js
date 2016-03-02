Template.sellerDetails.onRendered(
    function () 
    {
        $(document).ready(function () {
        $('#list-sellers').DataTable();
        $(".tool-tip").tooltip();
        });

    }
);
Template.sellerDetails.helpers({
	sellerList:function()
	{
		return CodeBashApp.sellerDetailsService.getInstance().findSeller();
	}

});
Template.sellerDetails.events({
	'click #updateDetails':function()
	{
		Session.set('bid',this._id);	
	},
	"submit #editSellerForm":function(event)
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
	},
	"submit #newSellerForm": function(event)
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
	},
	'click #deleteSeller':function()
	{
		CodeBashApp.sellerDetailsService.getInstance().deleteseller(this._id);
	}
	
});