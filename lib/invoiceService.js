CodeBashApp.invoiceService = (function () {
  var instance;
  CodeBashApp.invoices = [];

  var init = function () {
    return {
      findInvoiceById:function(id)
      {
        return Invoice.find({_id:id}).fetch();
      },
      findInvoiceByBuyerId:function(id)
      {
        return Invoice.find({"buyerId":id}).fetch();
      },
      findInvoiceByDeliveryStatus:function(status)
      {
        return Invoice.find({"status":"saved","deliveryStatus":status}).fetch();
      },
      findInvoice: function()
      {
        return Invoice.find().fetch();
      },
      findInvoiceByStatus: function(status)
      {
        return Invoice.find({"status":status}).fetch();
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
      updateInvoice:function(id,paymentStatus,deliveryStatus,status,invoiceId,totalProfit,totalSellingCost,tax)
      {
        console.log("inside invo update");
        if(id==null)
        {
         id = Invoice.find({"invoiceId":invoiceId}).fetch()[0]._id; 
       }
       if(deliveryStatus)
       {
        Invoice.update(id, {$set:{"deliveryStatus":deliveryStatus}});
      }
      if(paymentStatus)
      {
        Invoice.update(id, {$set:{"paymentStatus":paymentStatus}});
      }
      if(status)
      {
        Invoice.update(id, {$set:{"status":status}});
        console.log('status updated');
      }
      if(totalProfit)
      {
       Invoice.update(id, {$set:{"totalProfit":totalProfit}});
       console.log('profit updated');
     }
     if(totalSellingCost)
     {
      Invoice.update(id, {$set:{"totalCost":totalSellingCost}});
      console.log('totalSellingCost updated');
    }
    if(tax)
    {
      Invoice.update(id, {$set:{"tax":tax}});
      console.log('tax updated');
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