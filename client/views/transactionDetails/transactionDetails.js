Template.transactionDetails.onRendered(function(){
	
});
Template.transactionDetails.helpers({
	plantList:function()
	{
		return CodeBashApp.plantDetailsService.getInstance().findPlants();
	},
	itemList:function()
	{
		console.log("inside item list");
			return temp.find();	
	},
	bill:function()
	{ 
		var totalBill = 0;
		var billarray = temp.find().fetch();
		console.log("bill array-->" + JSON.stringify(billarray));
		for(var i=0;i<billarray.length;i++)
		{
			totalBill = totalBill + (billarray[i].quantity*billarray[i].cost)
		}
		console.log("bill -->"+totalBill);
		return totalBill;
	},
	confirmOrder:function()
	{
						
			if( Session.get('temp'))
			{
				return true;
			}
		

	}
});
Template.transactionDetails.events({
	'submit #addToCart':function(event){
		var qt = event.target.quantity.value; 		
		console.log("quantity-->"+qt);
		event.target.quantity.value= ' ';		
		Session.set('order','true');
		if(qt!='0' && qt != '')
		{
			var obj = {};
			var array2 = CodeBashApp.plantDetailsService.getInstance().findPlantById(this._id);
			if(qt>array2[0].quantity)
			{
				event.preventDefault();
				console.log("inside validation statement");
				$(".form-group").addClass("form-group has-error has-feedback");
					$("#quantity").keydown(function(event){
					console.log("jq code");
					event.preventDefault();
					$(".form-group").addClass('form-group has-success has-feedback');
					});

				return false;
			}
			else
			{
			obj.goodsId = array2[0]._id;
			obj.name = array2[0].name;
			obj.cost = array2[0].cost;
			obj.quantity = qt;
			temp.insert(obj);
	    	console.log(obj);
	    	Session.set('temp','order');	    
	    	}
		}	
		return false;
	},
	'submit #removeFromCart':function()
	{		
		temp.remove(this._id);
		return false;
	},
	'submit #confirmOrder':function()
	{
		console.log("inside confirmOrder");
		var billarray = temp.find().fetch();
		var obj = {};
		var array = temp.find().fetch();
		for(var i=0;i<array.length;	i++)	
		{
			obj.goodsId =  array[i].goodsId;
			obj.quantity = array[i].quantity;
			obj.totalCost = array[i].quantity * array[i].cost;
			CodeBashApp.transactionDetailsService.getInstance().addTransaction(obj);
		}
		/*
		for(var i=0;i<array.length;	i++)	
		{
			temp.remove(array[i]._id);
		}
		*/
		return false;
	}
});
