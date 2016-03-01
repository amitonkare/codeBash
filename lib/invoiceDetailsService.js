//InvoiceDetails: invoiceid,  plantid, quantity, sellingCost, profit
CodeBashApp.invoiceDetailsService = (function () {
  var instance;
  CodeBashApp.invoices = [];

  var init = function () {
      return {
          findInvoiceDetails: function()
          {
            return InvoiceDetails.find().fetch();
          },
          findInvoiceByInvoiceDetailsId:function(id)
          {
            return InvoiceDetails.find({"invoiceId":id}).fetch();
          },
        addInvoiceDetails : function (invoiceData) {
          console.log(invoiceData);
          return InvoiceDetails.insert(invoiceData);
        },
        deleteInvoiceDetails : function (invoiceId) {
          var nodeToBeDeleted = InvoiceDetails.findOne(invoiceId);
          InvoiceDetails.remove({_id: invoiceId});
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