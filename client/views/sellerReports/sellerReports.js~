Template.sellerReports.onRendered(
	function () 
	{
		CodeBashApp.sellerReportsOnReady();
		Meteor.typeahead.inject();
		this.$('.datetimepicker').datetimepicker();
	}
	);

Template.sellerReports.helpers({
	sellerList:function()
	{
		return CodeBashApp.sellerDetailsService.getInstance().findSeller();
	},
	grandTotal:function()
	{
		return Session.get('grandTotal');
	},
  plants:function() //auto-complete suggestions
  {   
  	return CodeBashApp.plantDetailsService.getInstance().findPlants().map(function(it){ return it.name; });
  },
  typeList : function()
  {
  	return PlantType.find();
  },
  reportTitle:function()
  {
  	if(Session.get('sellerId'))
  	{
  		return CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(Session.get('sellerId'))[0].name;  		
  	}	
  },
  purchaseList:function()
  {
  	if(Session.get('sellerId2'))
  	{
  		var obj = CodeBashApp.purchaseService.getInstance().findPurchasebySellerId(Session.get('sellerId2'));
  		var sum= 0;
  		for(var i = 0;i<obj.length;i++)
  		{
  			sum = sum + obj[i].totalCost;
  		}
  		Session.set('grandTotal',sum);
  		return obj;
  	}
  	var array = [];
  	var array2 = [];
  	console.log('inside purchaseList');
  	if(Session.get('filterDate') && Session.get('filtertype'))
  	{
  		Session.set('filterName','');	
  		console.log('inside filterDate');
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
  		else
  		{

  			var obj = CodeBashApp.purchaseService.getInstance().findPurchasebySellerId(Session.get('sellerId'));
  			for(var i=0;i<obj.length;i++)
  			{			
  				console.log(CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId)[0].name);
  				obj[i].sellerId = CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId);
  			}
  			var id;
  			var obj2 ;
  			var plantId;
  			var type = Session.get('filtertype');
  			var flag = 0;
  			var k=0;

  			for(var i=0;i<obj.length;i++)
  			{
  				console.log('inside i loop');
  				var date = CodeBashApp.purchaseService.getInstance().findPurchaseById(obj[i]._id)[0].date;
  				console.log(date);
  				date = date.substring(0,10);
  				console.log(date);
  				date = new Date(date);
  				console.log('date object-->'+date);
  				var flag =0;
  				var l=0;
  				if(date >= date1 && date <= date2)
  				{
  					console.log('date is greater');
  					flag	 = 1;
  				}
  				if(flag == 1)
  				{
  					console.log('dates checked');
  					array[k] =  obj[i];
  					k++;
  				}
  				for(var j=0;j<array.length;j++)			
  				{
  					obj2 = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(array[j].purchaseId);
  					for(m = 0;m<obj2.length;m++)
  					{
  						if(CodeBashApp.plantDetailsService.getInstance().findPlantById(obj2[m].plantId)[0].type == type)
  						{
  							array2[l] = array[j];
  							l++;
  						}
  					}
  				}			
  			}
  			var sum= 0;
  			for(var i = 0;i<array2.length;i++)
  			{
  				sum = sum + array2[i].totalCost;
  			}
  			Session.set('grandTotal',sum);

  			return array2;
  		}
  	}
  	if(Session.get('filtertype'))
  	{
  		console.log('inside filtertype');
  		var obj = CodeBashApp.purchaseService.getInstance().findPurchasebySellerId(Session.get('sellerId'));
  		for(var i=0;i<obj.length;i++)
  		{			
  			console.log(CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId)[0].name);
  			obj[i].sellerId = CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId);
  		}
  		var type = Session.get('filtertype');
  		var id;
  		var obj2 ;
  		var plantId;
  		var flag = 0;
  		var k=0;
  		for(var i=0;i<obj.length;i++)
  		{
  			console.log('inside i loop');
  			id = obj[i].purchaseId;
  			obj2 = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(id);
  			for(var j=0;j<obj2.length;j++)
  			{
  				console.log('inside j loop');
  				plantId = obj2[j].plantId;

  				if(CodeBashApp.plantDetailsService.getInstance().findPlantById(plantId)[0].type == type)
  				{
  					console.log('elemtn inserted');
  					array[k] =  obj[i];
  					k++;
  				}
  			}
  		}
  		var sum= 0;
  		for(var i = 0;i<array.length;i++)
  		{
  			sum = sum + array[i].totalCost;
  		}
  		Session.set('grandTotal',sum);

  		return array;
  	}
  	if(Session.get('filterName'))
  	{
  		console.log('inside filterName');
  		var obj = CodeBashApp.purchaseService.getInstance().findPurchasebySellerId(Session.get('sellerId'));
  		for(var i=0;i<obj.length;i++)
  		{			
  			console.log(CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId)[0].name);
  			obj[i].sellerId = CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId);
  		}
  		var name = Session.get('filterName');
  		var id;
  		var obj2 ;
  		var plantId;
  		var flag = 0;
  		var k=0;
  		for(var i=0;i<obj.length;i++)
  		{
  			console.log('inside i loop');
  			id = obj[i].purchaseId;
  			obj2 = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(id);
  			console.log(obj2);
  			for(var j=0;j<obj2.length;j++)
  			{
  				console.log('inside j loop');
  				plantId = obj2[j].plantId;

  				if(CodeBashApp.plantDetailsService.getInstance().findPlantById(plantId)[0].name == name)
  				{
  					console.log('elemtn inserted');
  					array[k] =  obj[i];
  					k++;
  				}
  			}
  		}
  		var sum= 0;
  		for(var i = 0;i<array.length;i++)
  		{
  			sum = sum + array[i].totalCost;
  		}
  		Session.set('grandTotal',sum);

  		return array;
  	}
  	if(Session.get('filterDate'))
  	{
  		console.log('inside filterDate');
  		var dates = Session.get('filterDate');
  		dates = dates.split('+');
  		var date1 = new Date(dates[0]);
  		console.log("date1 obj -->"+date1);
  		var date2 = new Date(dates[1]);
  		if(date2 < date1)
  		{
  			$("#fromDateGroup").addClass('form-group has-error has-feedback');                 
  			$("#fromDateSpan").html('please enter valid Date');                     
  			$("#toDateGroup").addClass('form-group has-error has-feedback');                 
  			$("#toDateSpan").html('please enter valid Date');                     
  		}
  		else
  		{
  			console.log("date2 obj -->"+date2);
  			var obj = CodeBashApp.purchaseService.getInstance().findPurchasebySellerId(Session.get('sellerId'));
  			for(var i=0;i<obj.length;i++)
  			{			
  				console.log(CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId)[0].name);
  				obj[i].sellerId = CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId);
  			}
  			var id;
  			var obj2 ;
  			var plantId;
  			var flag = 0;
  			var k=0;
  			for(var i=0;i<obj.length;i++)
  			{
  				console.log('inside i loop');
  				var date = CodeBashApp.purchaseService.getInstance().findPurchaseById(obj[i]._id)[0].date;
  				console.log(date);
  				date = date.substring(0,10);
  				console.log(date);
  				date = new Date(date);
  				console.log('date object-->'+date);
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
  			}
  			var sum= 0;
  			for(var i = 0;i<array.length;i++)
  			{
  				sum = sum + array[i].totalCost;
  			}
  			Session.set('grandTotal',sum);

  			return array;
  		}
  	}





	}//end of function

});

Template.sellerReports.events({
	'click #printSellerReports':function(){
		CodeBashApp.printdiv("sellerReports","sellerReports"); 
		$("#maindiv").remove();
		Router.current().render(Template.sellerReports);
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

	},
	'click #sellerReportId':function()
	{
		Session.set('sellerId',this._id);
		Session.set('sellerId2',this._id);
		$("#reportModal").modal("show");
		$("#reportModal").css(".modal-dialog {width:75%;}");
	},
	"click #closeReports":function()
	{
		Session.set('filterDate','');
		Session.set('filtertype','');  
		Session.set('filterName','');
		Session.set('grandTotal','');
		$("#plantName").val(''); 
		Session.set('sellerId','');
		Session.set('sellerId2','');
	},
	'click #search':function()
	{
		Session.set('sellerId2','');
		console.log($("#plantType").val());
		if($("#fromDate").val() && $("#toDate").val() && $("#plantType").val())
		{
			Session.set('filterDate',$("#fromDate").val() +"+"+ $("#toDate").val());
			Session.set('filtertype',$("#plantType").val());	
			console.log('dates set--->'+Session.get('filterDate'));

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
			console.log('dates set--->'+Session.get('filterDate'));
		}

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
