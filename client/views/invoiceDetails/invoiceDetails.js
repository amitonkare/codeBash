function checkDate() {
	var EnteredDate = $("#date").val(); // For JQuery
	var month = EnteredDate.substring(0, 2);
	var date = EnteredDate.substring(3, 5);
	var year = EnteredDate.substring(6, 10);
	var hrsmin = EnteredDate.substring(10,EnteredDate.length-2); 
	hrsmin = hrsmin.split(":");

	var hrs = hrsmin[0];
	var min = hrsmin[1];
	//console.log("hrs-->"+hrs+"    min--->"+min);
	var myDate = new Date(year, month - 1,date,hrs,min,'0','0');
	var today = new Date();
	//console.log("mydate--->"+myDate);
	//console.log("today-->"+today);
	if (myDate >= today) {
		return true;
	}
	else {
		$("#dateGroup").addClass('form-group has-error has-feedback');                 
		$("#dateSpan").html('please enter valid Date');                			
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
		//console.log(CodeBashApp.plantDetailsService.getInstance().findPlants().map(function(it){ return it.name; }));
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
		//console.log("inside itemlist");
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
		//console.log(plant);	
		var str = Session.get('plants');
		//console.log(str.search(name));
		var flag = 1;
		if(Session.get('plants') != '')
		{
			if(str.search(name) !== -1)
			{
				$("#tableSpan").html('plant Exists in cart');          
				flag = 0;
				
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
			tempObj.sellingCost = '0';
			tempObj.profit = ''; 		
			temp.insert(tempObj);
			flag = 1;
		}
		CodeBashApp.invoiceTotal();
	},
	"click #removeFromCart":function(event)
	{
		var name = this.plantId;
		var str = Session.get('plants');
		//console.log(str);
		str = str.replace(name,"+");
		Session.set('plants',str);
		//console.log("After replacements-->"+Session.get('plants'));
		temp.remove(this._id);
		event.preventDefault();
		CodeBashApp.invoiceTotal();
	},
	"click #cancelInvoice":function()
	{
		var tempObj = temp.find().fetch();
		for(var i=0;i<tempObj.length;i++ )
		{	
			temp.remove({_id:tempObj[i]._id});
		}	
		Session.set('plants','');
		$("#plantName").val('');
		$("#invoiceNo").val('');
		$("#buyerId").val('');
		$("#paymentStatus").val('');
		$("#deliveryStatus").val('');
		$("#date").val('');
	},
	"click #invoiceSavedDraft":function()
	{
		var flag = '0';
		var validate = CodeBashApp.invoiceDetailsValidate();
		if(Session.get('plants')=='')
		{
			$("#tableGroup").addClass('form-group has-error has-feedback');                 
			$("#tableSpan").html('please enter plants for purchase');          
			flag = '1';
		}
		if(validate =='false')
		{
			flag = '1';
		}
		$("#items :text").each(function(){
			if( $(this).val() == '' || $(this).val() == '0')
			{
				$("#quantityGroup").addClass('form-group has-error has-feedback');                 
				$("#quantitySpan").html('please enter quantity');                
				$("#costGroup").addClass('form-group has-error has-feedback');                 
				$("#costSpan").html('please enter cost');                	
				//alert('please enter cost and quantity');
				flag = '1';
			}
			if( $(this).val() < 0)
			{
				$("#quantityGroup").addClass('form-group has-error has-feedback');                 
				$("#quantitySpan").html('quantity must be a positive number');                
				$("#costGroup").addClass('form-group has-error has-feedback');                 
				$("#costSpan").html('cost must be a positive number');                	
				//alert('please enter cost and quantity');
				flag = '1';
			}
		});
		if($("#date").val()=='')
		{
			$("#dateGroup").addClass('form-group has-error has-feedback');                 
			$("#dateSpan").html('please enter  Date');                			
			flag ='1'; 
		} 
		if(checkDate()==false)
		{			
			flag = '1';
		}
		if(flag == '0')
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
			//console.log(array.length);
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
		
		var Contain='';
		$("#items :text").each(function(){
			Contain += $(this).val() + "+";
		});
		//console.log(Contain);
		var array = Contain.split('+');
		//console.log(array.length);
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
			var flag2 = '1';
			tempObj = temp.find().fetch();
			for(i=0;i<quantityArray.length;i++)
			{
				tempObj[i].quantity = quantityArray[i];
				tempObj[i].sellingCost = sellingCostArray[i];
				stockQuantity = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId)[0].quantity;
				stockObj = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId);
				tempObj[i].profit = Number(tempObj[i].quantity * tempObj[i].sellingCost) - Number(tempObj[i].quantity *  stockObj[0].avgCost);	
				//console.log('profit--->'+tempObj[i].profit)
				if(tempObj[i].profit<0)
				{
					tempObj[i].profit='0';
				}			
			}
			if(flag2 == '1'){
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
				//console.log(temp.find().fetch());
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
				invoiceObj.status = 'saved';
				CodeBashApp.invoiceService.getInstance().addInvoice(invoiceObj);
				for(i = 0;i<tempObj.length;i++)
				{
					temp.remove({_id:tempObj[i]._id});
				}
			//alert('Saved');
			//Session.set("invoiceSaved",'true');
			//Session.set('invoiceSaved','');
			Session.set('detailsSaved','true');
			$("#invoiceSavedDraft").remove();			
			$("#saveModal").modal("show");    				
		}
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
		var flag = '0';
		var validate = CodeBashApp.invoiceDetailsValidate();
		if(validate =='false')
		{
			flag = '1';
		}
		$("#items :text").each(function(){
			if( $(this).val() == '' || $(this).val() == '0')
			{
				$("#quantityGroup").addClass('form-group has-error has-feedback');                 
				$("#quantitySpan").html('please enter quantity');                
				$("#costGroup").addClass('form-group has-error has-feedback');                 
				$("#costSpan").html('please enter cost');                	
				//alert('please enter cost and quantity');
				flag = '1';
			}

		}); 
		
		if($("#date").val()=='')
		{	
			$("#dateGroup").addClass('form-group has-error has-feedback');                 
			$("#dateSpan").html('please enter date');                					
			flag = '1';
		}
		if(checkDate()=='false')
		{
			$("#dateGroup").addClass('form-group has-error has-feedback');                 
			$("#dateSpan").html('please enter valid date');                					
			flag = '1';	
		}
		
		if(flag == '0')
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
			//console.log(array.length);
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
			var stockQuantity;
			var flag2 = '1';
			var name;
			tempObj = temp.find().fetch();
			for(i=0;i<quantityArray.length;i++)
			{
				tempObj[i].quantity = quantityArray[i];
				stockQuantity = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId)[0].quantity;
				if(stockQuantity<quantityArray[i])
				{
					name =  CodeBashApp.plantDetailsService.getInstance().findPlantById(tempObj[i].plantId)[0].name;
					$("#tableSpan").html('available quantity of'+name+' is '+stockQuantity);          
					flag2 = '0';
					break; 
				}
				stockQuantity = Number(stockQuantity) - Number(tempObj[i].quantity);
				CodeBashApp.stockDetailsService.getInstance().updateStock(tempObj[i].plantId,stockQuantity,'');
				tempObj[i].sellingCost = sellingCostArray[i];
				stockObj = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId);
				tempObj[i].profit = Number(tempObj[i].quantity * tempObj[i].sellingCost) - Number(tempObj[i].quantity *  stockObj[0].avgCost);	
				if(tempObj[i].profit<0)
				{
					tempObj[i].profit= '0';
				}			
			}
			if(flag2 == '1'){
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
				//console.log(temp.find().fetch());
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
				$("#confirmModal").modal("show");    				
				
			}
		}
	}

	},//end of final purhcase

	"click #saveInvoice":function()
	{
		Router.go('/invoiceDetailsLandingPage');
	},
	"click #confirmInvoice":function()
	{
		Router.go('/invoiceDetailsLandingPage');
	},
	'keyup #cost':function()
	{
		$("#costGroup").removeClass('form-group has-error has-feedback');                 
		$("#costGroup").addClass('form-group');                 
		$("#costSpan").html('');                	
		CodeBashApp.invoiceTotal();
		var Contain='';
		$("#items :text").each(function(){
			Contain += $(this).val() + "+";
		});
		var array = Contain.split('+');
		//console.log(array.length);
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
		for(var i=0;i<tempObj.length;i++)
		{
			temp.remove(tempObj[i]._id);	
		}
		for(var i=0;i<tempObj.length;i++)
		{
			tempObj[i].sellingCost = sellingCostArray[i];
		}
		for(var i=0;i<tempObj.length;i++)
		{
			tempObj[i].quantity = quantityArray[i];
		}
		for(var i=0;i<tempObj.length;i++)
		{
			temp.insert(tempObj[i]);
		}
				
	},
	'keyup #quantity':function()
	{
		$("#quantityGroup").removeClass('form-group has-error has-feedback');                 
		$("#quantityGroup").removeClass('form-group');                 	
		$("#quantitySpan").html('');
		CodeBashApp.invoiceTotal();
		var Contain='';
		$("#items :text").each(function(){
			Contain += $(this).val() + "+";
		});
		var array = Contain.split('+');
		//console.log(array.length);
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
		for(var i=0;i<tempObj.length;i++)
		{
			temp.remove(tempObj[i]._id);	
		}
		for(var i=0;i<tempObj.length;i++)
		{
			tempObj[i].sellingCost = sellingCostArray[i];
		}
		for(var i=0;i<tempObj.length;i++)
		{
			tempObj[i].quantity = quantityArray[i];
		}
		for(var i=0;i<tempObj.length;i++)
		{
			temp.insert(tempObj[i]);
		}
	},
	"click #printInvoice":function()
	{
		var flag = 0,dv;
		$("#items :text").each(function(){
			if( $(this).val() == '' || $(this).val() == '0')
			{
				$("#quantityGroup").addClass('form-group has-error has-feedback');                 
				$("#quantitySpan").html('please enter quantity');                
				$("#costGroup").addClass('form-group has-error has-feedback');                 
				$("#costSpan").html('please enter cost');                	
				//alert('please enter cost and quantity');
				flag = '1';
			}
			if( $(this).val() < 0)
			{
				$("#quantityGroup").addClass('form-group has-error has-feedback');                 
				$("#quantitySpan").html('quantity must be positive');                
				$("#costGroup").addClass('form-group has-error has-feedback');                 
				$("#costSpan").html('cost must be positive');                	
				//alert('please enter cost and quantity');
				flag = '1';
			}  
		});
		console.log("inside print invoice");
		var validate = CodeBashApp.invoiceDetailsValidate();
		console.log("validate--->"+validate);
		if(validate == 'false')
		{
				flag = 1;	
		}
		dv = checkDate();
		console.log("date validate-->"+dv);
		if(dv)
		{
			console.log("flag value-->"+flag)
			flag = 0;
		}
		else
		{
			console.log("flag value-->"+flag)
			flag = 1;
		}
		console.log("flag--->"+flag);
		if(flag == 0)
		{
			
				var invoiceNo = $("#invoiceNo").val();
				var date = $("#date").val();
				var paymentStatus = $("#paymentStatus").val();
				var deliveryStatus = $("#deliveryStatus").val();
				var buyerName = $("#buyerId").val();
				buyerName = CodeBashApp.buyerDetailsService.getInstance().findBuyerNameById(buyerName);
				CodeBashApp.printInvoiceDetails(invoiceNo,date,paymentStatus,deliveryStatus,buyerName);		
		}	

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

