CodeBashApp.printPurchaseDetails=function(purchaseNo,date,paymentStatus,deliveryStatus,sellerName){

	var headstr = "<html><head><title></title></head><body>";
	var footstr = "</body>";
	var tempObj = temp.find().fetch();
	var contentstr = "<br><br><br><br><br><br><p>Purchase no :"+purchaseNo+"<br>Seller Name :"+sellerName+" <br>"+"Date :"+date+"<br>Payment Status :"+paymentStatus+"<br>Delivery Status  :"+deliveryStatus;	
	var tableHeader ="<table "+"border="+"1"+" style="+"width:100%"+"><thead><tr><th>PlantName</th><th>Quantity</th><th>Cost</th><th>Total</th></tr></thead>";
	var tableBody = "<tbody>";
	var tableFooter = "</tbody></table>";
	var tableContent = "";
	var sum = 0;
	for(var i=0;i<tempObj.length;i++)
	{
		var plantObj = CodeBashApp.plantDetailsService.getInstance().findPlantById(tempObj[i].plantId);
		tempObj[i].plantId = plantObj[0].name;
		tableContent = tableContent + "<tr><td>"+tempObj[i].plantId+"</td><td>"+tempObj[i].quantity+"</td><td>"+tempObj[i].cost+"</td><td>"+(tempObj[i].cost*tempObj[i].quantity)+"</td></tr>";
		sum = sum+Number((tempObj[i].cost*tempObj[i].quantity));
	}
	tableContent = tableContent + "<tr><td></td><td></td><td><b>Total Cost</b></td><td>"+sum+"</td></tr>";
	//var newstr = document.getElementById("#printDiv").innerHTML;
	var oldstr = document.body.innerHTML;
	document.body.innerHTML = headstr+contentstr+tableHeader+tableBody+tableContent+tableFooter+footstr;
	window.print();
	document.body.innerHTML = oldstr;
	return false;
	




};