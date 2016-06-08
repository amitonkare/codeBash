
Template.invoiceDetailsLandingPageTable.onRendered( function(){
	CodeBashApp.invoiceDetailsLandingPageOnReady();
});

Template.invoiceDetailsLandingPageTable.helpers({
	invoiceList:function()
	{
		var obj = CodeBashApp.invoiceService.getInstance().findInvoiceByDeliveryStatus(' Delivered ');
		console.log(obj);
		for(var i=0;i<obj.length;i++)
		{			
			obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerNameById(obj[i].buyerId)[0].name;
		}
		return obj;
	},
	finalInvoiceList:function()
	{
		var obj = CodeBashApp.invoiceService.getInstance().findInvoiceByStatus("final");
		console.log(obj);
		for(var i=0;i<obj.length;i++)
		{			
			//console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
			obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerNameById(obj[i].buyerId)[0].name;
		}
		return obj;
	},
	updateObj:function()
	{
		return CodeBashApp.invoiceService.getInstance().findInvoiceById(Session.get('updateId'))[0];
	},
	undeliveredList:function()
	{
		var obj = CodeBashApp.invoiceService.getInstance().findInvoiceByDeliveryStatus(' Yet to Dispatch ');
		console.log(obj);
		for(var i=0;i<obj.length;i++)
		{			
			//console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
			obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerNameById(obj[i].buyerId)[0].name;
		}
		console.log(obj);
		return obj;	
	}
});

Template.invoiceDetailsLandingPageTable.events({
	"click #updateDetails":function()
	{
		//
		Session.set('updateId',this._id);	
		Session.set('editInvoiceId',Session.get('updateId'));
		Router.go('/invoiceEdit');
		
	},
	"submit #editInvoiceForm":function(event)
	{
		event.preventDefault();
		//$("#editModal").modal("hide");
	},
	"click #newInvoice":function()
	{
		Router.go('/invoiceDetails');
	},
	"click #viewFinalInvoice":function()
	{
		Session.set('finalInvoiceId',this._id);
		Router.go('/finalInvoicePreview');
	},
	"click #deleteDetails":function()
	{
		Session.set('deleteId',this._id);		
		$("#deleteModal").modal("show");
	},
	"click #deleteInvoice":function()
	{
		var invoiceObj = CodeBashApp.invoiceService.getInstance().findInvoiceById(Session.get('deleteId'))[0];
		var invoiceDetailsObj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(invoiceObj.invoiceId);
		for(var i = 0;i<invoiceDetailsObj.length;i++)
		{
				CodeBashApp.invoiceDetailsService.getInstance().deleteInvoiceDetails(invoiceDetailsObj[i]._id);
		}
		CodeBashApp.invoiceService.getInstance().deleteInvoice(invoiceObj._id);
		$("#deleteModal").modal("hide");	
	}



});