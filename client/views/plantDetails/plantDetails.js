Template.navbar.onRendered(
	function()
	{
		var routeName = Router.current().route.getName();
		if(routeName == 'plantDetails')
		{
			$('#plantDetails').addClass('active');
		}
		if(routeName == 'invoiceDetailsLandingPage')
		{
			$('#invoiceDetailsLandingPage').addClass('active');
		}
		if(routeName == 'purchaseDetailsLandingPage')
		{
			$('#purchaseDetailsLandingPage').addClass('active');
		}
		if(routeName == 'sellerDetails' || routeName == 'buyerDetails')
		{
			$('#master').addClass('active');
		}
		if(routeName == 'sellerReports' || routeName == 'stockReports' || routeName == 'purchaseReports' || routeName == 'invoiceReports' || routeName == 'buyerReports')
		{
			$('#reports').addClass('active');
		}
		
	}
);

Template.plantDetailsTable.onRendered(
	function () 
	{
		CodeBashApp.plantDetailsOnReady();		
	}//end of function
);//end of onRendered

Template.plantDetailsTable.helpers({
	update:function(){
		if(Session.get('update') == 'true')
		{
			return true;
		}
	},       
	plantsList : function(){
					   
		plants = CodeBashApp.plantDetailsService.getInstance().findPlants();
		//console.log("plants id-- >" + plants);
		return plants;
	},
	categoryList:function()
	{
		return CodeBashApp.plantCategoryService.getInstance().findPlantCategory();
		//return PlantCategory.find();
	},
	typeList : function()
	{
		return CodeBashApp.plantTypeService.getInstance().findPlantType();
	},
	updateObject:function()
	{
		if(Session.get('id'))
		{
		 var obj = CodeBashApp.plantDetailsService.getInstance().findPlantById(Session.get('id'))[0];   
		}
		//console.log(obj);
		return obj;
	}
});

Template.plantDetailsTable.events({
	"click #dPlant":function()
	{
		//console.log('dPlant cliked');
		//console.log('id--->'+this._id);
		Session.set('deletePlantId',this._id);
		$("#deleteModal").modal("show");    
	},
	"click #addPlantDetails":function()
	{
		Session.set('add','true');
	},
	"submit #newPlantForm":function(event)
	{    
		event.preventDefault();    
		var validate = CodeBashApp.plantDetailsNewPlantValidate();       
		if(validate == 'true')
		{
		//console.log(event);
		var plantName = event.target.newPlantName.value;
		event.target.newPlantName.value = '';
		var plantType = event.target.newPlantType.value;
		event.target.newPlantType.value = '';
		var plantScientificName = event.target.newPlantScientificName.value;
		event.target.newPlantScientificName.value = '';
		var plantCategory = event.target.newPlantCategory.value;
		event.target.newPlantCategory.value ='';
		var plantComments = event.target.newPlantComments.value;
		//console.log(event.target.newPlantComments.value);
		//console.log(plantComments);
		event.target.newPlantComments.value ='';//(name,type,scientificName,category,cost,quantity,comments)
		var plantToBeAdded = CodeBashApp.plantDetailsVO(plantName,plantType,plantScientificName,plantCategory,plantComments);
		CodeBashApp.plantDetailsService.getInstance().addPlant(plantToBeAdded);     
		var plantObj = CodeBashApp.plantDetailsService.getInstance().findPlantByName(plantName);
		//console.log(plantObj);
		var obj = {};
		obj.plantId = plantObj[0]._id;
		obj.quantity = '0';
		obj.avgCost = '0';
		//console.log(obj);
		CodeBashApp.stockDetailsService.getInstance().addStock(obj);
		$("#new-plant").modal("hide");
		Router.current().render(Template.plantDetails);
		Router.current().render(Template.plantDetailsTable);
	  }
	
		  
		
	},
	"click #updateDetails":function()
	{
		//console.log('updateDetails click');
		//console.log('id--->'+this._id);
		Session.set('update','true');
		Session.set('id',this._id);        
		var obj = CodeBashApp.plantDetailsService.getInstance().findPlantById(Session.get('id'))[0];   
		$("#plantType").val(obj.type);
		$("#plantCategory").val(obj.category);
		$("#edit-plant").modal("show");
	},
	"submit #editPlantForm": function () {
		var validate = CodeBashApp.plantDetailsEditPlantValidate();
		if(validate=='true')
		{
			var flag = 1;
			var name = event.target.plantName.value;
			var plantType = event.target.plantType.value;
			var plantScientificName = event.target.plantScientificName.value;
			var plantCategory = event.target.plantCategory.value;
			var plantComments = event.target.plantComments.value;
			//console.log("id -->" + Session.get('id'));
			var obj = CodeBashApp.plantDetailsService.getInstance().findPlantById(Session.get('id'))[0];
			if(obj.name == name && obj.type == plantType && obj.scientificName == plantScientificName && obj.category == plantCategory)
			{
				flag = 0;
			}
			if(flag == 1)
			{
				CodeBashApp.plantDetailsService.getInstance().updatePlant(Session.get('id'),name,plantScientificName,plantType,plantCategory,plantComments);
				Session.set('update','');
				Session.set('id','');
				$("#edit-plant").modal("hide");
				event.target.plantName.value = '';
				event.target.plantType.value = '';
				event.target.plantScientificName.value = '';
				event.target.plantCategory.value = '';
				event.target.plantComments.value = '';
			}
			else
			{
                $("#editPlantSpan").html('Plant already exists');                
			}
		}
		return false;
	},
	"click #deletePlant":function(event){
		event.preventDefault();
		//console.log("delete id -->"+Session.get('deletePlantId'));
		CodeBashApp.stockDetailsService.getInstance().deleteStockByPlantId(Session.get('deletePlantId'));
		CodeBashApp.plantDetailsService.getInstance().deletePlant(Session.get('deletePlantId'));
		Session.set('deletePlantId','');
		$("#deleteModal").modal("hide");    
 		Router.current().render(Template.plantDetails);
 		Router.current().render(Template.plantDetailsTable);
		
	},
	'click #newplantmodal':function()
	{
		$("#new-plant").modal("show");
	},
	'click #newPlantCancel':function()
	{
		$("#newPlantName").val('');
		$("#newPlantNameGroup").removeClass('form-group has-error has-feedback');
		$("#newPlantNameGroup").addClass('form-group');
		$("#newPlantNameSpan").html('');

		$("#newPlantType").val('');
		$("#newPlantTypeGroup").removeClass('form-group has-error has-feedback');
		$("#newPlantTypeGroup").addClass('form-group');
		$("#newPlantTypeSpan").html('');
		
		$("#newPlantScientificName").val('');
		$("#newPlantScientificNameGroup").removeClass('form-group has-error has-feedback');
		$("#newPlantScientificNameGroup").addClass('form-group');
		$("#newPlantScientificNameSpan").html('');
		
		$("#newPlantCategory").val('');
		$("#newPlantCategoryGroup").removeClass('form-group has-error has-feedback');
		$("#newPlantCategoryGroup").addClass('form-group');
		$("#newPlantCategorySpan").html('');
		
		$("#newPlantComments").val('');
	},
	'click #editPlantCancel':function()
	{
		$("#plantNameGroup").removeClass('form-group has-error has-feedback');
		$("#plantNameGroup").addClass('form-group');
		$("#plantNameSpan").html('');
		$("#plantScientificNameGroup").removeClass('form-group has-error has-feedback');
		$("#plantScientificNameGroup").addClass('form-group');
		$("#plantScientificNameSpan").html('');
		var obj = CodeBashApp.plantDetailsService.getInstance().findPlantById(Session.get('id'))[0];   
		$("#plantName").val(obj.name);
		$("#plantScientificName").val(obj.scientificName);
		$("#plantComments").val(obj.comments);
		$("#plantType").val(obj.type);
		$("#plantCategory").val(obj.category);
	}

});