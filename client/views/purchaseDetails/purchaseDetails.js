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

		Template.purchaseDetails.onRendered(function(){
			CodeBashApp.purchaseDetailsOnReady();
			Meteor.typeahead.inject();
			this.$('.datetimepicker').datetimepicker();
		});
		Template.purchaseDetails.helpers({
	plants:function() //auto-complete suggestions
	{
		return CodeBashApp.plantDetailsService.getInstance().findPlants().map(function(it){ return it.name; });
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
	savedObj:function()
	{
		if(Session.get("saved")){
			var obj={};
			obj.purchaseNo = Session.get("purchaseNo");
			obj.sellerId = Session.get("sellerId");
			obj.paymentStatus = Session.get("paymentStatus");
			obj.deliveryStatus = Session.get("deliveryStatus");
			obj.date = Session.get("date");
			return obj;
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
	sellerList:function()
	{
		return CodeBashApp.sellerDetailsService.getInstance().findSeller();
	}

});

		Template.purchaseDetails.events({
			"submit #addToCart":function(event)
			{
				event.preventDefault();
				var name = $("#plantName").val();
				$("#plantName").val('');
				var str = Session.get('purchasedPlants');
				var plant = CodeBashApp.plantDetailsService.getInstance().findPlantByName(name);
				console.log(str.search(name));
				var flag = 1;
				if(Session.get('purchasedPlants') != '')
				{
					if(str.search(name) !== -1)
					{
						flag = 0;
						$("#tableGroup").addClass('form-group has-error has-feedback');                 
						$("#tableSpan").html('plant Exists in cart');          		
					}
				}
				if($("#purchaseNo").val()=='')
				{
					event.preventDefault();
					$("#purchaseNoGroup").addClass('form-group has-error has-feedback');                 
					$("#purchaseNoSpan").html('please enter purchase No');                
					flag = 0;
				}
				
				if(flag == 1)
				{
					Session.set('purchasedPlants',Session.get('purchasedPlants')+'+'+name);	
					var tempObj = {};
					
					tempObj.purchaseId = $("#purchaseNo").val();
					Session.set("purchaseId",tempObj.purchaseId);
					tempObj.plantId = plant[0]._id;
					tempObj.quantity ='1' ;
					tempObj.cost = '';
					temp.insert(tempObj);
					flag = 1;
				}
			},
			"click #removeFromCart":function(event)
			{
				var name = this.plantId;
				var str = Session.get('purchasedPlants');
				console.log(str);
				str = str.replace(name,"+");
				Session.set('purchasedPlants',str);
				console.log("After replacements-->"+Session.get('purchasedPlants'));	
				temp.remove(this._id);
				event.preventDefault();
			},
			"click #cancelPurchase":function()
			{
				var tempObj = temp.find().fetch();
				for(var i=0;i<tempObj.length;i++ )
				{	
					temp.remove({_id:tempObj[i]._id});
				}	
				$("#plantName").val('');
				$("#purchaseNo").val('');
				$("#sellerId").val('');
				$("#paymentStatus").val('');
				$("#deliveryStatus").val('');
				$("#date").val('');
			},
			"click #saveDraft":function()
			{
				var flag = '0';
				console.log('inside click saveDraft');
				var validate = CodeBashApp.purchaseDetailsValidate();
				if(Session.get('purchasedPlants')=='')
				{
					$("#tableGroup").addClass('form-group has-error has-feedback');                 
					$("#tableSpan").html('please enter plants for purchase');          
					flag = '1';
				}
				if($("#date").val()=='')
				{
					$("#dateGroup").addClass('form-group has-error has-feedback');                 
					$("#dateSpan").html('please enter date');                					
					flag = '1';
				}
				else
					$("#items :text").each(function(){
						if($(this).val() == '')
						{
							$("#quantityGroup").addClass('form-group has-error has-feedback');                 
							$("#quantitySpan").html('please enter quantity');                
							$("#costGroup").addClass('form-group has-error has-feedback');                 
							$("#costSpan").html('please enter cost');                	
				//alert('please enter cost and quantity');
				flag = '1';
			}

		});
				if(checkDate()==false)
				{
					flag = '1';
				}
				console.log("flag--->"+flag+"validate--->"+validate);
				if(validate == "false")
				{
					flag = '1';
				}
				if(flag=='0')
				{
					console.log('inside if');
					Session.set("saved",'true');
					Session.set("purchaseNo",$("#purchaseNo").val());
					Session.set("sellerId",$("#sellerId").val());
					Session.set("paymentStatus",$("#paymentStatus").val());
					Session.set("deliveryStatus",$("#deliveryStatus").val());
					Session.set("date",$("#date").val());
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
			var stockQuantity;
			var	tempObj = temp.find().fetch();
			for(i=0;i<quantityArray.length;i++)
			{
				tempObj[i].quantity = quantityArray[i];
				tempObj[i].cost = costArray[i];		
			}
			for(i=0;i<quantityArray.length;i++ )
			{	
				temp.remove({_id:tempObj[i]._id});
			}
			for(i=0;i<quantityArray.length;i++)
			{
				temp.insert(tempObj[i]);
			}		
			$("#cancelPurchase").remove();
			var Contain='';
			$("#items :text").each(function(){
				Contain += $(this).val() + "+";
			});
			$("#items :text").each(function(){
				$(this).attr("disabled",true) ;
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
			var stockQuantity;
			var	tempObj = temp.find().fetch();
			for(i=0;i<quantityArray.length;i++)
			{
				tempObj[i].quantity = quantityArray[i];
				tempObj[i].cost = costArray[i];		
			}
			for(i=0;i<quantityArray.length;i++ )
			{	
				temp.remove({_id:tempObj[i]._id});
			}
			for(i=0;i<quantityArray.length;i++)
			{
				temp.insert(tempObj[i]);
			}
			tempObj = temp.find().fetch();
			console.log(temp.find().fetch());
			for(i = 0;i<tempObj.length;i++)
			{
				CodeBashApp.purchaseDetailsService.getInstance().addPurchaseDetails(tempObj[i]);
			}
			var purchaseDetailsObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseId'));	
			var totalcost = 0;
			for(var i = 0; i<purchaseDetailsObj.length;i++)
			{
				totalcost = Number(totalcost)+Number(purchaseDetailsObj[i].cost);
			}
			var purchaseObj = {};
			purchaseObj.purchaseId = purchaseDetailsObj[0].purchaseId;
			purchaseObj.sellerId = $("#sellerId").val();
			purchaseObj.date = $("#date").val();
			purchaseObj.totalCost = totalcost;
			Session.set('totalCost',totalcost);
			purchaseObj.paymentStatus = $("#paymentStatus").val();
			purchaseObj.deliveryStatus = $("#deliveryStatus").val();
			purchaseObj.status = 'saved';
			CodeBashApp.purchaseService.getInstance().addPurchase(purchaseObj);
			for(i = 0;i<tempObj.length;i++)
			{
				temp.remove(tempObj[i]._id);
			}
			//alert('saved');
			Session.set('purchaseDetailsSaved','true');
			$("#saveDraft").remove();
			$("#saveModal").modal("show");    			
		}
	},
	"click #finalPurchase":function()
	{	

		if(Session.get('purchaseDetailsSaved'))
		{
			CodeBashApp.purchaseService.getInstance().updatePurchase('',Session.get('purchaseNo'),'','',Session.get('totalCost'),'final');
		}
		else
		{
			var flag = '0';
			var validate = CodeBashApp.purchaseDetailsValidate();
			if(Session.get('purchasedPlants')=='')
			{
				$("#tableGroup").addClass('form-group has-error has-feedback');                 
				$("#tableSpan").html('please enter plants for purchase');          
				flag = '1';
			}
			if(Session.get('purchasedPlants')=='')
			{
				$("#tableGroup").addClass('form-group has-error has-feedback');                 
				$("#tableSpan").html('please enter plants for purchase');          
				flag = '1';
			}
			
			if(validate =='false')
			{
				flag='1';
			}
			if($("#date").val()=='')
			{
				$("#dateGroup").addClass('form-group has-error has-feedback');                 
				$("#dateSpan").html('please enter date');                					
				flag = '1';
			}
			$("#items :text").each(function(){
				if($(this).val() == '')
				{
					$("#quantityGroup").addClass('form-group has-error has-feedback');                 
					$("#quantitySpan").html('please enter quantity');                
					$("#costGroup").addClass('form-group has-error has-feedback');                 
					$("#costSpan").html('please enter cost');                			
				//alert('please enter cost and quantity');
				flag = '1';
			}

		});
			if(checkDate()==false)
			{
				flag = '1';
			}
			
			if(flag == '0')
			{
				$("#cancelPurchase").remove();
				$("#saveDraft").remove();

				$("#plantName").attr("disabled",true);
				$("#purchaseNo").attr("disabled",true);
				$("#sellerId").attr("disabled",true);
				$("#paymentStatus").attr("disabled",true);
				$("#deliveryStatus").attr("disabled",true);
				$("#quantity").attr("disabled",true);
				$("#cost").attr("disabled",true);	
				$("#date").attr("disabled",true);

				var Contain='';
				$("#items :text").each(function(){
					Contain += $(this).val() + "+";
				});
				$("#items :text").each(function(){
					$(this).attr("disabled",true) ;
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
			var stockQuantity;
			var	tempObj = temp.find().fetch();
			for(i=0;i<quantityArray.length;i++)
			{
				tempObj[i].quantity = quantityArray[i];
				tempObj[i].cost = costArray[i];		
				if(CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId)[0] != null)
				{
					stockQuantity = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(tempObj[i].plantId)[0].quantity;
					stockQuantity = Number(stockQuantity) + Number(tempObj[i].quantity);
					CodeBashApp.stockDetailsService.getInstance().updateStock(tempObj[i].plantId,stockQuantity,tempObj[i].cost);
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
			tempObj = temp.find().fetch();
			console.log(temp.find().fetch());
			for(i = 0;i<tempObj.length;i++)
			{
				CodeBashApp.purchaseDetailsService.getInstance().addPurchaseDetails(tempObj[i]);
			}
			var purchaseDetailsObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseId'));	
			var totalcost = 0;
			for(var i = 0; i<purchaseDetailsObj.length;i++)
			{
				totalcost = Number(totalcost)+Number(purchaseDetailsObj[i].cost);
			}
			var purchaseObj = {};
			purchaseObj.purchaseId = purchaseDetailsObj[0].purchaseId;
			purchaseObj.sellerId = $("#sellerId").val();
			purchaseObj.date = $("#date").val();
			purchaseObj.totalCost = totalcost;
			purchaseObj.paymentStatus = $("#paymentStatus").val();
			purchaseObj.deliveryStatus = $("#deliveryStatus").val();
			purchaseObj.status = 'final';
			CodeBashApp.purchaseService.getInstance().addPurchase(purchaseObj);
			for(i = 0;i<tempObj.length;i++)
			{
				temp.remove(tempObj[i]._id);
			}
			$("#confirmModal").modal("show");    				
		}//end of if
		
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
	"click #printPurchase":function()
	{
		var flag = 0,dv;
		$("#items :text").each(function(){
		if($(this).val() == ''|| $(this).val() == '0')
		{
			$("#quantityGroup").addClass('form-group has-error has-feedback');                 
			$("#quantitySpan").html('please enter quantity');                
			$("#costGroup").addClass('form-group has-error has-feedback');                 
			$("#costSpan").html('please enter cost');                	
			flag = 1;
		}});
		
		console.log("inside print purchase");
		var validate = CodeBashApp.purchaseDetailsValidate();
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
			console.log("flag value-->"+flag);
			flag = 1;
		}
		console.log("flag--->"+flag);
		if(flag == 0)
		{
				var purchaseNo = $("#purchaseNo").val();
				var date = $("#date").val();
				var paymentStatus = $("#paymentStatus").val();
				var deliveryStatus = $("#deliveryStatus").val();
				var sellerName = $("#sellerId").val();
				sellerName = CodeBashApp.sellerDetailsService.getInstance().findSellerNameById(sellerName);
				CodeBashApp.printPurchaseDetails(purchaseNo,date,paymentStatus,deliveryStatus,sellerName);
		
		}	

	},
	"click #date":function()
	{
		$("#dateGroup").removeClass('form-group has-error has-feedback');                 
		$("#dateGroup").addClass('form-group');                 
		$("#dateSpan").html('');                			
	},
	"keyup #cost":function()
	{
		$("#costGroup").removeClass('form-group has-error has-feedback');                 
		$("#costGroup").addClass('form-group');                 			
		$("#costSpan").html('');                	
			
		tempObj = temp.find().fetch();
		for(var i=0;i<tempObj.length;i++)
		{
			temp.remove(tempObj[i]._id);
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
			}
			for(var i=0;i<tempObj.length;i++)
			{	
				temp.insert(tempObj[i]);
			}
	},
	"keyup #quantity":function()
	{
		$("#quantityGroup").removeClass('form-group has-error has-feedback');                 
		$("#quantityGroup").addClass('form-group');                 	
		$("#quantitySpan").html('');                
			
		tempObj = temp.find().fetch();
		for(var i=0;i<tempObj.length;i++)
		{
			temp.remove(tempObj[i]._id);
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
			}
			for(var i=0;i<tempObj.length;i++)
			{	
				temp.insert(tempObj[i]);
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

