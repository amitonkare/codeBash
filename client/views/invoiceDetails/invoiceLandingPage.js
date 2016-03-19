Template.invoiceDetailsLandingPage.onRendered( function(){
CodeBashApp.invoiceDetailsLandingPageOnReady();
});

Template.invoiceDetailsLandingPage.helpers({
	invoiceList:function()
	{
		var obj = CodeBashApp.invoiceService.getInstance().findInvoice();
		for(var i=0;i<obj.length;i++)
		{			
			console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
			obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
		}
		return obj;
	},
	updateObj:function()
	{
		return CodeBashApp.invoiceService.getInstance().findInvoiceById(Session.get('updateId'))[0];
	}
});

Template.invoiceDetailsLandingPage.events({
	"click #updateDetails":function()
	{
		//$("#editModal").modal("show");
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
	}
});