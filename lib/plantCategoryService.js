//InvoiceDetails: invoiceid,  plantid, quantity, sellingCost, profit
CodeBashApp.plantCategoryService = (function () {
  var instance;

  var init = function () {
      return {
          findPlantCategory: function()
          {
            return PlantCategory.find().fetch();
          },
        addPlantCategory : function (plantCategory) {
          console.log(plantCategory);
          return PlantCategory.insert(plantCategory);
        },
        deletePlantCategory:function(id)
        {
          var nodeToBeDeleted = InvoiceDetails.findOne(id);
          PlantCategory.remove({_id:id});
        },
        updatePlantCategory:function(id,plantCategory)
        {
         PlantCategory.update(id, {$set:{category:plantCategory}});
        },
        findPlantCategoryById: function(id)
          {
            return PlantCategory.find({"_id":id}).fetch();
          },
          findPlantCategoryCount: function()
          {
            return PlantCategory.find().count();
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