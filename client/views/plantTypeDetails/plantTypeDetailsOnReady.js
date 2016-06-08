CodeBashApp.plantTypeDetailsTableOnReady = function(){
$(document).ready(function () {
    $('#list-types').DataTable();
    $(".tool-tip").tooltip();
});
$("#newPlantType").keydown(function(event) {
    $("#newPlantTypeGroup").removeClass('form-group has-error has-feedback');
    $("#newPlantTypeGroup").addClass('form-group');
    $("#newPlantTypeSpan").html('');
});

$("#PlantType").keydown(function(event) {
    $("#PlantTypeGroup").removeClass('form-group has-error has-feedback');
    $("#PlantTypeGroup").addClass('form-group');
    $("#PlantTypeSpan").html('');
});

};