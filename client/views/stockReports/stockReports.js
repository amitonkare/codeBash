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
		//twice rendering solution --->
		$("#maindiv").remove();
		Router.current().render(Template.stockReports);
		//window.location.reload();
	},
	'click #stockReportsCSV':function()
	{
		var stock = CodeBashApp.stockDetailsService.getInstance().findStock();
		console.log(stock);
		for(var i = 0;i<stock.length;i++)
		{
			var plant = CodeBashApp.plantDetailsService.getInstance().findPlantById(stock[i].plantId);
			stock[i].plantId = plant[0].name;
		}
		var dataArray=[];
		var stringArray=[];
		for(var i=0;i<stock.length;i++)
		{
			stringArray.push(stock[i].plantId);
			stringArray.push(stock[i].quantity);
			stringArray.push(stock[i].avgCost);
			console.log("string array-->"+stringArray);
			dataArray[i] = stringArray;
			stringArray=[];
		}
		console.log("data array of csv--->" + dataArray);
		CodeBashApp.saveCSV(dataArray,'stockReports');
	},
	"click #stockReportsPDF":function()
	{
		var specialElementHandlers = {
			'#stocks': function (element, renderer) {
				return true;
			}
		};
		var doc = new jsPDF();
		doc.fromHTML($('#stocks').html(), 15, 15, {
			'width': 1000,
			'elementHandlers': specialElementHandlers
		});
		doc.save('stockReports.pdf');
	}
});
