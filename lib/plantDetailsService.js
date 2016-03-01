CodeBashApp.plantDetailsService = (function () {
  var instance;
  CodeBashApp.plants = [];

  var init = function () {
      return {
        findPlantByScientificName:function(name)
        {
          console.log("search result-->"+JSON.stringify(PlantDetails.find({scientificName:name}).fetch()));
          return PlantDetails.find({"scientificName":name}).fetch();
        },
        findPlantByName : function (plantName) {
           return PlantDetails.find({name : {'$regex' : plantName}});
          },
          findPlantById : function(id)
          {
            return PlantDetails.find({_id:id}).fetch();
          }, 
          findPlants: function()
          {
            return PlantDetails.find().fetch();
          },
        findPlantByType : function (plantType) {
            return PlantDetails.find({type:plantType}) ;
          },     
        addPlant : function (plantData) {
          return PlantDetails.insert(plantData);
        },
        updatePlant : function (id,uname,plantScientificName,plantType,plantCategory,plantCost,plantQuantity,plantComments) {
          var key = id;
          if(uname)
          {
          PlantDetails.update(key, {$set:{name:uname}});
           }
           if(plantScientificName)
           {
            PlantDetails.update(key, {$set:{scientificName:plantScientificName}});
           }
           if(plantType)
           {
            PlantDetails.update(key, {$set:{type:plantType}});
           }
           if(plantCategory)
           {
            PlantDetails.update(key, {$set:{category:plantCategory}});
           }
           if(plantCost)
           {
            PlantDetails.update(key, {$set:{cost:plantCost}});
            CodeBashApp.stockDetailsService.getInstance().updateStock(key,plantQuantity,plantCost);
           }
           if(plantQuantity)
           {
            PlantDetails.update(key, {$set:{quantity:plantQuantity}});
            CodeBashApp.stockDetailsService.getInstance().updateStock(key,plantQuantity,plantCost);
           }
           if(plantComments)
           {
            PlantDetails.update(key, {$set:{comments:plantComments}});
           }
        },
        deletePlant : function (plantId) {
          var nodeToBeDeleted = PlantDetails.findOne(plantId);
          PlantDetails.remove({_id: plantId});
        }
      }
  };

  var createInstance = function () {
    var object = new init();
    return object;
  };

  return {
    getInstance : function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();