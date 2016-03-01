CodeBashApp.invoiceService = (function () {
  var instance;
  CodeBashApp.invoices = [];

  var init = function () {
      return {
          findInvoice: function()
          {
            return Invoice.find().fetch();
          },
          findInvoiceByInvoiceId:function(id)
          {
            return Invoice.find({"invoiceId":id}).fetch();
          },
        addInvoice:function (invoiceData) {
          console.log('------------invoiceService');
          console.log(invoiceData);
          return Invoice.insert(invoiceData);
        },
        deleteInvoice : function (invoiceId) {
          var nodeToBeDeleted = Invoice.findOne(invoiceId);
          Invoice.remove({_id: invoiceId});
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