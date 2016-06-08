Template.purchaseDetailsLandingPage.onRendered( function(){
CodeBashApp.purchaseDetailsLandingPageOnReady();
});

Template.purchaseDetailsLandingPage.helpers({
	purchaseList:function()
	{
		var obj = CodeBashApp.purchaseService.getInstance().findPurchaseByDeliveryStatus(' Delivered ');
		for(var i=0;i<obj.length;i++)
		{			
			//console.log(CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId)[0].name);
			obj[i].sellerId = CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId)[0].name;
		}
		return obj;
	},
	finalPurchases:function()
	{
	var obj = CodeBashApp.purchaseService.getInstance().findPurchaseByStatus('final');
		for(var i=0;i<obj.length;i++)
		{			
			//console.log(CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId)[0].name);
			obj[i].sellerId = CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId)[0].name;
		}
		return obj;	
	},
	undeliveredPurchases:function()
	{
	var obj = CodeBashApp.purchaseService.getInstance().findPurchaseByDeliveryStatus('  Yet to Dispatch  ');
		for(var i=0;i<obj.length;i++)
		{			
			//console.log(CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId)[0].name);
			obj[i].sellerId = CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId)[0].name;
		}
		return obj;	
	},
	updateObj:function()
	{
		return CodeBashApp.purchaseService.getInstance().findPurchaseById(Session.get('purchaseUpdateId'))[0];
	}
});
Template.purchaseDetailsLandingPage.events({
	'click #updateDetails':function()
	{
		console.log("inside update details ");
		//$("#editModal").modal("show");
		Session.set('purchaseUpdateId',this._id);	
		Session.set('editPurchaseId',Session.get('purchaseUpdateId'));
		Router.go('/purchaseEdit');
	},
	"submit #editPurchaseForm":function(event)
	{
		event.preventDefault();
		var paymentStatus = event.target.paymentStatus.value;
		var deliveryStatus = event.target.paymentStatus.value;
		//CodeBashApp.purchaseService.getInstance().updatePurchase(Session.get('updateId'),paymentStatus,deliveryStatus);
		//$("#editModal").modal("hide");
	},
	"click #newPurchase":function()
	{
		Router.go('/purchaseDetails');
	},
	"click #viewFinalPurchase":function()
	{
		Session.set('finalPurchaseId',this._id);
		Router.go('/finalPurchasePreview');
	},
	'click #deleteDetails':function()
	{
		Session.set('deleteId',this._id);	
		$("#deleteModal").modal("show");
	},
	'click #deletePurchase':function()
	{
		 var purchaseObj = CodeBashApp.purchaseService.getInstance().findPurchaseById(Session.get('deleteId'))[0];
		 var purchaseDetailsObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(purchaseObj.purchaseId);
		 for(var i=0;i<purchaseDetailsObj.length;i++)
		 {
		 	CodeBashApp.purchaseDetailsService.getInstance().deletePurchaseDetails(purchaseDetailsObj[i]._id);
		 }
		 CodeBashApp.purchaseService.getInstance().deletePurchase(Session.get('deleteId'));
		$("#deleteModal").modal("hide");	 
	}
});