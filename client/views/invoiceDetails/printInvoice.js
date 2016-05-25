CodeBashApp.printInvoiceDetails = function(invoiceNo,date,paymentStatus,deliveryStatus,buyerName,taxPercent){
	
	var headstr = "<html><head><title></title></head><body>";
	var footstr = "</body>";
	var tempObj = temp.find().fetch();
	var contentstr = "<br><br><br><br><br><br><p>Invoice no :"+invoiceNo+"<br>Buyer Name :"+buyerName+" <br>"+"Date :"+date+"<br>Payment Status :"+paymentStatus+"<br>Delivery Status  :"+deliveryStatus;	
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
	var tax = ((taxPercent/100)* Number(sum));
	tax = (tax + ((0.5/100)*Number(tax)));
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