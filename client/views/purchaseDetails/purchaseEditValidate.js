CodeBashApp.purchaseEditValidate = function (plantName) {
	var obj = CodeBashApp.purchaseDetailsService.getInstance().findPurchaseByPurchaseDetailsId(Session.get('purchaseDetailsId'));
	var flag = 0;
	for(var i = 0;i<obj.length;i++)
	{
		var plantObj = CodeBashApp.plantDetailsService.getInstance().findPlantById(obj[i].plantId);
		
		if(plantObj[0].name == plantName)
		{
		flag = 1;
		console.log("invalid");
		break;
		}
	}
	if(flag == 1)
	{
		return false;
	}
	else
	{
		console.log("valide");
		return true;
	}
};