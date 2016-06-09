 if (PlantDetails.find().count() === 0) {
 	console.log("Importing private/plantDetails.json to db");

 	var data = JSON.parse(Assets.getText("plantDetails.json"));
 	console.log(data);

 	data.forEach(function (item, index, array) {
 		PlantDetails.insert(item);	
 	})
 	var plantDetailsObj = PlantDetails.find().fetch();
 		var obj = {};
 		for(var i = 0; i<plantDetailsObj.length;i++)
 		{ 			
 			obj.plantId = plantDetailsObj[i]._id;
 			obj.quantity = '0';
 			obj.avgCost = '0';
 			StockDetails.insert(obj);
 			obj = {};
 		}
 }

if(BuyerDetails.find().count() === 0){
 	console.log("Importing private/buyerDetails.json to db");

 	var data = JSON.parse(Assets.getText("buyerDetails.json"));
 	console.log(data);

 	data.forEach(function (item, index, array) {
 		BuyerDetails.insert(item);
 	})

}

if(SellerDetails.find().count() === 0){
 	console.log("Importing private/sellerDetails.json to db");
 	var data = JSON.parse(Assets.getText("sellerDetails.json"));
 	console.log(data);

 	data.forEach(function (item, index, array) {
 		SellerDetails.insert(item);
 	})
}

if(PlantCategory.find().count() === 0){
 	console.log("Importing private/plantCategory.json to db");
 	var data = JSON.parse(Assets.getText("plantCategory.json"));
 	console.log(data);

 	data.forEach(function (item, index, array) {
 		PlantCategory.insert(item);
 	})
}

if(PlantType.find().count() === 0){
 	console.log("Importing private/plantType.json to db");
 	var data = JSON.parse(Assets.getText("plantType.json"));
 	console.log(data);

 	data.forEach(function (item, index, array) {
 		PlantType.insert(item);
 	})
}
