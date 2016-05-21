function checkDate() {
	var EnteredDate = $("#date").val(); // For JQuery
	var month = EnteredDate.substring(0, 2);
	var date = EnteredDate.substring(3, 5);
	var year = EnteredDate.substring(6, 10);
	var hrsmin = EnteredDate.substring(10,EnteredDate.length-2); 
	hrsmin = hrsmin.split(":");

	var hrs = hrsmin[0];
	var min = hrsmin[1];
	console.log("hrs-->"+hrs+"    min--->"+min);
	var myDate = new Date(year, month - 1,date,hrs,min,'0','0');
	var today = new Date();
	console.log("mydate--->"+myDate);
	console.log("today-->"+today);
	if (myDate >= today) {
		return true;
	}
	else {
		$("#dateGroup").addClass('form-group has-error has-feedback');                 
		$("#dateSpan").html('please enter valid Date');                			
		return false;
	}
}

        Template.invoiceEdit.onRendered(function(){
        	Meteor.typeahead.inject();
        	this.$('.datetimepicker').datetimepicker();
        	CodeBashApp.invoiceEditOnReady();
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
		var total= 0;
		var obj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(Session.get('invoiceDetailsId'));
		for(var i = 0;i<obj.length;i++)
		{
			total = total +(obj[i].quantity*obj[i].sellingCost);
				//total= total.toFixed(2);
			}
			Session.set('total',total);
			return Session.get('total');
		},
		totalTax:function()
		{
			var tax;
			if(Session.get('total'))
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
			if(Session.get('total') && Session.get('tax'))
			{
				grandTotal = (Number(Session.get('total'))+Number(Session.get('tax')));
			//grandTotal = grandTotal.toFixed(2);
			return grandTotal;
		}

	},
});
 Template.invoiceEdit.events({
 	'click #removeFromCart':function()
 	{
 		CodeBashApp.invoiceDetailsService.getInstance().deleteInvoiceDetails(this._id);
 		CodeBashApp.invoiceTotal();
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
 			tempObj.sellingCost = '0';
 			tempObj.profit = ''; 		
 			CodeBashApp.invoiceDetailsService.getInstance().addInvoiceDetails(tempObj);
 		}
 		CodeBashApp.invoiceTotal();
 	},
 	"click #invoiceSavedDraft":function()
 	{
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
					$("#tableGroup").addClass('form-group has-error has-feedback');                 
					$("#tableSpan").html('please enter quantity and cost');          	
					flag = '1';
				} 
			}); 
			
			if(flag == '0')
			{
			//$("#invoiceSavedDraft").remove();
			var Contain='';
			$("#items :text").each(function(){
				Contain += $(this).val() + "+";
			});
			console.log(Contain);
			var array = Contain.split('+');
			console.log(array.length);
			var stockQuantity;
			var flag2 = '1';
			var tempObj = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(Session.get('invoiceDetailsId'));
			for(i=0;i<quantityArray.length;i++)
			{
				tempObj[i].quantity = quantityArray[i];
				tempObj[i].sellingCost = sellingCostArray[i];
				stockObj = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId);
				tempObj[i].profit = Number(tempObj[i].quantity * tempObj[i].sellingCost) - Number(tempObj[i].quantity *  stockObj[0].avgCost);	
				if(tempObj[i].profit<0)
				{
					tempObj.profit[i].profit = 0;
				}			
			}
			if(flag2 == '1'){
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
				CodeBashApp.invoiceService.getInstance().updateInvoice(Session.get('editInvoiceId'),'','','','',totalProfit,totalSellingCost);
				$("#saveModal").modal("show");    				
				//alert('Saved');
				//Router.go('/invoiceDetailsLandingPage');	
			}
		}
	},
	"click #finalInvoice":function()
	{
		var flag2 = '1';
		var Contain = '';
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
					$("#tableGroup").addClass('form-group has-error has-feedback');                 
					$("#tableSpan").html('please enter quantity and cost');          	
					//alert('please enter quantity and cost');
					flag = '1';
				} 
				
			}); 
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
					tempObj[i].sellingCost = sellingCostArray[i];
					stockQuantity = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId)[0].quantity;
					if(stockQuantity<quantityArray[i])
					{
						var plantName = CodeBashApp.plantDetailsService.getInstance().findPlantById(tempObj[i].plantId)[0].name;
						//alert('available quantity of '+plantName+'is '+stockQuantity);
						$("#tableGroup").addClass('form-group has-error has-feedback');                 
						$("#tableSpan").html('available quantity of '+plantName+'is '+stockQuantity);          	
					
						return false;
					}	
					stockQuantity = Number(stockQuantity) - Number(tempObj[i].quantity);
					CodeBashApp.stockDetailsService.getInstance().updateStock(tempObj[i].plantId,stockQuantity,'');
					stockObj = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId);
					tempObj[i].profit = Number(tempObj[i].quantity * tempObj[i].sellingCost) - Number(tempObj[i].quantity *  stockObj[0].avgCost);	
					if(tempObj[i].profit<0)
					{
						tempObj.profit[i].profit = '0';
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
				CodeBashApp.invoiceService.getInstance().updateInvoice(Session.get('editInvoiceId'),'','','final','',totalProfit,totalSellingCost);
				$("#plantName").attr("disabled",true);
				$("#invoiceNo").attr("disabled",true);
				$("#buyerId").attr("disabled",true);
				$("#paymentStatus").attr("disabled",true);
				$("#deliveryStatus").attr("disabled",true);
				$("#date").attr("disabled",true);
				$("#items :text").each(function(){
					$(this).attr("disabled",true);				 
				});
		//CodeBashApp.invoiceService.getInstance().updateInvoice(Session.get('editInvoiceId'),'','','final','',Session.get('totalProfit'),Session.get('totalSellingCost'));
		//alert('your invoice is finalized');
		//Router.go('/invoiceDetailsLandingPage');
		$("#confirmModal").modal("show");    					
	}
},
'keyup #cost':function()
{
	CodeBashApp.invoiceTotal();
},
'keyup #quantity':function()
{
	CodeBashApp.invoiceTotal();
},
"click #saveInvoice":function()
{
	Router.go('/invoiceDetailsLandingPage');
},
"click #confirmInvoice":function()
{
	Router.go('/invoiceDetailsLandingPage');
},
	"click #date":function()
	{
		$("#dateGroup").removeClass('form-group has-error has-feedback');                 
		$("#dateGroup").addClass('form-group');                 
		$("#dateSpan").html(''); 
		console.log("inside date click");
		$('#dateIcon').click();
	}


});