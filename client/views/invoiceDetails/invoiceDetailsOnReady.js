CodeBashApp.invoiceDetailsOnReady=function(){

	 $(document).ready(function () {
	 Session.set('plants','');
	 Session.set('detailsSaved','');
	 Session.set('total','');
	 $("#plantName").val('');
	 $("#invoiceNo").val('');
	 $("#buyerId").val('');
	 $("#paymentStatus").val('');
	 $("#deliveryStatus").val('');
	 $("#date").val('');
	 $("#items :text").each(function(){
	 	$(this).val('');				 
	 });
	 Session.set('invoiceTotalProfit','');
	 Session.set('invoiceTotalCost','');
	 Session.set("invoiceSaved",'');	
	 Session.set('detailsSaved','');
	 Session.set('tax','');
	 var tempObj = temp.find().fetch();
	 for(var i = 0;i<tempObj.length;i++)
	 {
		temp.remove(tempObj[i]._id)	;
	 }
		

	/*$('#list-plants').DataTable();
    $(".tool-tip").tooltip();*/

});

 
};