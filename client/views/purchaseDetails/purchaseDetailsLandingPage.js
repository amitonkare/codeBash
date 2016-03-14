Template.purchaseDetailsLandingPage.onRendered( function(){
CodeBashApp.purchaseDetailsLandingPageOnReady();
});

Template.purchaseDetailsLandingPage.helpers({
	purchaseList:function()
	{
		var obj = CodeBashApp.purchaseService.getInstance().findPurchase();
		for(var i=0;i<obj.length;i++)
		{			
			console.log(CodeBashApp.sellerDetailsService.getInstance().findSellerById(obj[i].sellerId)[0].name);
			obj[i].sellerId = CodeBashApp.sellerDetailsService.getInstance().findSellerById(obj[i].sellerId)[0].name;
		}
		return obj;
	},
	updateObj:function()
	{
		return CodeBashApp.purchaseService.getInstance().findPurchaseById(Session.get('updateId'))[0];
	}
});
Template.purchaseDetailsLandingPage.events({
	"click #updateDetails":function()
	{
		$("#editModal").modal("show");
		Session.set('updateId',this._id);	
	},
	"submit #editPurchaseForm":function(event)
	{
		event.preventDefault();
		var paymentStatus = event.target.paymentStatus.value;
		var deliveryStatus = event.target.paymentStatus.value;
		CodeBashApp.purchaseService.getInstance().updatePurchase(Session.get('updateId'),paymentStatus,deliveryStatus);
		$("#editModal").modal("hide");
	},
	"click #newPurchase":function()
	{
		Router.go('/purchaseDetails');
	}
});