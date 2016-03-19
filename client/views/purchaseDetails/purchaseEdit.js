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

Template.purchaseEdit.onRendered(function(){
	Meteor.typeahead.inject();
	this.$('.datetimepicker').datetimepicker();
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
			CodeBashApp.purchaseService.getInstance().updatePurchase(Session.get('editPurchaseId'),'','',totalCost,'saved');
			alert('Saved');
			Router.go('/purhcaseDetailsLandingPage');
		}
	},
	"click #finalPurchase":function()
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
		CodeBashApp.purchaseService.getInstance().updatePurchase(Session.get('editPurchaseId'),'','',Session.get('totalCost'),'final');
		Router.go('/purhcaseDetailsLandingPage');
	}


});