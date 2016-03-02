CodeBashApp.purchaseService = (function () {
  var instance;
  CodeBashApp.Purchases = [];

  var init = function () {
      return {
          findPurchase: function()
          {
            return Purchase.find().fetch();
          },
          findPurchaseByPurchaseId:function(id)
          {
            return Purchase.find({"PurchaseId":id}).fetch();
          },
        addPurchase:function (purchaseData) {
          console.log('------------purchaseService');
          console.log(purchaseData);
          return Purchase.insert(purchaseData);
        },
        deletePurchase : function (purchaseId) {
          var nodeToBeDeleted = Purchase.findOne(purchaseId);
          Purchase.remove({_id: purchaseId});
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