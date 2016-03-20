CodeBashApp.purchaseService = (function () {
  var instance;
  CodeBashApp.Purchases = [];

  var init = function () {
      return {
          findPurchaseByStatus: function(status)
          {
            return Purchase.find({"status":status}).fetch();
          },
          findPurchase: function()
          {
            return Purchase.find().fetch();
          },
          findPurchaseById: function(id)
          {
            console.log("inside purchaseService"+id);
            console.log(Purchase.find({_id:id}).fetch());
            return Purchase.find({_id:id}).fetch();
          },
          findPurchaseByPurchaseId:function(id)
          {
            return Purchase.find({"purchaseId":id}).fetch();
          },
        addPurchase:function (purchaseData) {
          console.log('------------purchaseService');
          console.log(purchaseData);
          return Purchase.insert(purchaseData);
        },
        deletePurchase : function (purchaseId) {
          var nodeToBeDeleted = Purchase.findOne(purchaseId);
          Purchase.remove({_id: purchaseId});
        },
        updatePurchase: function(id,purchaseId,paymentStatus,deliveryStatus,totalCost,status)
        {
          if(purchaseId)
          {
            id = Purhase.find({"purchaseId":purchaseId}).fetch()[0]._id;
          }
          if(deliveryStatus)
          {
            Purchase.update(id, {$set:{"deliveryStatus":deliveryStatus}});
          }
          if(paymentStatus)
          {
            Purchase.update(id, {$set:{"paymentStatus":paymentStatus}});
          }
          if(totalCost)
          {
           Purchase.update(id, {$set:{"totalCost":totalCost}}); 
          }
          if(status)
          {
           Purchase.update(id, {$set:{"status":status}}); 
          }
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