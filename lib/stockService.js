CodeBashApp.stockDetailsService = (function () {
  var instance;
  

  var init = function () {
      return {
          findStockByPlantId : function (plantId) {
           return StockDetails.find({"plantId":plantId}).fetch();
          },
          findStockById : function(id)
          {
            return StockDetails.find({_id:id}).fetch();
          }, 
          findStock: function()
          {
            return StockDetails.find().fetch();
          },
          addStock : function (plantData) {
          return StockDetails.insert(plantData);
        },
        updateStock: function (plantId,quantity,avgCost) {
          var key = CodeBashApp.stockDetailsService.getInstance().findStockByPlantId(plantId)[0]._id;
           if(quantity)
           {
            StockDetails.update(key, {$set:{quantity:quantity}});
           }
           if(avgCost)
           {
            StockDetails.update(key, {$set:{avgCost:avgCost}});
           }
        },
        deleteStock : function (id) {
          var nodeToBeDeleted = StockDetails.findOne(plantId);
          StockDetails.remove({_id: id});
        },
        deleteStockByPlantId:function(plantId)
        {
          var nodeToBeDeleted = StockDetails.findOne({"plantId":plantId});
          StockDetails.remove(nodeToBeDeleted._id);
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