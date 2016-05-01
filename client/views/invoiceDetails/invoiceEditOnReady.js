CodeBashApp.invoiceEditOnReady = function () {
	$("#invoiceNo").keydown(function(event) {
         console.log('invoice no on ready');
         $("#invoiceNoGroup").removeClass('form-group has-error has-feedback');                 
         $("#invoiceNoGroup").addClass('form-group');                 
         $("#invoiceNoSpan").html('');                			
         $("#tableSpan").html('');
     });
      
      $("#buyerId").keydown(function(event) {	
          $("#buyerIdGroup").removeClass('form-group has-error has-feedback');                 
          $("#buyerIdGroup").addClass('form-group');                 
          $("#buyerIdSpan").html(''); 
          $("#tableSpan").html('');               			
      });

      $("#paymentStatus").keydown(function(event) {	
          $("#paymentStatusGroup").removeClass('form-group has-error has-feedback');                 
          $("#paymentStatusGroup").addClass('form-group');                 
          $("#paymentStatusSpan").html('');                			
          $("#tableSpan").html('');
      });

      $("#deliveryStatus").keydown(function(event) {	
          $("#deliveryStatusGroup").removeClass('form-group has-error has-feedback');                 
          $("#deliveryStatusGroup").addClass('form-group');                 
          $("#deliveryStatusSpan").html('');                			
          $("#tableSpan").html('');
      });

      $("#buyerId").click(function(event) {	
          $("#buyerIdGroup").removeClass('form-group has-error has-feedback');                 
          $("#buyerIdGroup").addClass('form-group');                 
          $("#buyerIdSpan").html('');                			
          $("#tableSpan").html('');
      });

      $("#paymentStatus").click(function(event) {	
          $("#paymentStatusGroup").removeClass('form-group has-error has-feedback');                 
          $("#paymentStatusGroup").addClass('form-group');                 
          $("#paymentStatusSpan").html('');                			
          $("#tableSpan").html('');
      });

      $("#deliveryStatus").click(function(event) {	
          $("#deliveryStatusGroup").removeClass('form-group has-error has-feedback');                 
          $("#deliveryStatusGroup").addClass('form-group');                 
          $("#deliveryStatusSpan").html('');                			
          $("#tableSpan").html('');
      });

      $("#quantity").keydown(function(event) {
         $("#quantityGroup").removeClass('form-group has-error has-feedback');                 
         $("#quantityGroup").addClass('form-group');                 
         $("#quantitySpan").html('');   
         $("#tableSpan").html('');
     });
      $("#date").keydown(function(event) {
         $("#dateGroup").removeClass('form-group has-error has-feedback');                 
         $("#dateGroup").addClass('form-group');                 
         $("#dateSpan").html('');   
         $("#tableSpan").html('');
     });
      $("#plantName").keydown(function(event) {
         $("#tableGroup").removeClass('form-group has-error has-feedback');                 
         $("#tableGroup").addClass('form-group');                 
         $("#tableSpan").html('');
         $("#tableSpan").html('');   
     });
      $("#date").click(function(event) {
         $("#dateGroup").removeClass('form-group has-error has-feedback');                 
         $("#dateGroup").addClass('form-group');                 
         $("#dateSpan").html(''); 
         $("#tableSpan").html('');  
     });


};