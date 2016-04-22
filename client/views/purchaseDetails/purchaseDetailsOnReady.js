CodeBashApp.purchaseDetailsOnReady=function(){

	 $(document).ready(function () {
	 	Session.set('purchasedPlants','');
	 	 Session.set('plants','');
	 	Session.set('detailsSaved','');
	 	$("#plantName").val('');
		$("#purchaseNo").val('');
		$("#date").val('');
		$("#items :text").each(function(){
			$(this).val('');				 
		});

		var tempObj = temp.find().fetch();
		for(var i = 0;i<tempObj.length;i++)
		{
			temp.remove(tempObj[i]._id)	;
		}

		$("#purchaseNo").keydown(function(event) {
			console.log('purchase no on ready');
			$("#purchaseNoGroup").removeClass('form-group has-error has-feedback');                 
			$("#purchaseNoGroup").addClass('form-group');                 
        	$("#purchaseNoSpan").html('');                			
    	});
    	
    	$("#sellerId").keydown(function(event) {	
    		$("#sellerIdGroup").removeClass('form-group has-error has-feedback');                 
			$("#sellerIdGroup").addClass('form-group');                 
        	$("#sellerIdSpan").html('');                			
    	});

    	$("#paymentStatus").keydown(function(event) {	
    		$("#paymentStatusGroup").removeClass('form-group has-error has-feedback');                 
			$("#paymentStatusGroup").addClass('form-group');                 
        	$("#paymentStatusSpan").html('');                			
    	});

    	$("#deliveryStatus").keydown(function(event) {	
    		$("#deliveryStatusGroup").removeClass('form-group has-error has-feedback');                 
			$("#deliveryStatusGroup").addClass('form-group');                 
        	$("#deliveryStatusSpan").html('');                			
    	});

		$("#sellerId").click(function(event) {	
    		$("#sellerIdGroup").removeClass('form-group has-error has-feedback');                 
			$("#sellerIdGroup").addClass('form-group');                 
        	$("#sellerIdSpan").html('');                			
    	});

    	$("#paymentStatus").click(function(event) {	
    		$("#paymentStatusGroup").removeClass('form-group has-error has-feedback');                 
			$("#paymentStatusGroup").addClass('form-group');                 
        	$("#paymentStatusSpan").html('');                			
    	});

    	$("#deliveryStatus").click(function(event) {	
    		$("#deliveryStatusGroup").removeClass('form-group has-error has-feedback');                 
			$("#deliveryStatusGroup").addClass('form-group');                 
        	$("#deliveryStatusSpan").html('');                			
    	});

        $("#quantity").keydown(function(event) {
			$("#quantityGroup").removeClass('form-group has-error has-feedback');                 
			$("#quantityGroup").addClass('form-group');                 
        	$("#quantitySpan").html('');   
        });
        $("#date").keydown(function(event) {
			$("#dateGroup").removeClass('form-group has-error has-feedback');                 
			$("#dateGroup").addClass('form-group');                 
        	$("#dateSpan").html('');   
        });
        $("#plantName").keydown(function(event) {
			$("#tableGroup").removeClass('form-group has-error has-feedback');                 
			$("#tableGroup").addClass('form-group');                 
        	$("#tableSpan").html('');   
        });
        $("#date").click(function(event) {
			$("#dateGroup").removeClass('form-group has-error has-feedback');                 
			$("#dateGroup").addClass('form-group');                 
        	$("#dateSpan").html('');   
        });
   /* $('#list-plants').DataTable();
    $(".tool-tip").tooltip();*/

});


};