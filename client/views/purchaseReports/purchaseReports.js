Template.purchaseReports.onRendered(function(){
	Meteor.typeahead.inject();
});
Template.purchaseReports.helpers({	
	typeList : function()
    {
        return PlantType.find();
    },
    plants:function() //auto-complete suggestions
	{		
		return CodeBashApp.plantDetailsService.getInstance().findPlants().map(function(it){ return it.name; });
	},

	purchaseList:function()
	{
		var array = [];
		var array2 = [];
		console.log('inside purchaseList');
		if(Session.get('filterDate') && Session.get('filtertype'))
		{
			
			console.log('inside filterDate');
			var dates = Session.get('filterDate');
			dates = dates.split('+');
			var date1 = new Date(dates[0]);
			console.log("date1 obj -->"+date1);
			var date2 = new Date(dates[1]);
			console.log("date2 obj -->"+date2);
			var obj = CodeBashApp.purchaseService.getInstance().findPurchase();
			for(var i=0;i<obj.length;i++)
			{			
				console.log(CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId)[0].name);
				obj[i].sellerId = CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId);
			}
			var date1 =  Session.get('filterDate');
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
				if(date>date1)
				{
					console.log('date is greater');
					flag	 = 1;
				}
				if(date<date2)
				{
					console.log('date is lesser');
					flag = 1;
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
		return array2;
		}
		if(Session.get('filtertype'))
		{
			console.log('inside filtertype');
			var obj = CodeBashApp.purchaseService.getInstance().findPurchase();
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
			return array;
		}
		if(Session.get('filterName'))
		{
			console.log('inside filterName');
			var obj = CodeBashApp.purchaseService.getInstance().findPurchase();
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
			console.log("date2 obj -->"+date2);
			var obj = CodeBashApp.purchaseService.getInstance().findPurchase();
			for(var i=0;i<obj.length;i++)
			{			
				console.log(CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId)[0].name);
				obj[i].sellerId = CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[i].sellerId);
			}
			var date1 =  Session.get('filterDate');
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
				if(date>date1)
				{
					console.log('date is greater');
					flag = 1;
				}
				if(date<date2)
				{
					console.log('date is lesser');
					flag = 1;
				}
				if(flag == 1)
				{
					console.log('dates checked');
					array[k] =  obj[i];
					k++;
				}
			}
		return array;
		}

		


		
	}//end of function


});

Template.purchaseReports.events({
	'click #search':function()
	{
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
   'click #printPurchaseReports':function(){
    CodeBashApp.printdiv("purchaseReports"); 
  }


});