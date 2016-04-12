Template.sellerReports.onRendered(
    function () 
    {
    CodeBashApp.sellerReportsOnReady();
    }
);

Template.sellerReports.helpers({
  sellerList:function()
  {
    return CodeBashApp.sellerDetailsService.getInstance().findSeller();
  }
});

Template.sellerReports.events({
  'click #printSellerReports':function(){
    CodeBashApp.printdiv("sellerReports"); 
  }

});
