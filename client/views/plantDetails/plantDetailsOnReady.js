CodeBashApp.plantDetailsOnReady = function(){
    $(document).ready(function () {
       
      
       $('#list-plants').DataTable();
       $('[data-toggle="tooltip"]').tooltip();   
      
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
        $("#editPlantSpan").html('');
    });

    $("#plantName").keydown(function(event) {
        $("#plantNameGroup").removeClass('form-group has-error has-feedback');
        $("#plantNameGroup").addClass('form-group');
        $("#plantNameSpan").html('');
        $("#editPlantSpan").html('');
    });

    $("#newPlantType").click(function(event) {
        $("#newPlantTypeGroup").removeClass('form-group has-error has-feedback');
        $("#newPlantTypeGroup").addClass('form-group');
        $("#newPlantTypeSpan").html('');
    });

    $("#newPlantCategory").click(function(event) {
        $("#newPlantCategoryGroup").removeClass('form-group has-error has-feedback');
        $("#newPlantCategoryGroup").addClass('form-group');
        $("#newPlantCategorySpan").html('');
    });

    $("#plantType").click(function(event) {
        $("#plantTypeGroup").removeClass('form-group has-error has-feedback');
        $("#plantTypeGroup").addClass('form-group');
        $("#plantTypeSpan").html('');
        $("#editPlantSpan").html('');
    });

    $("#plantCategory").click(function(event) {
        $("#plantCategoryGroup").removeClass('form-group has-error has-feedback');
        $("#plantCategoryGroup").addClass('form-group');
        $("#plantCategorySpan").html('');
        $("#editPlantSpan").html('');
    });

    
});
};