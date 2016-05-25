CodeBashApp.sellerDetailsOnReady = function(){
	$(document).ready(function () {
        $('#list-sellers').DataTable();
        $('[data-toggle="tooltip"]').tooltip();  
    });

    $("#newSellerPhoneNo,#sellerPhoneNo").keydown(function(event) {
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

    $("#newAccountNumber,#accountNumber").keydown(function(event) {
    // Allow only backspace and delete
    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 ) {
        // let it happen, don't do anything
    }
    else {
        // Ensure that it is a number and stop the keypress
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault(); 
        }   
    }
});

    $("#newSellerName").keydown(function(event) {
        $("#newSellerNameGroup").removeClass('form-group has-error has-feedback');
        $("#newSellerNameGroup").addClass('form-group');
        $("#newSellerNameSpan").html('');
    });

    $("#newSellerAddress").keydown(function(event) {
        $("#newSellerAddressGroup").removeClass('form-group has-error has-feedback');
        $("#newSellerAddressGroup").addClass('form-group');
        $("#newSellerAddressSpan").html('');
    });    

    $("#newSellerPhoneNo").keydown(function(event) {
        $("#newSellerPhoneNoGroup").removeClass('form-group has-error has-feedback');
        $("#newSellerPhoneNoGroup").addClass('form-group');
        $("#newSellerPhoneNoSpan").html('');
    });    

    $("#newSellerEmailId").keydown(function(event) {
        $("#newSellerEmailIdGroup").removeClass('form-group has-error has-feedback');
        $("#newSellerEmailIdGroup").addClass('form-group');
        $("#newSellerEmailIdSpan").html('');
    });    

    $("#newBankName").keydown(function(event) {
        $("#newBankNameGroup").removeClass('form-group has-error has-feedback');
        $("#newBankNameGroup").addClass('form-group');
        $("#newBankNameSpan").html('');
    });    

    $("#newBranchName").keydown(function(event) {
        $("#newBranchNameGroup").removeClass('form-group has-error has-feedback');
        $("#newBranchNameGroup").addClass('form-group');
        $("#newBranchNameSpan").html('');
    });    

    $("#newIFSC").keydown(function(event) {
        $("#newIFSCGroup").removeClass('form-group has-error has-feedback');
        $("#newIFSCGroup").addClass('form-group');
        $("#newIFSCSpan").html('');
    });    

    $("#newAccountNumber").keydown(function(event) {
        $("#newAccountNumberGroup").removeClass('form-group has-error has-feedback');
        $("#newAccountNumberGroup").addClass('form-group');
        $("#newAccountNumberSpan").html('');
        $("#newConfirmAccountNumberGroup").removeClass('form-group has-error has-feedback');
        $("#newConfirmAccountNumberGroup").addClass('form-group');
        $("#newConfirmAccountNumberSpan").html('');
    });    

    $("#newConfirmAccountNumber").keydown(function(event) {
        $("#newConfirmAccountNumberGroup").removeClass('form-group has-error has-feedback');
        $("#newConfirmAccountNumberGroup").addClass('form-group');
        $("#newConfirmAccountNumberSpan").html('');
        $("#newAccountNumberGroup").removeClass('form-group has-error has-feedback');
        $("#newAccountNumberGroup").addClass('form-group');
        $("#newAccountNumberSpan").html('');
        
    });    

    $("#sellerName").keydown(function(event) {
        $("#sellerNameGroup").removeClass('form-group has-error has-feedback');
        $("#sellerNameGroup").addClass('form-group');
        $("#sellerNameSpan").html('');
        $("#editSellerSpan").html('');
    });

    $("#sellerAddress").keydown(function(event) {
        $("#sellerAddressGroup").removeClass('form-group has-error has-feedback');
        $("#sellerAddressGroup").addClass('form-group');
        $("#sellerAddressSpan").html('');
        $("#editSellerSpan").html('');
    });

    $("#sellerPhoneNo").keydown(function(event) {
        $("#sellerPhoneNoGroup").removeClass('form-group has-error has-feedback');
        $("#sellerPhoneNoGroup").addClass('form-group');
        $("#sellerPhoneNoSpan").html('');
        $("#editSellerSpan").html('');
    });

    $("#sellerEmailId").keydown(function(event) {
        $("#sellerEmailIdGroup").removeClass('form-group has-error has-feedback');
        $("#sellerEmailIdGroup").addClass('form-group');
        $("#sellerEmailIdSpan").html('');
        $("#editSellerSpan").html('');
    });

    $("#bankName").keydown(function(event) {
        $("#bankNameGroup").removeClass('form-group has-error has-feedback');
        $("#bankNameGroup").addClass('form-group');
        $("#bankNameSpan").html('');
        $("#editSellerSpan").html('');
    });

    $("#branchName").keydown(function(event) {
        $("#branchNameGroup").removeClass('form-group has-error has-feedback');
        $("#branchNameGroup").addClass('form-group');
        $("#branchNameSpan").html('');
        $("#editSellerSpan").html('');
    });

    $("#IFSC").keydown(function(event) {
        $("#IFSCGroup").removeClass('form-group has-error has-feedback');
        $("#IFSCGroup").addClass('form-group');
        $("#IFSCSpan").html('');
        $("#editSellerSpan").html('');
    });

    $("#accountNumber").keydown(function(event) {
        $("#accountNumberGroup").removeClass('form-group has-error has-feedback');
        $("#accountNumberGroup").addClass('form-group');
        $("#accountNumberSpan").html('');
        $("#editSellerSpan").html('');
        $("#confirmAccountNumberGroup").removeClass('form-group has-error has-feedback');
        $("#confirmAccountNumberGroup").addClass('form-group');
        $("#confirmAccountNumberSpan").html('');
    });

    $("#confirmAccountNumber").keydown(function(event) {
        $("#confirmAccountNumberGroup").removeClass('form-group has-error has-feedback');
        $("#confirmAccountNumberGroup").addClass('form-group');
        $("#confirmAccountNumberSpan").html('');
        $("#accountNumberGroup").removeClass('form-group has-error has-feedback');
        $("#accountNumberGroup").addClass('form-group');
        $("#accountNumberSpan").html('');
        $("#editSellerSpan").html('');
    });
};