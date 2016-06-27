Template.invoiceReports.onRendered(function(){
	Meteor.typeahead.inject();
	this.$('.datetimepicker').datetimepicker();
	Session.set('unfiltered','true');
});
Template.invoiceReports.helpers({	
	typeList : function()
	{
		return PlantType.find();
	},
    plants:function() //auto-complete suggestions
    {		
    	return CodeBashApp.plantDetailsService.getInstance().findPlants().map(function(it){ return it.name; });
    },
    invoiceList:function()
    {
    	if(Session.get('unfiltered'))
    	{
    		var obj =  CodeBashApp.invoiceService.getInstance().findInvoice();
    		for(var i =0;i<obj.length;i++){
    			obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
    		}
    		return obj;
    	}

    	var array = [];
    	var array2 = [];
    	// console.log('inside invoiceList');

    	if(Session.get('filterDate') && Session.get('filtertype'))
    	{

    		// console.log('date and type');
    		// console.log('inside filterDate and filtertype');
    		var dates = Session.get('filterDate');
    		dates = dates.split('+');
    		var date1 = new Date(dates[0]);
    		// console.log("date1 obj -->"+date1);
    		var date2 = new Date(dates[1]);
    		// console.log("date2 obj -->"+date2);
    		if(date2 < date1)
    		{
    			$("#fromDateGroup").addClass('form-group has-error has-feedback');                 
    			$("#fromDateSpan").html('please enter valid Date');                			
    			$("#toDateGroup").addClass('form-group has-error has-feedback');                 
    			$("#toDateSpan").html('please enter valid Date');                			
    		}
    		else{
    			var obj = CodeBashApp.invoiceService.getInstance().findInvoice();
    			for(var i=0;i<obj.length;i++)
    			{			
    			// console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
    			obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
    		}
    		var type = Session.get('filtertype'); 
    		var id;
    		var obj2 ;
    		var plantId;
    		var flag = 0;
    		var k=0;
    		var l=0;
    		var obj2;
    		var m;
    		for(var i=0;i<obj.length;i++)
    		{
    			// console.log('inside i loop');
    			var date = CodeBashApp.invoiceService.getInstance().findInvoiceById(obj[i]._id)[0].date;
    			// console.log(date);
    			date = date.substring(0,10);
    			// console.log(date);
    			date = new Date(date);
    			// console.log('date object-->'+date);
    			var flag =0;
    			if(date >= date1 &&  date <= date2)
    			{
    				flag = 1;
    			}
    			if(flag == 1)
    			{
    				// console.log('dates checked');
    				array[k] =  obj[i];
    				k++;
    			}
    			flag = 0;
    			
    		}
    		for(var j=0;j<array.length;j++)			
    		{
    			obj2 = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(array[j].invoiceId);
    			for(m = 0;m<obj2.length;m++)
    			{
    				if(CodeBashApp.plantDetailsService.getInstance().findPlantById(obj2[m].plantId)[0].type == type)
    				{
    					array2[l] = array[j];
    					l++;
    				}
    			}
    		}
    		return array2;
    	}
    }



    if(Session.get('filtertype'))
    {
    		// console.log('inside filtertype');
    		var obj = CodeBashApp.invoiceService.getInstance().findInvoice();
    		// console.log(obj);
    		for(var i=0;i<obj.length;i++)
    		{			
    			// console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
    			obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
    		}
    		var type = Session.get('filtertype');
    		var id;
    		var obj2 ;
    		var plantId;
    		var flag = 0;
    		var k=0;
    		for(var i=0;i<obj.length;i++)
    		{
    			// console.log('inside i loop');
    			id = obj[i].invoiceId;
    			obj2 = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(id);
    			for(var j=0;j<obj2.length;j++)
    			{
    				// console.log('inside j loop');
    				plantId = obj2[j].plantId;

    				if(CodeBashApp.plantDetailsService.getInstance().findPlantById(plantId)[0].type == type)
    				{
    					// console.log('elemtn inserted');
    					array[k] =  obj[i];
    					k++;
    				}
    			}
    		}
    		return array;
    	}
    	if(Session.get('filterName'))
    	{
    		// console.log('inside filterName');
    		var obj = CodeBashApp.invoiceService.getInstance().findInvoice();
    		for(var i=0;i<obj.length;i++)
    		{			
    			// console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
    			obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
    		}
    		var name = Session.get('filterName');
    		var id;
    		var obj2 ;
    		var plantId;
    		var flag = 0;
    		var k=0;
    		for(var i=0;i<obj.length;i++)
    		{
    			// console.log('inside i loop');
    			id = obj[i].invoiceId;
    			obj2 = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(id);
    			for(var j=0;j<obj2.length;j++)
    			{
    				// console.log('inside j loop');
    				plantId = obj2[j].plantId;

    				if(CodeBashApp.plantDetailsService.getInstance().findPlantById(plantId)[0].name == name)
    				{
    					// console.log('elemtn inserted');
    					array[k] =  obj[i];
    					k++;
    				}
    			}
    		}
    		return array;
    	}
    	if(Session.get('filterDate'))
    	{

    		// console.log('inside filterDate');
    		var dates = Session.get('filterDate');
    		dates = dates.split('+');
    		var date1 = new Date(dates[0]);
    		console.log("date1 obj -->"+date1);
    		var date2 = new Date(dates[1]);
    		console.log("date2 obj -->"+date2);
    		if(date2 < date1)
    		{
    			$("#fromDateGroup").addClass('form-group has-error has-feedback');                 
    			$("#fromDateSpan").html('please enter valid Date');                			
    			$("#toDateGroup").addClass('form-group has-error has-feedback');                 
    			$("#toDateSpan").html('please enter valid Date');                			
    		}
    		else{
    			var obj = CodeBashApp.invoiceService.getInstance().findInvoice();
    			for(var i=0;i<obj.length;i++)
    			{			
    			// console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
    			obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
    		}
    		//var date1 =  Session.get('filterDate');
    		var id;
    		var obj2 ;
    		var plantId;
    		var flag = 0;
    		var k=0;
    		for(var i=0;i<obj.length;i++)
    		{
    			// console.log('inside i loop');
    			var date = CodeBashApp.invoiceService.getInstance().findInvoiceById(obj[i]._id)[0].date;
    			// console.log("date from db-->"date);
    			date = date.substring(0,10);
    			// console.log(date);
    			date = new Date(date);
    			console.log('date from db object-->'+date);
    			var flag =0;
    			if(date >= date1 && date <= date2)
    			{
    				console.log('date is greater');
    				flag = 1;
    			}
    			if(flag == 1)
    			{
    				console.log('dates checked');
    				array[k] =  obj[i];
    				k++;
    			}
    			flag = 0;
    		}
    		console.log(array);
    		return array;
    	}
    }


	}//end of function


});

Template.invoiceReports.events({
	'click #search':function()
	{
		Session.set('unfiltered','');
		// console.log($("#plantType").val());
		if($("#fromDate").val() && $("#toDate").val() && $("#plantType").val())
		{
			// console.log('date and type');
			Session.set('filterDate',$("#fromDate").val() +"+"+ $("#toDate").val());
			Session.set('filtertype',$("#plantType").val());	
			// console.log('dates set--->'+Session.get('filterDate'));

		}
		if($("#plantType").val())
		{
			Session.set('filtertype',$("#plantType").val());
		}
		if($("#plantName").val())
		{
			Session.set('filterName',$("#plantName").val());
		}
		if($("#fromDate").val() && $("#toDate").val())
		{
			Session.set('filterDate',$("#fromDate").val() +"+"+ $("#toDate").val());
			
			// console.log('dates set--->'+Session.get('filterDate'));

		}

	},
	'click #printInvoiceReports':function(){
		CodeBashApp.printdiv("invoiceReports");
		$("#maindiv").remove();
		Router.current().render(Template.invoiceReports); 
	},
	'click #invoiceReportsCSV':function(){

		if(Session.get('filterDate') && Session.get('filtertype'))
		{

			// console.log('date and type');
			// console.log('inside filterDate and filtertype');
			var dates = Session.get('filterDate');
			dates = dates.split('+');
			var date1 = new Date(dates[0]);
			// console.log("date1 obj -->"+date1);
			var date2 = new Date(dates[1]);
			// console.log("date2 obj -->"+date2);
			if(date2 < date1)
			{
				$("#fromDateGroup").addClass('form-group has-error has-feedback');                 
				$("#fromDateSpan").html('please enter valid Date');                			
				$("#toDateGroup").addClass('form-group has-error has-feedback');                 
				$("#toDateSpan").html('please enter valid Date');                			
			}
			else{
				var obj = CodeBashApp.invoiceService.getInstance().findInvoice();
				for(var i=0;i<obj.length;i++)
				{			
				// console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
				obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
			}
			var date1 =  Session.get('filterDate');
			var type = Session.get('filtertype'); 
			var id;
			var obj2 ;
			var plantId;
			var flag = 0;
			var k=0;
			var l=0;
			var obj2;
			var m;
			for(var i=0;i<obj.length;i++)
			{
				// console.log('inside i loop');
				var date = CodeBashApp.invoiceService.getInstance().findInvoiceById(obj[i]._id)[0].date;
				// console.log(date);
				date = date.substring(0,10);
				// console.log(date);
				date = new Date(date);
				// console.log('date object-->'+date);
				var flag =0;
				if(date >= date1 && date <= date2)
				{
					// console.log('date is greater');
					flag = 1;
				}
				
				if(flag == 1)
				{
					// console.log('dates checked');
					array[k] =  obj[i];
					k++;
				}
				flag = 0;
				
			}
			for(var j=0;j<array.length;j++)			
			{
				obj2 = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(array[j].invoiceId);
				for(m = 0;m<obj2.length;m++)
				{
					if(CodeBashApp.plantDetailsService.getInstance().findPlantById(obj2[m].plantId)[0].type == type)
					{
						array2[l] = array[j];
						l++;
					}
				}
			}
//		return array2;
var dataArray = [];
var stringArray = [];
for(var i=0;i<array.length;i++)
{
	stringArray.push(array2[i].invoiceId);
	stringArray.push(array2[i].buyerId);
	stringArray.push(array2[i].date);
	stringArray.push(array2[i].totalCost);
	stringArray.push(array2[i].paymentStatus);
	stringArray.push(array2[i].deliveryStatus);
	stringArray.push(array2[i].status);
	dataArray[i] = stringArray;
}
// console.log("data array of csv--->" + dataArray);
CodeBashApp.saveCSV(dataArray,'invoiceReports');
}
}



if(Session.get('filtertype'))
{
	// console.log('inside filtertype');
	var obj = CodeBashApp.invoiceService.getInstance().findInvoice();
	// console.log(obj);
	for(var i=0;i<obj.length;i++)
	{			
		// console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
		obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
	}
	var type = Session.get('filtertype');
	var id;
	var obj2 ;
	var plantId;
	var flag = 0;
	var k=0;
	for(var i=0;i<obj.length;i++)
	{
		// console.log('inside i loop');
		id = obj[i].invoiceId;
		obj2 = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(id);
		for(var j=0;j<obj2.length;j++)
		{
			// console.log('inside j loop');
			plantId = obj2[j].plantId;

			if(CodeBashApp.plantDetailsService.getInstance().findPlantById(plantId)[0].type == type)
			{
				// console.log('elemtn inserted');
				array[k] =  obj[i];
				k++;
			}
		}
	}
		//	return array;
		var dataArray = [];
		var stringArray = [];
		for(var i=0;i<array.length;i++)
		{
			stringArray.push(array[i].invoiceId);
			stringArray.push(array[i].buyerId);
			stringArray.push(array[i].date);
			stringArray.push(array[i].totalCost);
			stringArray.push(array[i].paymentStatus);
			stringArray.push(array[i].deliveryStatus);
			stringArray.push(array[i].status);
			dataArray[i] = stringArray;
		}
		// console.log("data array of csv--->" + dataArray);
		CodeBashApp.saveCSV(dataArray,'invoiceReports');
	}
	if(Session.get('filterName'))
	{
		// console.log('inside filterName');
		var obj = CodeBashApp.invoiceService.getInstance().findInvoice();
		for(var i=0;i<obj.length;i++)
		{			
			// console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
			obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
		}
		var name = Session.get('filterName');
		var id;
		var obj2 ;
		var plantId;
		var flag = 0;
		var k=0;
		for(var i=0;i<obj.length;i++)
		{
			// console.log('inside i loop');
			id = obj[i].invoiceId;
			obj2 = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(id);
			for(var j=0;j<obj2.length;j++)
			{
				// console.log('inside j loop');
				plantId = obj2[j].plantId;

				if(CodeBashApp.plantDetailsService.getInstance().findPlantById(plantId)[0].name == name)
				{
					// console.log('elemtn inserted');
					array[k] =  obj[i];
					k++;
				}
			}
		}
		//return array;
		var dataArray = [];
		var stringArray = [];
		for(var i=0;i<array.length;i++)
		{
			stringArray.push(array[i].invoiceId);
			stringArray.push(array[i].buyerId);
			stringArray.push(array[i].date);
			stringArray.push(array[i].totalCost);
			stringArray.push(array[i].paymentStatus);
			stringArray.push(array[i].deliveryStatus);
			stringArray.push(array[i].status);
			dataArray[i] = stringArray;
		}
		// console.log("data array of csv--->" + dataArray);
		CodeBashApp.saveCSV(dataArray,'invoiceReports');
	}
	if(Session.get('filterDate'))
	{

		// console.log('inside filterDate');
		var dates = Session.get('filterDate');
		dates = dates.split('+');
		var date1 = new Date(dates[0]);
		// console.log("date1 obj -->"+date1);
		var date2 = new Date(dates[1]);
		// console.log("date2 obj -->"+date2);
		if(date2 < date1)
		{
			$("#fromDateGroup").addClass('form-group has-error has-feedback');                 
			$("#fromDateSpan").html('please enter valid Date');                			
			$("#toDateGroup").addClass('form-group has-error has-feedback');                 
			$("#toDateSpan").html('please enter valid Date');                			
		}
		else{
			var obj = CodeBashApp.invoiceService.getInstance().findInvoice();
			for(var i=0;i<obj.length;i++)
			{			
			// console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
			obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
		}
		var id;
		var obj2 ;
		var plantId;
		var flag = 0;
		var k=0;
		for(var i=0;i<obj.length;i++)
		{
			// console.log('inside i loop');
			var date = CodeBashApp.invoiceService.getInstance().findInvoiceById(obj[i]._id)[0].date;
			// console.log(date);
			date = date.substring(0,10);
			// console.log(date);
			date = new Date(date);
			// console.log('date object-->'+date);
			var flag =0;
			if(date >= date1 && date <= date2)
			{
				// console.log('date is greater');
				flag = 1;
			}
			if(flag == 1)
			{
				// console.log('dates checked');
				array[k] =  obj[i];
				k++;
			}
			flag = 0;
		}
		//return array;
		var dataArray = [];
		var stringArray = [];
		for(var i=0;i<array.length;i++)
		{
			stringArray.push(array[i].invoiceId);
			stringArray.push(array[i].buyerId);
			stringArray.push(array[i].date);
			stringArray.push(array[i].totalCost);
			stringArray.push(array[i].paymentStatus);
			stringArray.push(array[i].deliveryStatus);
			stringArray.push(array[i].status);
			dataArray[i] = stringArray;
		}
		// console.log("data array of csv--->" + dataArray);
		CodeBashApp.saveCSV(dataArray,'invoiceReports');
	}
}




},

"click #invoiceReportsPDF":function()
{
	var specialElementHandlers = {
		'#invoiceReports': function (element, renderer) {
			return true;
		}
	};
	var doc = new jsPDF();
	doc.fromHTML($('#invoiceReports').html(), 15, 15, {
		'width': 1000,
		'elementHandlers': specialElementHandlers
	});
	doc.save('invoiceReports.pdf');
},
"click #fromDate":function()
{
	$('#fromDateIcon').click();
	$("#fromDateGroup").addClass('form-group');                 
	$("#fromDateSpan").html('');                			
	$("#toDateGroup").addClass('form-group');                 
	$("#toDateSpan").html('');                			
},
"click #toDate":function()
{
	$('#toDateIcon').click();
	$("#fromDateGroup").addClass('form-group');                 
	$("#fromDateSpan").html('');                			
	$("#toDateGroup").addClass('form-group');                 
	$("#toDateSpan").html('');
},
'click #fromDateIcon':function()
{
	$("#fromDateGroup").addClass('form-group');                 
	$("#fromDateSpan").html('');                			
	$("#toDateGroup").addClass('form-group');                 
	$("#toDateSpan").html('');                			
},
'click #toDateIcon':function()
{
	$("#fromDateGroup").addClass('form-group'); 	                
	$("#fromDateSpan").html('');                			
	$("#toDateGroup").addClass('form-group');                 
	$("#toDateSpan").html('');                			
}




});