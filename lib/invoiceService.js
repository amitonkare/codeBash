CodeBashApp.invoiceService = (function () {
  var instance;
  CodeBashApp.invoices = [];

  var init = function () {
      return {
          findInvoiceById:function(id)
          {
            return Invoice.find({_id:id}).fetch();
          },
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
        },
        updateInvoice:function(id,paymentStatus,deliveryStatus)
        {
          if(deliveryStatus)
          {
            Invoice.update(id, {$set:{"deliveryStatus":deliveryStatus}});
          }
          if(paymentStatus)
          {
            Invoice.update(id, {$set:{"paymentStatus":paymentStatus}});
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