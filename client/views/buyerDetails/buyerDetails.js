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
	'click #addBuyer':function()
	{
		var obj = {};
		obj.id = Math.random() * 100;
		obj.name = $("#addBuyerName").val();
		obj.address = $("addBuyerAddress").val();
		obj.phoneNo = $("#addBuyerPhoneNo").val();
		obj.emailId = $("#addBuyerEmailId").val();
		obj.bankAccoutDetails={};
		obj.bankAccoutDetails.bankName = $("#addBankName").val();
		obj.bankAccoutDetails.branch = $("#addBranchName").val();
		obj.bankAccoutDetails.IFSCCode = $("#addIFSC").val();
		obj.bankAccoutDetails.accountNumber = $("#addAccountNumber").val();
		CodeBashApp.buyerDetailsService.getInstance().addBuyer(obj);
		console.log(obj);
	},
	'click #deleteBuyer':function()
	{
		CodeBashApp.buyerDetailsService.getInstance().deleteBuyer(this._id);
	},
	'click #updateDetails':function()
	{
		Session.set('bid',this._id);	
	},
	'click #updateBuyer':function()
	{
		var name = $("#editBuyerName").val();
		var address = $("#editBuyerAddress").val();
		var phoneNo = $("#editBuyerPhoneNo").val();
		var emailId = $("#editBuyerEmailId").val();
		var bankName = $("#editBankName").val();
		var branch = $("#editBranchName").val();
		var IFSCCode = $("#editIFSC").val();
		var accountNumber = $("#editAccountNumber").val();	
		CodeBashApp.buyerDetailsService.getInstance().updateBuyer(Session.get('bid'),name,address,phoneNo,emailId,bankName,branch,IFSCCode,accountNumber);
		Session.set('bid','');
	}
});