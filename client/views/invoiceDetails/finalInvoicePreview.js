CodeBashApp.printFinalInvoiceDetails = function(){	
	
	var obj = CodeBashApp.invoiceService.getInstance().findInvoiceById(Session.get('finalInvoiceId'));	
	obj[0].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerNameById(obj[0].buyerId)[0].name;
	var headstr = "<html><head><title></title></head><body>";
	var footstr = "</body>";
	var tempObj =  CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(obj[0].invoiceId);
	var contentstr = "<br><br><br><br><br><br><p>Invoice no :"+obj[0].invoiceId+"<br>Buyer Name :"+obj[0].buyerId+" <br>"+"Date :"+obj[0].date+"<br>Payment Status :"+obj[0].paymentStatus+"<br>Delivery Status  :"+obj[0].deliveryStatus;	
	var tableHeader ="<table "+"border="+"1"+" style="+"width:100%"+"><thead><tr><th>PlantName</th><th>Quantity</th><th>Cost</th><th>Total</th></tr></thead>";
	var tableBody = "<tbody>";
	var tableFooter = "</tbody></table>";
	var tableContent = "";
	var sum = 0;
	for(var i=0;i<tempObj.length;i++)
	{
		var plantObj = CodeBashApp.plantDetailsService.getInstance().findPlantById(tempObj[i].plantId);
		tempObj[i].plantId = plantObj[0].name;
		tableContent = tableContent + "<tr><td>"+tempObj[i].plantId+"</td><td>"+tempObj[i].quantity+"</td><td>"+tempObj[i].sellingCost+"</td><td>"+(tempObj[i].sellingCost*tempObj[i].quantity)+"</td></tr>";
		sum = sum+Number((tempObj[i].sellingCost*tempObj[i].quantity));
	}
	tableContent = tableContent + "<tr><td></td><td></td><td><b>Total Cost</b></td><td>"+sum+"</td></tr>";
	var tax = ((14/100)* Number(sum));
	tax = (tax + (0.5*Number(tax)));
	tax = tax.toFixed(2);
	tableContent = tableContent + "<tr><td></td><td></td><td><b>Total Tax</b></td><td>"+tax+"</td></tr>";
	tableContent = tableContent + "<tr><td></td><td></td><td><b>Amount Payable</b></td><td>"+(Number(sum)+Number(tax))+"</td></tr>";
	//var newstr = document.getElementById("#printDiv").innerHTML;
	var oldstr = document.body.innerHTML;
	document.body.innerHTML = headstr+contentstr+tableHeader+tableBody+tableContent+tableFooter+footstr;
	window.print();
	document.body.innerHTML = oldstr;
	return false;
};

Template.finalInvoicePreview.helpers({
	invoiceData:function()
	{
		var obj = CodeBashApp.invoiceService.getInstance().findInvoiceById(Session.get('finalInvoiceId'));		
		console.log(obj);
		obj[0].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerNameById(obj[0].buyerId)[0].name;
		return obj[0];
	},
	invoiceDetailsData:function()
	{
		var obj = CodeBashApp.invoiceService.getInstance().findInvoiceById(Session.get('finalInvoiceId'));
		var invoiceDetailsObj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(obj[0].invoiceId);
		for(var i=0;i<invoiceDetailsObj.length;i++)
		{
			invoiceDetailsObj[i].plantId = CodeBashApp.plantDetailsService.getInstance().findPlantById(invoiceDetailsObj[i].plantId)[0].name;
		}	
		return invoiceDetailsObj;
	},
	netTotal:function()
	{
		var obj = CodeBashApp.invoiceService.getInstance().findInvoiceById(Session.get('finalInvoiceId'));
		var invoiceDetailsObj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(obj[0].invoiceId);
		var total = 0;
		for(var i=0;i<invoiceDetailsObj.length;i++)
		{
			total = total + (invoiceDetailsObj[i].quantity * invoiceDetailsObj[i].sellingCost);
		}
		Session.set('total',total);
		return total;
	},
	totalTax:function()
	{
		var tax;
		if(Session.get('total'))
		{	

			tax = ((14/100)* Number(Session.get('total')));
			tax = (tax + (0.5*Number(tax)));
			tax = tax.toFixed(2);
			Session.set('tax',tax);
			return tax;
		}
	},
	grandTotal:function()
	{
		var grandTotal;
		if(Session.get('total') && Session.get('tax'))
		{
			grandTotal = (Number(Session.get('total'))+Number(Session.get('tax')));
			//grandTotal = grandTotal.toFixed(2);
			return grandTotal;
		}

	}
});

Template.finalInvoicePreview.events({
	"click #printInvoice":function()
	{
		CodeBashApp.printFinalInvoiceDetails();
		$("#rootDiv").remove();
		Router.current().render(Template.finalInvoicePreview);
	}
});