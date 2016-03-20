CodeBashApp.purchaseDetailsOnReady=function(){

	 $(document).ready(function () {
	 	Session.set('purchasedPlants','');
	 	 Session.set('plants','');
	 	Session.set('detailsSaved','');
	 	$("#plantName").val('');
		$("#invoiceNo").val('');
		$("#sellerId").val('');
		$("#paymentStatus").val('');
		$("#deliveryStatus").val('');
		$("#date").val('');
		$("#items :text").each(function(){
			$(this).val('');				 
		});
		var tempObj = temp.find().fetch();
		for(var i = 0;i<tempObj.length;i++)
		{
		temp.remove(tempObj[i]._id)	;
		}
   /* $('#list-plants').DataTable();
    $(".tool-tip").tooltip();*/
});


};