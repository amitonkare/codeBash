function checkDate() {
	var EnteredDate = $("#date").val(); // For JQuery
	var month = EnteredDate.substring(0, 2);
	var date = EnteredDate.substring(3, 5);
	var year = EnteredDate.substring(6, 10);
	var myDate = new Date(year, month - 1, date);
	var today = new Date();
	if (myDate >= today) {
		return true;
	}
	else {
		alert("Entered date is less than today's date ");
		return false;
	}
}
Template.invoiceDetails.onRendered(function(){
	CodeBashApp.invoiceDetailsOnReady();
	Meteor.typeahead.inject();
	this.$('.datetimepicker').datetimepicker();
});
Template.invoiceDetails.helpers({
	plants:function() //auto-complete suggestions
	{
		console.log(CodeBashApp.plantDetailsService.getInstance().findPlants().map(function(it){ return it.name; }));
		return CodeBashApp.plantDetailsService.getInstance().findPlants().map(function(it){ return it.name; });
	},
	invoiceSaved:function()
	{
		if(Session.get("invoiceSaved"))
		{
			return false;
		}
		else
		{
			return true;
		}

	},
	billed:function()
	{
		if(Session.get("invoiceSaved"))
		{
			return true;
		}
		else
		{
			return false;
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
	},
	netTotal:function()
	{
		if(Session.get("invoiceSaved"))
		{	
			var total= 0;
			var obj = temp.find().fetch();
			for(var i = 0;i<obj.length;i++)
			{
				total = total +(obj[i].quantity*obj[i].sellingCost);
				//total= total.toFixed(2);
			}
			Session.set('total',total);
			return total;
		}
	},
	totalTax:function()
	{
		var tax;
		if(Session.get("invoiceSaved") && Session.get('total'))
		{	

			tax = ((14/100)* Number(Session.get('total')));
			tax = (tax + (0.5*Number(tax)));
			tax = tax.toFixed(2);
			Session.set('tax',tax);
			return tax;
		}
	},
	grandTotal:function()
	{
		var grandTotal;
		if(Session.get("invoiceSaved") && Session.get('total') && Session.get('tax'))
		{
			grandTotal = (Number(Session.get('total'))+Number(Session.get('tax')));
			//grandTotal = grandTotal.toFixed(2);
			return grandTotal;
		}

	},
	invoiceSavedObj:function()
	{
		if(Session.get("invoiceSaved")){
			var obj={};
			obj.invoiceNo = Session.get("invoiceNo");
			obj.sellerId = Session.get("sellerId");
			obj.paymentStatus = Session.get("paymentStatus");
			obj.date = Session.get("date");
			return obj;
		}
	}


});
Template.invoiceDetails.events({
	"submit #addToCart":function(event)
	{
		var name = $("#plantName").val();
		$("#plantName").val('');
		event.preventDefault();
		Session.set('invoiceSaved','');
		var plant = CodeBashApp.plantDetailsService.getInstance().findPlantByName(name);
		console.log(plant);	
		var str = Session.get('plants');
		console.log(str.search(name));
		var flag = 1;
		if(Session.get('plants') != '')
		{
			if(str.search(name) !== -1)
			{
				flag = 0;
				alert('plant exists in list');
			}
		}

		if(flag == 1)
		{
			Session.set('plants',Session.get('plants')+'+'+name);	
			var tempObj = {};
			tempObj.invoiceId = $("#invoiceNo").val();
			Session.set("invoiceId",tempObj.invoiceId);
			tempObj.plantId = plant[0]._id;
			tempObj.quantity ='1' ;
			tempObj.sellingCost = '';
			tempObj.profit = ''; 		
			temp.insert(tempObj);
			flag = 1;
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
	"click #invoiceSavedDraft":function()
	{
		Session.set("invoiceNo",$("#invoiceNo").val());
		Session.set("buyerId",$("#buyerId").val());
		Session.set("paymentStatus",$("#paymentStatus").val());
		Session.set("date",$("#date").val());
		var Contain='';
		$("#items :text").each(function(){
			Contain += $(this).val() + "+";
		});
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
		var tempObj = temp.find().fetch();
		for(i=0;i<quantityArray.length;i++)
		{
			tempObj[i].quantity = quantityArray[i];
			tempObj[i].sellingCost = sellingCostArray[i];
		}
		for(i=0;i<quantityArray.length;i++ )
		{	
			temp.remove({_id:tempObj[i]._id});
		}
		for(i=0;i<quantityArray.length;i++)
		{
			temp.insert(tempObj[i]);
		}


		var flag = '0';
		$("#items :text").each(function(){
			if( $(this).val() == '')
			{
				alert('please enter quantity and cost');
				flag = '1';
			} 
		}); 
		if(checkDate()==false)
		{
			flag = '1';
		}
		if(flag == '0')
		{
			$("#invoiceSavedDraft").remove();
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
			Session.set("invoiceSaved",'');	
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
			Session.set('invoiceTotalProfit',totalProfit);
			Session.set('invoiceTotalCost',totalSellingCost);
			var invoiceObj = {};
			invoiceObj.invoiceId = invoiceDetailsObj[0].invoiceId;
			invoiceObj.buyerId = $("#buyerId").val();
			invoiceObj.date = $("#date").val();
			invoiceObj.totalCost = totalSellingCost;
			invoiceObj.totalProfit = totalProfit;
			invoiceObj.paymentStatus = $("#paymentStatus").val();
			invoiceObj.deliveryStatus = $("#deliveryStatus").val();	
			invoiceObj.status = '';
			CodeBashApp.invoiceService.getInstance().addInvoice(invoiceObj);
			for(i = 0;i<tempObj.length;i++)
			{
				temp.remove({_id:tempObj[i]._id});
			}
			Session.set("invoiceSaved",'true');
			alert('Saved');
			//Session.set('invoiceSaved','');
			Session.set('detailsSaved','true');
			Router.go('/invoiceDetailsLandingPage');
		}
	},
	"click #finalInvoice":function()
	{
		if(Session.get('detailsSaved'))
		{
			CodeBashApp.invoiceService.getInstance().updateInvoice('','','','final',Session.get('invoiceId'),Session.get('invoiceTotalProfit'),Session.get('invoiceTotalCost'));
			$("#plantName").attr("disabled",true);
			$("#invoiceNo").attr("disabled",true);
			$("#buyerId").attr("disabled",true);
			$("#paymentStatus").attr("disabled",true);
			$("#deliveryStatus").attr("disabled",true);
			$("#date").attr("disabled",true);
			$("#items :text").each(function(){
				$(this).attr("disabled",true);				 
			});			
		}
		else
		{	
			Session.set("invoiceSaved",'true');
			Session.set("invoiceNo",$("#invoiceNo").val());
			Session.set("buyerId",$("#buyerId").val());
			Session.set("paymentStatus",$("#paymentStatus").val());
			Session.set("date",$("#date").val());
			var Contain='';
			$("#items :text").each(function(){
				Contain += $(this).val() + "+";
			});
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
			var tempObj = temp.find().fetch();
			for(i=0;i<quantityArray.length;i++)
			{
				tempObj[i].quantity = quantityArray[i];
				tempObj[i].sellingCost = sellingCostArray[i];
			}
			for(i=0;i<quantityArray.length;i++ )
			{	
				temp.remove({_id:tempObj[i]._id});
			}
			for(i=0;i<quantityArray.length;i++)
			{
				temp.insert(tempObj[i]);
			}


			var flag = '0';
			$("#items :text").each(function(){
				if( $(this).val() == '')
				{
					alert('please enter quantity and cost');
					flag = '1';
				} 
			}); 
			if(checkDate()==false)
			{
				flag = '1';
			}
			if(flag == '0')
			{
				$("#invoiceSavedDraft").remove();
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
				Session.set("invoiceSaved",'');	
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
				Session.set('invoiceTotalProfit',totalProfit);
				Session.set('invoiceTotalCost',totalSellingCost);
				var invoiceObj = {};
				invoiceObj.invoiceId = invoiceDetailsObj[0].invoiceId;
				invoiceObj.buyerId = $("#buyerId").val();
				invoiceObj.date = $("#date").val();
				invoiceObj.totalCost = totalSellingCost;
				invoiceObj.totalProfit = totalProfit;
				invoiceObj.paymentStatus = $("#paymentStatus").val();
				invoiceObj.deliveryStatus = $("#deliveryStatus").val();	
				invoiceObj.status = "final";
				CodeBashApp.invoiceService.getInstance().addInvoice(invoiceObj);
				for(i = 0;i<tempObj.length;i++)
				{
					temp.remove({_id:tempObj[i]._id});
				}
				$("#plantName").attr("disabled",true);
				$("#invoiceNo").attr("disabled",true);
				$("#buyerId").attr("disabled",true);
				$("#paymentStatus").attr("disabled",true);
				$("#deliveryStatus").attr("disabled",true);
				$("#date").attr("disabled",true);
				$("#items :text").each(function(){
				$(this).attr("disabled",true);				 
				});
		

				alert('final');
				Router.go('/invoiceDetailsLandingPage');
			}
		}

	}

});

