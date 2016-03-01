Template.invoiceDetails.helpers({
	plantList:function()
	{
		plants = CodeBashApp.plantDetailsService.getInstance().findPlants();
        return plants;
	},
	itemAdded:function()
	{
		if(Session.get('itemAdded') && (temp.find().fetch()!==null))
		{
			return true;
		}
	},
	itemList:function()
	{
		console.log("inside itemlist");
		var obj = temp.find().fetch();
		for(var i = 0;i<obj.length;i++)
		{
			var plantObj = CodeBashApp.plantDetailsService.getInstance().findPlantById(obj[i].plantId);
		//	console.log(JSON.stringify(plantObj));
			obj[i].plantId = plantObj[0].name;
		//	console.log(JSON.stringify(obj[i]));
		}
		return obj;
	},
	invoiceList:function()
	{
		if(temp.find().fetch()!=null)
		{
			var obj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(Session.get('invoiceId'));
	  		for(var i=0;i<obj.length;i++)
    		{
    			obj[i].plantId =  CodeBashApp.plantDetailsService.getInstance().findPlantById(obj[i].plantId)[0].name;
    		}
    		/*var tempObj = temp.find().fetch();
	  		for(var i=0;i<tempObj.length;i++)
    		{
    			temp.remove(tempObj[i]._id);
   			}*/
 		return obj;
   		}
 
	},
	buyerList:function()
	{
		return CodeBashApp.buyerDetailsService.getInstance().findBuyer();
	}

});
Template.invoiceDetails.events({
	"submit #addToCart":function(event)
	{
		Session.set('itemAdded','true');
		var quantity = event.target.quantity.value; 		
		var newItem = CodeBashApp.plantDetailsService.getInstance().findPlantById(this._id);
		if(!Session.get('invoiceId'))
		{
			Session.set('invoiceId',parseInt(Math.random()*100));
		}
	
		if(quantity>newItem[0].quantity ||quantity == 0)
			{
				event.preventDefault();
				console.log("inside validation statement");
				$(".form-group").addClass("form-group has-error has-feedback");				
			}
			else{
			var tempObj = {};
			tempObj.invoiceId = Session.get('invoiceId');
			tempObj.plantId = this._id;
			tempObj.quantity = quantity;
			tempObj.sellingCost = '';
			tempObj.profit = ''; 
		//	console.log(temp.find({"plantId":this._id}));
			if(temp.find({"plantId":this._id}).fetch()[0]== null)
			{
			temp.insert(tempObj);	
			}
			else
			{
				alert('item already exists');
			}
			event.preventDefault();
			return false;
			}
	},
	"submit #removeFromCart":function(event)
	{
		temp.remove(this._id);
		event.preventDefault();
	},
	"submit #confirm":function(event)
	{
	var Contain='';
	console.log("submit confirm event");
	$("#itemList :text").each(function(){
        Contain += $(this).val() + "+";
    });
    console.log(Contain);
    var sellingCostArray = Contain.split('+');
    var tempObj = temp.find().fetch();
    for(var i=0;i<tempObj.length;i++)
    {
    	console.log(tempObj[i]._id);
    	console.log(sellingCostArray[i]);
    	temp.update(tempObj[i]._id,{$set:{"sellingCost":sellingCostArray[i]}});
    }
    console.log(temp.find().fetch());
    tempObj = temp.find().fetch();
    //console.log(CodeBashApp.invoiceDetailsService.getInstance().findInvoice());
  	var profit='';
  	var sellingPrice='';
  	var costPrice='';
  	var plantObj ='';
  	for(var i=0;i<tempObj.length;i++)
    {
    	plantObj = CodeBashApp.plantDetailsService.getInstance().findPlantById(tempObj[i].plantId);
    	sellingPrice = tempObj[i].sellingCost * tempObj[i].quantity;
    	costPrice = plantObj[0].cost * tempObj[i].quantity;
    	profit =  Number(sellingPrice) - Number(costPrice);
    	console.log('profit-->'+profit);
    	temp.update(tempObj[i]._id,{$set:{"profit":profit}});	
    }
    tempObj = temp.find().fetch();
    for(var i=0;i<tempObj.length;i++)
    {
    	CodeBashApp.invoiceDetailsService.getInstance().addInvoiceDetails(tempObj[i]);
    }
    console.log(CodeBashApp.invoiceDetailsService.getInstance().findInvoiceDetails());
    $('#invoiceModal').modal('toggle');
  	event.preventDefault();	
	},
	"click #invoiceAdd":function(event)
	{
		console.log("inside submit confirmInvoice");
		var buyerId =  $('#buyerId').val();
		var invoiceObj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(Session.get('invoiceId'));
		var totalProfit = 0;
		var totalSellingCost = 0;
		for(var i = 0; i<invoiceObj.length;i++)
		{
			totalProfit = Number(totalProfit) + Number(invoiceObj[i].profit);
			totalSellingCost = Number(totalSellingCost)+Number(invoiceObj[i].sellingCost);
		}
		console.log(totalSellingCost);
		console.log(totalProfit);
		 var today = new Date();
    	 var dd = today.getDate();
    	 var mm = today.getMonth()+1; //January is 0!
    	 var yyyy = today.getFullYear();
    	 if(dd<10){
       	 dd='0'+dd
    	} 
   		 if(mm<10){
        	mm='0'+mm
    	} 
    	var today = dd+'/'+mm+'/'+yyyy;
		var obj = {};
		obj.invoiceId = Session.get('invoiceId');
		obj.buyerId = buyerId;
		obj.date = today; 
		obj.totalCost = totalSellingCost;
		obj.totalProfit = totalProfit;
		obj.paymentMode = $('#paymentOptions').val();
		obj.status='';
		
		var tempObj = temp.find().fetch();
		for(var i=0;i<tempObj.length;i++)
		{
			console.log('removing items from temp');
			temp.remove(tempObj[i]._id);
		}
		CodeBashApp.invoiceService.getInstance().addInvoice(obj);
		Session.set('invoiceId','');
		Session.set('itemAdded','');		
	}
	/*"submit #confirmInvoice":function(event)
	{
		console.log("inside submit confirmInvoice");
		var buyerId =  event.target.buyerId.value; 		
		var invoiceObj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(Session.get('invoiceId'));
		var totalProfit = 0;
		var totalSellingCost = 0;
		for(var i = 0; i<invoiceObj.length;i++)
		{
			totalProfit = Number(totalProfit) + Number(invoiceObj[i].profit);
			totalSellingCost = Number(totalSellingCost)+Number(invoiceObj[i].sellingCost);
		}
		console.log(totalSellingCost);
		console.log(totalProfit);
		event.preventDefault();
	}*/
	
});
