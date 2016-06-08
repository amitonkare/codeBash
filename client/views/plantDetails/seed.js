CodeBashApp.seed = function(){
	console.log("inside seed");
	if(CodeBashApp.plantTypeService.getInstance().findPlantTypeCount() == 0)
	{
		console.log(CodeBashApp.plantTypeService.getInstance().findPlantTypeCount());
		var plantTypeObj = [{type:"indoor"},{type:"outdoor"}];
		 plantTypeObj.forEach(function (item, index, array) {
         CodeBashApp.plantTypeService.getInstance().addPlantType(item);
        })
	}
	var plantCategoryObj;
	if(CodeBashApp.plantCategoryService.getInstance().findPlantCategoryCount() == 0)
	{
		console.log(CodeBashApp.plantCategoryService.getInstance().findPlantCategoryCount());
		plantCategoryObj = [{ category : "fruiting" },{ category : "flowering" },{ category : "medicinal" }];
		 plantCategoryObj.forEach(function (item, index, array) {
         CodeBashApp.plantCategoryService.getInstance().addPlantCategory(item);
        })
		
	}
	var plantDetailsObj;
	if(CodeBashApp.plantDetailsService.getInstance().findPlantCount() == 0)
	{
		console.log(CodeBashApp.plantDetailsService.getInstance().findPlantCount());
		plantDetailsObj = [{ "name" : "apple", "type" : "indoor", "scientificName" : "safarchand", "category" : "fruiting", "comments" : "red" },
		{ "name" : "mango", "type" : "indoor", "scientificName" : "aamba", "category" : "fruiting", "comments" : "king of fruits" },
		{  "name" : "jasmine", "type" : "outdoor", "scientificName" : "mogra", "category" : "flowering", "comments" : "smells nice" }];

		 plantDetailsObj.forEach(function (item, index, array) {
         CodeBashApp.plantDetailsService.getInstance().addPlant(item);
        })
	
		
	}	
};