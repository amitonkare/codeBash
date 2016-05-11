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

Template.purchaseEdit.onRendered(function(){
	Meteor.typeahead.inject();
	this.$('.datetimepicker').datetimepicker();
	CodeBashApp.purchaseEditOnReady();
});
Template.purchaseEdit.helpers({
	plants:function() //auto-complete suggestions
	{
		console.log(CodeBashApp.plantDetailsService.getInstance().findPlants().map(function(it){ return it.name; }));
		return CodeBashApp.plantDetailsService.getInstance().findPlants().map(function(it){ return it.name; });
	},
	purchaseEditObj : function()
	{
		var id = Session.get('editPurchaseId');
		console.log(id);
		var obj = CodeBashApp.purchaseService.getInstance().findPurchaseById(id)[0];
		console.log(obj);
		Session.set('purchaseDetailsId',obj.purchaseId);
		return obj;
	},
	purchaseList:function()
	{
		var obj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseDetailsId'));
		for(var i = 0 ; i<obj.length;i++)
		{
			var plantObj = CodeBashApp.plantDetailsService.getInstance().findPlantById(obj[i].plantId);
			obj[i].plantId = plantObj[0].name;
		} 
		return obj;
	},
	sellerList:function()
	{
		return CodeBashApp.sellerDetailsService.getInstance().findSeller();
	},
	purchaseSaved:function()
	{
		if(Session.get("purchaseSaved"))
		{
			return false;
		}
		else
		{
			return true;
		}

	}
	
});
Template.purchaseEdit.events({
	'click #removeFromCart':function()
	{
		CodeBashApp.purchaseDetailsService.getInstance().deletePurchaseDetails(this._id);
	},
	'submit #addToCart':function(event)
	{
		event.preventDefault();
		var name = $("#plantName").val();
		$("#plantName").val('');
		var validate = CodeBashApp.purchaseEditValidate(name);
		if(validate == true)
		{
			var plant = CodeBashApp.plantDetailsService.getInstance().findPlantByName(name);	
			var tempObj = {};
			tempObj.purchaseId = Session.get('purchaseDetailsId');
			tempObj.plantId = plant[0]._id;
			tempObj.quantity ='1' ;
			tempObj.cost = '';
			CodeBashApp.purchaseDetailsService.getInstance().addPurchaseDetails(tempObj);
		}else
		{
			$("#tableGroup").addClass('form-group has-error has-feedback');                 
			$("#tableSpan").html('plant already exists in cart');          
		
		}
	},
	"click #purchaseSavedDraft":function()
	{
		Session.set("purchaseSaved",'true');
		var Contain='';
		$("#items :text").each(function(){
			Contain += $(this).val() + "+";
		});
		var array = Contain.split('+');
		console.log(array.length);
		var costArray=[];
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
				costArray[k] = array[i];
				k++;
				}
		}
		var tempObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseDetailsId'));
		for(i=0;i<quantityArray.length;i++)
		{
			tempObj[i].quantity = quantityArray[i];
			tempObj[i].cost = costArray[i];
		}
		for(i=0;i<quantityArray.length;i++ )
		{	
			CodeBashApp.purchaseDetailsService.getInstance().deletePurchaseDetails(tempObj[i]._id);
		}
		for(i=0;i<quantityArray.length;i++)
		{
			CodeBashApp.purchaseDetailsService.getInstance().addPurchaseDetails(tempObj[i]);
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
			$("#purchaseSavedDraft").remove();
			var Contain='';
			$("#items :text").each(function(){
				Contain += $(this).val() + "+";
			});
			console.log(Contain);
			var array = Contain.split('+');
			console.log(array.length);
			var stockQuantity;
			var tempObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseDetailsId'));
			for(i=0;i<quantityArray.length;i++)
			{
				tempObj[i].quantity = quantityArray[i];
	//			stockQuantity = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId)[0].quantity;
	//			stockQuantity = Number(stockQuantity) + Number(tempObj[i].quantity);
	//			CodeBashApp.stockDetailsService.getInstance().updateStock(tempObj[i].plantId,stockQuantity,'');
				tempObj[i].cost = costArray[i];
	//			stockObj = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId);
			}
			for(i=0;i<quantityArray.length;i++ )
			{	
				CodeBashApp.purchaseDetailsService.getInstance().deletePurchaseDetails(tempObj[i]._id);
			}
			for(i=0;i<quantityArray.length;i++)
			{
				CodeBashApp.purchaseDetailsService.getInstance().addPurchaseDetails(tempObj[i]);		
			}
			Session.set("purchaseSaved",'');	
			tempObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseDetailsId'));
			var purchaseDetailsObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseDetailsId'));
			var totalProfit = 0;
			var totalCost = 0;
			for(var i = 0; i<purchaseDetailsObj.length;i++)
			{
				totalCost = Number(totalCost)+Number(purchaseDetailsObj[i].cost);
			}
			Session.set('totalProfit',totalProfit);
			Session.set('totalCost',totalCost);
			CodeBashApp.purchaseService.getInstance().updatePurchase(Session.get('editPurchaseId'),'',$("#paymentStatus").val(),$("#deliveryStatus").val(),totalCost,'');
			//alert('Saved');
			Session.set('purchaseEditSaved','true');
			$("#saveModal").modal("show");    			
		}
	},//(id,purchaseId,paymentStatus,deliveryStatus,totalCost,status)
	"click #finalPurchase":function()
	{
		if(Session.get('purchaseEditSaved'))
		{
			$("#plantName").attr("disabled",true);
			$("#purchaseNo").attr("disabled",true);
			$("#sellerId").attr("disabled",true);
			$("#paymentStatus").attr("disabled",true);
			$("#deliveryStatus").attr("disabled",true);
			$("#date").attr("disabled",true);
			$("#items :text").each(function(){
				$(this).attr("disabled",true);				 
			});
			CodeBashApp.purchaseService.getInstance().updatePurchase(Session.get('editPurchaseId'),'',$("#paymentStatus").val(),$("#deliveryStatus").val(),Session.get('totalCost'),'final');
			$("#confirmModal").modal("show");    			
		}
		else
		{
			var Contain='';
		$("#items :text").each(function(){
			Contain += $(this).val() + "+";
		});
		var array = Contain.split('+');
		console.log(array.length);
		var costArray=[];
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
				costArray[k] = array[i];
				k++;
				}
		}
		var tempObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseDetailsId'));
		for(i=0;i<quantityArray.length;i++)
		{
			tempObj[i].quantity = quantityArray[i];
			tempObj[i].cost = costArray[i];
		}
		for(i=0;i<quantityArray.length;i++ )
		{	
			CodeBashApp.purchaseDetailsService.getInstance().deletePurchaseDetails(tempObj[i]._id);
		}
		for(i=0;i<quantityArray.length;i++)
		{
			CodeBashApp.purchaseDetailsService.getInstance().addPurchaseDetails(tempObj[i]);
		}
		var flag = '0';
		$("#items :text").each(function(){
			if( $(this).val() == '')
			{
				$("#tableGroup").addClass('form-group has-error has-feedback');                 
				$("#tableSpan").html('please enter plants for purchase');          
			//	alert('please enter quantity and cost');
				flag = '1';
			} 
		}); 
		
		if(flag == '0')
		{
			$("#purchaseSavedDraft").remove();
			var Contain='';
			$("#items :text").each(function(){
				Contain += $(this).val() + "+";
			});
			console.log(Contain);
			var array = Contain.split('+');
			console.log(array.length);
			var stockQuantity;
			var tempObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseDetailsId'));
			for(i=0;i<quantityArray.length;i++)
			{
				tempObj[i].quantity = quantityArray[i];
				stockQuantity = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId)[0].quantity;
				stockQuantity = Number(stockQuantity) + Number(tempObj[i].quantity);
				CodeBashApp.stockDetailsService.getInstance().updateStock(tempObj[i].plantId,stockQuantity,'');
				tempObj[i].cost = costArray[i];
				stockObj = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId);
			}
			for(i=0;i<quantityArray.length;i++ )
			{	
				CodeBashApp.purchaseDetailsService.getInstance().deletePurchaseDetails(tempObj[i]._id);
			}
			for(i=0;i<quantityArray.length;i++)
			{
				CodeBashApp.purchaseDetailsService.getInstance().addPurchaseDetails(tempObj[i]);		
			}
			Session.set("purchaseSaved",'');	
			tempObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseDetailsId'));
			var purchaseDetailsObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseDetailsId'));
			var totalProfit = 0;
			var totalCost = 0;
			for(var i = 0; i<purchaseDetailsObj.length;i++)
			{
				totalCost = Number(totalCost)+Number(purchaseDetailsObj[i].cost);
			}
			Session.set('totalProfit',totalProfit);
			Session.set('totalCost',totalCost);
			CodeBashApp.purchaseService.getInstance().updatePurchase(Session.get('editPurchaseId'),'',$("#paymentStatus").val(),$("#deliveryStatus").val(),totalCost,'');
			$("#confirmModal").modal("show");    				
			}
		}		
	},
	
	"click #savePurchase":function()
	{
		Router.go('/purchaseDetailsLandingPage');
	},
	"click #confirmPurchase":function()
	{
		Router.go('/purchaseDetailsLandingPage');
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