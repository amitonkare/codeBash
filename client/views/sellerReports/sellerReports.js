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
		CodeBashApp.printdiv("sellerReports","sellerReports"); 
	},
	'click #sellerReportsCSV':function(){
		var array = CodeBashApp.sellerDetailsService.getInstance().findSeller();
		var dataArray = [];
		var stringArray = [];
		for(var i=0;i<array.length;i++)
		{
			 stringArray.push(array[i]._id);
			 stringArray.push(array[i].name);
			 stringArray.push(array[i].address);
			 stringArray.push(array[i].phoneNo);
			 stringArray.push(array[i].emailId);
			 stringArray.push(array[i].bankAccountDetails.bankName);
			 stringArray.push(array[i].bankAccountDetails.branch);
			 stringArray.push(array[i].bankAccountDetails.IFSCCode);
			 stringArray.push(array[i].bankAccountDetails.accountNumber);
			 dataArray[i] = stringArray;
			 stringArray=[];
		}
		console.log("data array of csv--->" + dataArray);
		CodeBashApp.saveCSV(dataArray,'sellerReports');

	},
	'click #sellerReportsPDF':function()
	{    
		var specialElementHandlers = {
		'#sellerReports': function (element, renderer) {
				return true;
			}
		};
	 var doc = new jsPDF();
	 doc.fromHTML($('#sellerReports').html(), 15, 15, {
				'width': 1000,
						'elementHandlers': specialElementHandlers
		});
		doc.save('sellerReports.pdf');

	}

});
