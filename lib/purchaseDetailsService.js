CodeBashApp.purchaseDetailsService = (function () {
  var instance;
  CodeBashApp.purchases = [];

  var init = function () {
      return {
          findPurchase: function()
          {
            return purchaseDetails.find().fetch();
          },
        addPurchase : function (purchaseData) {
          return PurchaseDetails.insert(purchaseData);
        },
        deletePurchase : function (purchaseId) {
          var nodeToBeDeleted = purchaseDetails.findOne(purchaseId);
          purchaseDetails.remove({_id: purchaseId});
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