Template.buyerReports.onRendered(
    function () 
    {
    CodeBashApp.buyerReportsOnReady();
    }
);

Template.buyerReports.helpers({
  buyerList:function()
  {
    return CodeBashApp.buyerDetailsService.getInstance().findBuyer();
  }
});
Template.buyerReports.events({
  'click #printBuyerReports':function(){
    CodeBashApp.printdiv("buyerReports"); 
  }
});