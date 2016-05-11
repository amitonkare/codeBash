CodeBashApp.plantDetailsOnReady = function(){
$(document).ready(function () {
     
     $('#list-plants').DataTable();
     $('[data-toggle="tooltip"]').tooltip();   
      var currentUrl = window.location.href;
            // Get the span you want with a combination class and attribute and child jQuery selector
            var currentMenuItem = $(".main-nav-link[href='" + currentUrl + "'] > .main-nav-item");
            // Then add your class
            currentMenuItem.addClass("current");
   
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