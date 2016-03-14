CodeBashApp.buyerDetailsOnReady = function(){
	$(document).ready(function () {
        $('#list-buyers').DataTable();
        $(".tool-tip").tooltip();
    });

$("#newBuyerPhoneNo,#buyerPhoneNo").keydown(function(event) {
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

$("#newBuyerName").keydown(function(event) {
    $("#newBuyerNameGroup").removeClass('form-group has-error has-feedback');
    $("#newBuyerNameGroup").addClass('form-group');
    $("#newBuyerNameSpan").html('');
});

$("#newBuyerAddress").keydown(function(event) {
    $("#newBuyerAddressGroup").removeClass('form-group has-error has-feedback');
    $("#newBuyerAddressGroup").addClass('form-group');
    $("#newBuyerAddressSpan").html('');
});    

$("#newBuyerPhoneNo").keydown(function(event) {
    $("#newBuyerPhoneNoGroup").removeClass('form-group has-error has-feedback');
    $("#newBuyerPhoneNoGroup").addClass('form-group');
    $("#newBuyerPhoneNoSpan").html('');
});    

$("#newBuyerEmailId").keydown(function(event) {
    $("#newBuyerEmailIdGroup").removeClass('form-group has-error has-feedback');
    $("#newBuyerEmailIdGroup").addClass('form-group');
    $("#newBuyerEmailIdSpan").html('');
});    

$("#newBankName").keydown(function(event) {
    $("#newBuyerEmailIdGroup").removeClass('form-group has-error has-feedback');
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
});    

$("#buyerName").keydown(function(event) {
    $("#buyerNameGroup").removeClass('form-group has-error has-feedback');
    $("#buyerNameGroup").addClass('form-group');
    $("#buyerNameSpan").html('');
});

$("#buyerAddress").keydown(function(event) {
    $("#buyerAddressGroup").removeClass('form-group has-error has-feedback');
    $("#buyerAddressGroup").addClass('form-group');
    $("#buyerAddressSpan").html('');
});

$("#buyerPhoneNo").keydown(function(event) {
    $("#buyerPhoneNoGroup").removeClass('form-group has-error has-feedback');
    $("#buyerPhoneNoGroup").addClass('form-group');
    $("#buyerPhoneNoSpan").html('');
});

$("#buyerEmailId").keydown(function(event) {
    $("#buyerEmailIdGroup").removeClass('form-group has-error has-feedback');
    $("#buyerEmailIdGroup").addClass('form-group');
    $("#buyerEmailIdSpan").html('');
});

$("#bankName").keydown(function(event) {
    $("#bankNameGroup").removeClass('form-group has-error has-feedback');
    $("#bankNameGroup").addClass('form-group');
    $("#bankNameSpan").html('');
});

$("#branchName").keydown(function(event) {
    $("#branchNameGroup").removeClass('form-group has-error has-feedback');
    $("#branchNameGroup").addClass('form-group');
    $("#branchNameSpan").html('');
});

$("#IFSC").keydown(function(event) {
    $("#IFSCGroup").removeClass('form-group has-error has-feedback');
    $("#IFSCGroup").addClass('form-group');
    $("#IFSCSpan").html('');
});

$("#accountNumber").keydown(function(event) {
    $("#accountNumberGroup").removeClass('form-group has-error has-feedback');
    $("#accountNumberGroup").addClass('form-group');
    $("#accountNumberSpan").html('');
});

};