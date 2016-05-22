CodeBashApp.printFinalPurchaseDetails=function(){
	var obj = CodeBashApp.purchaseService.getInstance().findPurchaseById(Session.get('finalPurchaseId'));
	obj[0].sellerId = CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[0].sellerId)[0].name;	
	var headstr = "<html><head><title></title></head><body>";
	var footstr = "</body>";
	var tempObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(obj[0].purchaseId);
	var contentstr = "<br><br><br><br><br><br><p>Purchase no :"+obj[0].purchaseId+"<br>Seller Name :"+obj[0].sellerId+" <br>"+"Date :"+obj[0].date+"<br>Payment Status :"+obj[0].paymentStatus+"<br>Delivery Status  :"+obj[0].deliveryStatus;	
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
Template.finalPurchasePreview.helpers({
	purchaseData:function()
	{
		var obj = CodeBashApp.purchaseService.getInstance().findPurchaseById(Session.get('finalPurchaseId'));
		obj[0].sellerId = CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[0].sellerId)[0].name;
		return obj[0];
	},
	itemList:function()
	{
		var obj = CodeBashApp.purchaseService.getInstance().findPurchaseById(Session.get('finalPurchaseId'));
		var purchaseDetailsObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(obj[0].purchaseId);
		for(var i=0;i<purchaseDetailsObj.length;i++)
		{
			purchaseDetailsObj[i].plantId = CodeBashApp.plantDetailsService.getInstance().findPlantById(purchaseDetailsObj[i].plantId)[0].name;
		}
		return purchaseDetailsObj;
	}
});
Template.finalPurchasePreview.events({
	"click #printPurchase":function()
	{
		CodeBashApp.printFinalPurchaseDetails();
		$("#rootDiv").remove();
		Router.current().render(Template.finalPurchasePreview);
	}
});