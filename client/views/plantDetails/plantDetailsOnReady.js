CodeBashApp.plantDetailsOnReady = function(){
$(document).ready(function () {
    $('#list-plants').DataTable();
    $(".tool-tip").tooltip();
});
$("#newPlantName").keydown(function(event) {
    $("#newPlantNameGroup").removeClass('form-group has-error has-feedback');
    $("#newPlantNameGroup").addClass('form-group');
    $("#newPlantNameSpan").html('');
});
$("#newPlantScientificName").keydown(function(event) {
    $("#newPlantScientificNameGroup").removeClass('form-group has-error has-feedback');
    $("#newPlantScientificNameGroup").addClass('form-group');
    $("#newPlantScientificNameSpan").html('');
});
$("#newPlantQuantity").keydown(function(event) {
    $("#newPlantQuantityGroup").removeClass('form-group has-error has-feedback');
    $("#newPlantQuantityGroup").addClass('form-group');
    $("#newPlantQuantitySpan").html('');
});   
$("#newPlantCost").keydown(function(event) {
    $("#newPlantCostGroup").removeClass('form-group has-error has-feedback');
    $("#newPlantCostGroup").addClass('form-group');
    $("#newPlantCostSpan").html('');
});	 
$("#newPlantName").keydown(function(event) {
    $("#newPlantNameGroup").removeClass('form-group has-error has-feedback');
    $("#newPlantNameGroup").addClass('form-group');
    $("#newPlantNameSpan").html('');
});
$("#PlantName").keydown(function(event) {
    $("#PlantNameGroup").removeClass('form-group has-error has-feedback');
	$("#PlantNameGroup").addClass('form-group');
    $("#PlantNameSpan").html('');
});
$("#PlantScientificName").keydown(function(event) {
    $("#PlantScientificNameGroup").removeClass('form-group has-error has-feedback');
	$("#PlantScientificNameGroup").addClass('form-group');
    $("#PlantScientificNameSpan").html('');
});
$("#PlantQuantity").keydown(function(event) {
    $("#PlantQuantityGroup").removeClass('form-group has-error has-feedback');
    $("#PlantQuantityGroup").addClass('form-group');
    $("#PlantQuantitySpan").html('');
});   
$("#PlantCost").keydown(function(event) {
    $("#PlantQuantityGroup").removeClass('form-group has-error has-feedback');
    $("#PlantCostGroup").addClass('form-group');
    $("#PlantCostSpan").html('');
});     
$("#PlantName").keydown(function(event) {
    $("#PlantNameGroup").removeClass('form-group has-error has-feedback');
    $("#PlantNameGroup").addClass('form-group');
    $("#PlantNameSpan").html('');
});
$("#newPlantCost,#plantCost").keydown(function(event) {
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

    $("#newPlantQuantity,#plantQuantity").keydown(function(event) {
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
    




 
};