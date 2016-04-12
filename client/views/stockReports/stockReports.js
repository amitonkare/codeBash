Template.stockReports.onRendered(
    function () 
    {
      CodeBashApp.stockReportsOnReady();
    }
);

Template.stockReports.helpers({
  stockList:function()
  {
    var stock = CodeBashApp.stockDetailsService.getInstance().findStock();
    for(var i = 0;i<stock.length;i++)
    {
    	 var plant = CodeBashApp.plantDetailsService.getInstance().findPlantById(stock[i].plantId);
    	 stock[i].plantId = plant[0].name;
    }
    return stock;
  }
});

Template.stockReports.events({
  'click #print':function(){
    CodeBashApp.printdiv("stocks"); 
  }

});
