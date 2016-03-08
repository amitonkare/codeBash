Template.invoiceDetails.onRendered(function(){
	CodeBashApp.invoiceDetailsOnReady();
});
Template.invoiceDetails.helpers({
	plants:function() //auto-complete suggestions
	{
		CodeBashApp.plantDetailsService.getInstance().findPlants().map(function(it){ return it.name; });
	},
	saved:function()
	{
		if(Session.get("saved"))
		{
			return false;
		}
		else
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
			obj[i].plantId = plantObj[0].name;
		}
		return obj;
	},
	buyerList:function()
	{
		return CodeBashApp.buyerDetailsService.getInstance().findBuyer();
	}

});
Template.invoiceDetails.events({
	"submit #addToCart":function(event)
	{
		event.preventDefault();
		var name = $("#plantName").val();
		var plant = CodeBashApp.plantDetailsService.getInstance().findPlantByName(name);
		console.log(plant);	
		console.log(temp.find({"plantId":plant[0]._id}).fetch())
		if(temp.find({"plantId":plant[0]._id}).fetch()[0] == '')
		{
			alert('item exists');
		}
		else
		{
			var tempObj = {};
			tempObj.invoiceId = $("#invoiceNo").val();
			Session.set("invoiceId",tempObj.invoiceId);
			tempObj.plantId = plant[0]._id;
			tempObj.quantity ='1' ;
			tempObj.sellingCost = '';
			tempObj.profit = ''; 		
			temp.insert(tempObj);
		}
	},
	"click #removeFromCart":function(event)
	{
		temp.remove(this._id);
		event.preventDefault();
	},
	"click #cancelInvoice":function()
	{
		var tempObj = temp.find().fetch();
		for(var i=0;i<tempObj.length;i++ )
		{	
			temp.remove({_id:tempObj[i]._id});
		}	
		$("#plantName").val('');
		$("#invoiceNo").val('');
		$("#buyerId").val('');
		$("#paymentStatus").val('');
		$("#deliveryStatus").val('');
		$("#date").val('');
	},
	"click #saveDraft":function()
	{
		Session.set("saved",'true');
		$("#plantName").attr("disabled",true);
		$("#invoiceNo").attr("disabled",true);
		$("#buyerId").attr("disabled",true);
		$("#paymentStatus").attr("disabled",true);
		$("#deliveryStatus").attr("disabled",true);
		$("#quantity").attr("disabled",true);
		$("#cost").attr("disabled",true);	
		$("#date").attr("disabled",true);
		var Contain='';
		$("#items :text").each(function(){
        Contain += $(this).val() + "+";
    	});
    	console.log(Contain);
		var array = Contain.split('+');
		console.log(array.length);
		var sellingCostArray=[];
		var quantityArray=[];
		var j=0,i,k=0;
	//quantityArray[0]
		for(i=0;i<array.length-1;i++)
		{
			if(i % 2==0)
			{
				quantityArray[j] = array[i];	
				j++;
			}
			else{
				sellingCostArray[k] = array[i];
				k++;
			}
		}
		var stockQuantity;
		tempObj = temp.find().fetch();
		for(i=0;i<quantityArray.length;i++)
		{
			tempObj[i].quantity = quantityArray[i];
			stockQuantity = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId)[0].quantity;
			stockQuantity = Number(stockQuantity) - Number(tempObj[i].quantity);
			CodeBashApp.stockDetailsService.getInstance().updateStock(tempObj[i].plantId,stockQuantity,'');
			tempObj[i].sellingCost = sellingCostArray[i];
			stockObj = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId);
			tempObj[i].profit = Number(tempObj[i].quantity * tempObj[i].sellingCost) - Number(tempObj[i].quantity *  stockObj[0].avgCost);	
			if(tempObj[i].profit<0)
			{
				tempObj.profit[i].profit = 0;
			}			
		}
		for(i=0;i<quantityArray.length;i++ )
		{	
			temp.remove({_id:tempObj[i]._id});
		}
		for(i=0;i<quantityArray.length;i++)
		{
			temp.insert(tempObj[i]);
		}

	},
	"click #finalInvoice":function()
	{	
		tempObj = temp.find().fetch();
		console.log(temp.find().fetch());
		for(i = 0;i<tempObj.length;i++)
		{
			CodeBashApp.invoiceDetailsService.getInstance().addInvoiceDetails(tempObj[i]);
		}
		var invoiceDetailsObj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(Session.get('invoiceId'));
		var totalProfit = 0;
		var totalSellingCost = 0;
		for(var i = 0; i<invoiceDetailsObj.length;i++)
		{
			totalProfit = Number(totalProfit) + Number(invoiceDetailsObj[i].profit);
			totalSellingCost = Number(totalSellingCost)+Number(invoiceDetailsObj[i].sellingCost);
		}
		var invoiceObj = {};
		invoiceObj.invoiceId = invoiceDetailsObj[0].invoiceId;
		invoiceObj.buyerId = $("#buyerId").val();
		invoiceObj.date = $("#date").val();
		invoiceObj.totalCost = totalSellingCost;
		invoiceObj.totalProfit = totalProfit;
		invoiceObj.paymentStatus = $("#paymentStatus").val();
		invoiceObj.deliveryStatus = $("#deliveryStatus").val();
		CodeBashApp.invoiceService.getInstance().addInvoice(invoiceObj);
	}
	/*"submit #confirm":function(event)
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
		var plantObj = '';
		var newQuantity = '';
		for(var i=0;i<tempObj.length;i++)
		{
			plantObj = CodeBashApp.plantDetailsService.getInstance().findPlantById(tempObj[i].plantId);
			newQuantity = Number(plantObj[0].quantity) - tempObj[i].quantity;
			CodeBashApp.plantDetailsService.getInstance().updatePlant(plantObj[0]._id,'','','','','',newQuantity,'');
		}
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

/*
db.plantDetails.find().pretty();
{
        "_id" : "o88x6SPAPcBijLynp",
        "name" : "rose",
        "type" : "indoor",
        "scientificName" : "mango",
        "category" : "flowering"
}
{
        "_id" : "v6B2t8fYh2AoTxT42",
        "name" : "apple",
        "type" : "indoor",
        "scientificName" : "apla",
        "category" : "flowering"
}
*/