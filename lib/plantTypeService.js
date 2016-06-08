//InvoiceDetails: invoiceid,  plantid, quantity, sellingCost, profit
CodeBashApp.plantTypeService = (function () {
  var instance;

  var init = function () {
      return {
          findPlantType: function()
          {
            return PlantType.find().fetch();
          },
        addPlantType : function (plantType) {
          console.log(plantType);
          return PlantType.insert(plantType);
        },
        deletePlantType:function(id)
        {
          var nodeToBeDeleted = InvoiceDetails.findOne(id);
          PlantType.remove({_id:id});
        },
        updatePlantType:function(id,plantType)
        {
         PlantType.update(id, {$set:{type:plantType}});
        },
        findPlantTypeById: function(id)
          {
            return PlantType.find({"_id":id}).fetch();
          },
          findPlantTypeCount: function()
          {
            return PlantType.find().count();
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