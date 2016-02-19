CodeBashApp.salesDetailsService = (function () {
  var instance;
  CodeBashApp.saless = [];

  var init = function () {
      return {
          findsales: function()
          {
            return salesDetails.find().fetch();
          },
        addsales : function(salesData) {
          return salesDetails.insert(salesData);
        },
        deleteSales : function(salesId) {
          var nodeToBeDeleted = salesDetails.findOne(salesId);
          salesDetails.remove({_id: salesId});
        }
      }
  };

  var createInstance = function(){
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