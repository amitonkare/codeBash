//purchaseDetails: purchaseid,  plantid, quantity, sellingCost, profit
CodeBashApp.purchaseDetailsService = (function () {
  var instance;
  CodeBashApp.purchases = [];

  var init = function () {
      return {
          findPurchaseDetails: function()
          {
            return PurchaseDetails.find().fetch();
          },
          findPurchaseByPurchaseDetailsId:function(id)
          {
            return PurchaseDetails.find({"purchaseId":id}).fetch();
          },
        addPurchaseDetails : function (purchaseData) {
          console.log(purchaseData);
          return PurchaseDetails.insert(purchaseData);
        },
        deletePurchaseDetails : function (purchaseId) {
          var nodeToBeDeleted = PurchaseDetails.findOne(purchaseId);
          PurchaseDetails.remove({_id: purchaseId});
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