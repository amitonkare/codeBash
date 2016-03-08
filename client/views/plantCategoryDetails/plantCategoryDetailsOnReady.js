CodeBashApp.plantCategoryDetailsOnReady = function(){
$(document).ready(function () {
    $('#list-Categorys').DataTable();
    $(".tool-tip").tooltip();
});
$("#newPlantCategory").keydown(function(event) {
    $("#newPlantCategoryGroup").removeClass('form-group has-error has-feedback');
    $("#newPlantCategoryGroup").addClass('form-group');
    $("#newPlantCategorySpan").html('');
});

$("#PlantCategory").keydown(function(event) {
    $("#PlantCategoryGroup").removeClass('form-group has-error has-feedback');
    $("#PlantCategoryGroup").addClass('form-group');
    $("#PlantCategorySpan").html('');
});

};