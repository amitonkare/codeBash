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

Template.invoiceEdit.onRendered(function(){
	Meteor.typeahead.inject();
	this.$('.datetimepicker').datetimepicker();
});
Template.invoiceEdit.helpers({
	plants:function() //auto-complete suggestions
	{
		console.log(CodeBashApp.plantDetailsService.getInstance().findPlants().map(function(it){ return it.name; }));
		return CodeBashApp.plantDetailsService.getInstance().findPlants().map(function(it){ return it.name; });
	},
	invoiceEditObj : function()
	{
		var id = Session.get('editInvoiceId');
		var obj = CodeBashApp.invoiceService.getInstance().findInvoiceById(id)[0];
		Session.set('invoiceDetailsId',obj.invoiceId);
		return obj;
	},
	invoiceList:function()
	{
		var obj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(Session.get('invoiceDetailsId'));
		for(var i = 0 ; i<obj.length;i++)
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
			var obj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(Session.get('invoiceDetailsId'));
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

	}


});
Template.invoiceEdit.events({
	'click #removeFromCart':function()
	{
		CodeBashApp.invoiceDetailsService.getInstance().deleteInvoiceDetails(this._id);
	},
	'submit #addToCart':function(event)
	{
		event.preventDefault();
		var name = $("#plantName").val();
		$("#plantName").val('');
		var validate = CodeBashApp.invoiceEditValidate(name);
		if(validate == true)
		{
			var plant = CodeBashApp.plantDetailsService.getInstance().findPlantByName(name);	
			var tempObj = {};
			tempObj.invoiceId = Session.get('invoiceDetailsId');
			tempObj.plantId = plant[0]._id;
			tempObj.quantity ='1' ;
			tempObj.sellingCost = '';
			tempObj.profit = ''; 		
			CodeBashApp.invoiceDetailsService.getInstance().addInvoiceDetails(tempObj);
		}
	},
	"click #invoiceSavedDraft":function()
	{
		Session.set("invoiceSaved",'true');
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
		var tempObj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(Session.get('invoiceDetailsId'));
		for(i=0;i<quantityArray.length;i++)
		{
			tempObj[i].quantity = quantityArray[i];
			tempObj[i].sellingCost = sellingCostArray[i];
		}
		for(i=0;i<quantityArray.length;i++ )
		{	
			CodeBashApp.invoiceDetailsService.getInstance().deleteInvoiceDetails(tempObj[i]._id);
		}
		for(i=0;i<quantityArray.length;i++)
		{
			CodeBashApp.invoiceDetailsService.getInstance().addInvoiceDetails(tempObj[i]);
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
			var stockQuantity;
			var tempObj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(Session.get('invoiceDetailsId'));
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
				CodeBashApp.invoiceDetailsService.getInstance().deleteInvoiceDetails(tempObj[i]._id);
			}
			for(i=0;i<quantityArray.length;i++)
			{
				CodeBashApp.invoiceDetailsService.getInstance().addInvoiceDetails(tempObj[i]);		
			}
			Session.set("invoiceSaved",'');	
			tempObj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(Session.get('invoiceDetailsId'));
			var invoiceDetailsObj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(Session.get('invoiceDetailsId'));
			var totalProfit = 0;
			var totalSellingCost = 0;
			for(var i = 0; i<invoiceDetailsObj.length;i++)
			{
				totalProfit = Number(totalProfit) + Number(invoiceDetailsObj[i].profit);
				totalSellingCost = Number(totalSellingCost)+Number(invoiceDetailsObj[i].sellingCost);
			}
			Session.set('totalProfit',totalProfit);
			Session.set('totalSellingCost',totalSellingCost);
			CodeBashApp.invoiceService.getInstance().updateInvoice(Session.get('editInvoiceId'),'','','saved','',totalProfit,totalSellingCost);
			alert('Saved');
		}
	},
	"click #finalInvoice":function()
	{
			$("#plantName").attr("disabled",true);
			$("#invoiceNo").attr("disabled",true);
			$("#buyerId").attr("disabled",true);
			$("#paymentStatus").attr("disabled",true);
			$("#deliveryStatus").attr("disabled",true);
			$("#date").attr("disabled",true);
			$("#items :text").each(function(){
				$(this).attr("disabled",true);				 
			});
		CodeBashApp.invoiceService.getInstance().updateInvoice(Session.get('editInvoiceId'),'','','final',Session.get('invoiceId'),Session.get('totalProfit'),Session.get('totalSellingCost'));
	}


});