CodeBashApp.printSavedPurchaseDetails=function(){
	var obj = CodeBashApp.purchaseService.getInstance().findPurchaseById(Session.get('editPurchaseId'));
	obj[0].sellerId = CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(obj[0].sellerId)[0].name;
	var headstr = "<html><head><title></title></head><body>";
	var footstr = "</body>";
	var tempObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseDetailsId'));
	var contentstr = "<br><br><br><br><br><br><p>Purchase no :"+obj[0].purchaseId+"<br>Seller Name :"+obj[0].sellerId+" <br>"+"Date :"+obj[0].date+"<br>Payment Status :"+obj[0].paymentStatus+"<br>Delivery Status  :"+obj[0].deliveryStatus;	
	var tableHeader ="<table "+"border="+"1"+" style="+"width:100%"+"><thead><tr><th>PlantName</th><th>Quantity</th><th>Cost</th><th>Total</th></tr></thead>";
	var tableBody = "<tbody>";
	var tableFooter = "</tbody></table>";
	var tableContent = "";
	var sum = 0;
	for(var i=0;i<tempObj.length;i++)
	{
		var plantObj = CodeBashApp.plantDetailsService.getInstance().findPlantById(tempObj[i].plantId);
		tempObj[i].plantId = plantObj[0].name;
		tableContent = tableContent + "<tr><td>"+tempObj[i].plantId+"</td><td>"+tempObj[i].quantity+"</td><td>"+tempObj[i].cost+"</td><td>"+(tempObj[i].cost*tempObj[i].quantity)+"</td></tr>";
		sum = sum+Number((tempObj[i].cost*tempObj[i].quantity));
	}
	tableContent = tableContent + "<tr><td></td><td></td><td><b>Total Cost</b></td><td>"+sum+"</td></tr>";
	//var newstr = document.getElementById("#printDiv").innerHTML;
	var oldstr = document.body.innerHTML;
	document.body.innerHTML = headstr+contentstr+tableHeader+tableBody+tableContent+tableFooter+footstr;
	window.print();
	document.body.innerHTML = oldstr;
	return false;
	




};
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
			if( $(this).val() < 0)
			{
				$("#tableGroup").addClass('form-group has-error has-feedback');                 
				$("#tableSpan").html(' quantity and cost must be positive');          
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
	},
	"keyup #cost":function()
	{
		$("#costGroup").removeClass('form-group has-error has-feedback');                 
		$("#costGroup").addClass('form-group');                 			
		$("#costSpan").html('');                	

		tempObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseDetailsId'));
		for(var i=0;i<tempObj.length;i++)
		{
			CodeBashApp.purchaseDetailsService.getInstance().deletePurchaseDetails(tempObj[i]._id);
		}
		var Contain='';
		$("#items :text").each(function(){
			Contain += $(this).val() + "+";
		});
		console.log(Contain);
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
			for(i=0;i<quantityArray.length;i++)
			{
				tempObj[i].quantity = quantityArray[i];
				tempObj[i].cost = costArray[i];		
				tempObj[i].individualTotal = tempObj[i].cost * tempObj[i].quantity;
			}
			for(var i=0;i<tempObj.length;i++)
			{	
				CodeBashApp.purchaseDetailsService.getInstance().addPurchaseDetails(tempObj[i]);	
			}
		},
		"keyup #quantity":function()
		{
			$("#quantityGroup").removeClass('form-group has-error has-feedback');                 
			$("#quantityGroup").addClass('form-group');                 	
			$("#quantitySpan").html('');                
			
			tempObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseDetailsId'));
			for(var i=0;i<tempObj.length;i++)
			{
				CodeBashApp.purchaseDetailsService.getInstance().deletePurchaseDetails(tempObj[i]._id);
			}
			var Contain='';
			$("#items :text").each(function(){
				Contain += $(this).val() + "+";
			});
			console.log(Contain);
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
			for(i=0;i<quantityArray.length;i++)
			{
				tempObj[i].quantity = quantityArray[i];
				tempObj[i].cost = costArray[i];		
				tempObj[i].individualTotal = tempObj[i].cost * tempObj[i].quantity;
			}
			for(var i=0;i<tempObj.length;i++)
			{	
				CodeBashApp.purchaseDetailsService.getInstance().addPurchaseDetails(tempObj[i]);	
			}
		},
		'click #printSavedPurchase':function()
		{
			CodeBashApp.printSavedPurchaseDetails();
			$("#rootDiv").remove();
			Router.go('purchaseDetailsLandingPage');
		}


	});