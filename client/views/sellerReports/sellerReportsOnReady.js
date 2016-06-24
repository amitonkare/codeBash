CodeBashApp.sellerReportsOnReady = function(){
	$(document).ready(function () {
        $('#list-sellers').DataTable();
        $('[data-toggle="tooltip"]').tooltip();  
	 Session.set('filterDate','');
       Session.set('filtertype','');  
       Session.set('filterName',''); 
    });
};
