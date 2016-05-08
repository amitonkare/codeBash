CodeBashApp.plantDetailsOnReady = function(){
$(document).ready(function () {
     
     $('#list-plants').DataTable();
     $('[data-toggle="tooltip"]').tooltip();     
   
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
$("#newPlantName").keydown(function(event) {
    $("#newPlantNameGroup").removeClass('form-group has-error has-feedback');
    $("#newPlantNameGroup").addClass('form-group');
    $("#newPlantNameSpan").html('');
});
$("#plantScientificName").keydown(function(event) {
    $("#plantScientificNameGroup").removeClass('form-group has-error has-feedback');
	$("#plantScientificNameGroup").addClass('form-group');
    $("#plantScientificNameSpan").html('');
});
$("#plantName").keydown(function(event) {
    $("#plantNameGroup").removeClass('form-group has-error has-feedback');
    $("#plantNameGroup").addClass('form-group');
    $("#plantNameSpan").html('');
});



 
};