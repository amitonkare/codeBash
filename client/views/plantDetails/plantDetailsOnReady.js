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
$("#PlantName").keydown(function(event) {
    $("#PlantNameGroup").removeClass('form-group has-error has-feedback');
    $("#PlantNameGroup").addClass('form-group');
    $("#PlantNameSpan").html('');
});



 
};