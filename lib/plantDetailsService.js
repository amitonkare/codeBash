CodeBashApp.plantDetailsService = (function () {
  var instance;

  var init = function () {
      return {
        findPlant : function (plantName) {
          return PlantDetails.find({name : plantName}).fetch();
        },
        addPlant : function (plantData) {
          return PlantDetails.insert(plantData);
        },
        updatePlant : function (id, $set) {
          var key = {_id: id};
          PlantDetails.update(key, {$set: $set});
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