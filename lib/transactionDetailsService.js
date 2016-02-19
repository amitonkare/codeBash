array=[];
CodeBashApp.transactionDetailsService = (function () {
  var instance;
  CodeBashApp.transactions = [];

  var init = function () {
      return {
          findTransaction: function()
          {
            return TransactionDetails.find().fetch();
          },
        addTransaction : function (transactionData) {
          return TransactionDetails.insert(transactionData);
        },
        deleteTransaction : function (transactionId) {
          var nodeToBeDeleted = transactionDetails.findOne(transactionId);
          TransactionDetails.remove({_id: transactionId});
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