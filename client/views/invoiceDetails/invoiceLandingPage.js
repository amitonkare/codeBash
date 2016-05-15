/*Template.navbar.onRendered(
	function()
	{
		var routeName = Router.current().route.getName();
		console.log("route name--->"+routeName);
		$("#nav li").each(function(){			
			if($(this).text().search(routeName) !== -1)
			{
				console.log("inside if");
				$(this).addClass('active');
				console.log("list class changed");
			}
		});		
	}
);
*/

Template.invoiceDetailsLandingPageTable.onRendered( function(){
	CodeBashApp.invoiceDetailsLandingPageOnReady();
});

Template.invoiceDetailsLandingPageTable.helpers({
	invoiceList:function()
	{
		var obj = CodeBashApp.invoiceService.getInstance().findInvoiceByStatus('saved');
		for(var i=0;i<obj.length;i++)
		{			
			console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
			obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
		}
		return obj;
	},
	finalInvoiceList:function()
	{
		var obj = CodeBashApp.invoiceService.getInstance().findInvoiceByStatus("final");
		console.log(obj);
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

Template.invoiceDetailsLandingPageTable.events({
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