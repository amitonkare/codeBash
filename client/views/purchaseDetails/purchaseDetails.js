Template.purchaseDetails.helpers({
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
	purchaseList:function()
	{
		if(temp.find().fetch()!=null)
		{
			var obj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseId'));
	  		for(var i=0;i<obj.length;i++)
    		{
    			obj[i].plantId =  CodeBashApp.plantDetailsService.getInstance().findPlantById(obj[i].plantId)[0].name;
    		}
    	return obj;
   		}
	},
	sellerList:function()
	{
		return CodeBashApp.sellerDetailsService.getInstance().findSeller();
	}
});
Template.purchaseDetails.events({
	"submit #addToCart":function(event)
	{
		Session.set('itemAdded','true');
		var quantity = event.target.quantity.value; 		
		var newItem = CodeBashApp.plantDetailsService.getInstance().findPlantById(this._id);
		if(!Session.get('purchaseId'))
		{
			Session.set('purchaseId',parseInt(Math.random()*100));
		}	
		if(quantity == 0)
			{
				event.preventDefault();
				console.log("inside validation statement");
				$(".form-group").addClass("form-group has-error has-feedback");				
			}
			else{
			var tempObj = {};
			tempObj.purchaseId = Session.get('purchaseId');
			tempObj.plantId = this._id;
			tempObj.quantity = quantity;
			tempObj.cost = '';
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
    var costArray = Contain.split('+');
    var tempObj = temp.find().fetch();
    for(var i=0;i<tempObj.length;i++)
    {
    	console.log(tempObj[i]._id);
    	console.log(costArray[i]);
    	temp.update(tempObj[i]._id,{$set:{"cost":costArray[i]}});
    }
    console.log(temp.find().fetch());
    tempObj = temp.find().fetch();
    //console.log(CodeBashApp.purchaseDetailsService.getInstance().findpurchase()); 	

    tempObj = temp.find().fetch();
    for(var i=0;i<tempObj.length;i++)
    {
    	CodeBashApp.purchaseDetailsService.getInstance().addPurchaseDetails(tempObj[i]);
    }
    console.log(CodeBashApp.purchaseDetailsService.getInstance().findPurchaseDetails());
    $('#purchaseModal').modal('toggle');
  	event.preventDefault();	
	},
	"click #purchaseAdd":function(event)
	{
		console.log("inside submit confirmpurchase");
		var sellerId =  $('#sellerId').val();
		var purchaseObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseId'));
		var totalProfit = 0;
		var totalCost = 0;
		for(var i = 0; i<purchaseObj.length;i++)
		{
			totalCost = Number(totalCost)+Number(purchaseObj[i].cost);
		}
		console.log(totalCost);
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
		obj.purchaseId = Session.get('purchaseId');
		obj.sellerId = sellerId;
		obj.date = today; 
		obj.totalCost = totalCost;
		obj.miscCost='';
		obj.paymentMode = $('#paymentOptions').val();
		obj.status='';
		
		var tempObj = temp.find().fetch();
		var plantObj = '';
		var newQuantity = '';
		for(var i=0;i<tempObj.length;i++)
		{
			plantObj = CodeBashApp.plantDetailsService.getInstance().findPlantById(tempObj[i].plantId);
			newQuantity = Number(plantObj[0].quantity) + Number(tempObj[i].quantity);
			CodeBashApp.plantDetailsService.getInstance().updatePlant(plantObj[0]._id,'','','','','',newQuantity,'');
		}
		for(var i=0;i<tempObj.length;i++)
		{
			console.log('removing items from temp');
			temp.remove(tempObj[i]._id);
		}
		CodeBashApp.purchaseService.getInstance().addPurchase(obj);
		Session.set('purchaseId','');
		Session.set('itemAdded','');		
	}
	/*"submit #confirmpurchase":function(event)
	{
		console.log("inside submit confirmpurchase");
		var sellerId =  $('#sellerId').val();
		var purchaseObj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseId'));
		var totalProfit = 0;
		var totalCost = 0;
		for(var i = 0; i<purchaseObj.length;i++)
		{
			totalCost = Number(totalCost)+Number(purchaseObj[i].cost);
		}
		console.log(totalCost);
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
		obj.purchaseId = Session.get('purchaseId');
		obj.sellerId = sellerId;
		obj.date = today; 
		obj.totalCost = totalCost;
		obj.miscCost='';
		obj.paymentMode = $('#paymentOptions').val();
		obj.status='';
		
		var tempObj = temp.find().fetch();
		var plantObj = '';
		var newQuantity = '';
		for(var i=0;i<tempObj.length;i++)
		{
			plantObj = CodeBashApp.plantDetailsService.getInstance().findPlantById(tempObj[i].plantId);
			newQuantity = Number(plantObj[0].quantity) + tempObj[i].quantity;
			CodeBashApp.plantDetailsService.getInstance().updatePlant(plantObj[0]._id,'','','','','',newQuantity,'');
		}
		for(var i=0;i<tempObj.length;i++)
		{
			console.log('removing items from temp');
			temp.remove(tempObj[i]._id);
		}
		CodeBashApp.purchaseService.getInstance().addpurchase(obj);
		Session.set('purchaseId','');
		Session.set('itemAdded','');		
		
	}*/
	
});
