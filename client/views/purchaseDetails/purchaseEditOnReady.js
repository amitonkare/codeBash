CodeBashApp.purchaseEditOnReady = function (plantName) {
	
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

	$("#cost,#quantity,#tax").keydown(function(event) {
          // Allow only backspace and delete
          if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 190) {
    // let it happen, don't do anything
}
else {
    // Ensure that it is a number and stop the keypress
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
    	event.preventDefault(); 
    }   
}
});

};