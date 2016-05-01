CodeBashApp.invoiceDetailsValidate = function(){
 var validate = 'false';
 if(validate == 'false')
 {
   if($("#invoiceNo").val()=='')
   {
       event.preventDefault();
       $("#invoiceNoGroup").addClass('form-group has-error has-feedback');                 
       $("#invoiceNoSpan").html('please enter invoice No');                
   }
   else
    if($("#paymentStatus").val()=='')
    {
       event.preventDefault();
       $("#paymentStatusGroup").addClass('form-group has-error has-feedback');                 
       $("#paymentStatusSpan").html('please enter paymentstatus');                
   }
   else
     if($("#deliveryStatus").val()=='')
     {
       event.preventDefault();
       $("#deliveryStatusGroup").addClass('form-group has-error has-feedback');                 
       $("#deliveryStatusSpan").html('please enter delivery status');                
   }
   else
   {
      validate = true;
  }
}
return validate;
};