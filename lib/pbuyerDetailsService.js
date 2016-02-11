CodeBashApp.buyerDetailsService = (function () {
  var instance;
  CodeBashApp.buyers = [];

  var init = function () {
      return {
        findBuyerByName : function (buyerName) {
           return BuyerDetails.find({name : {'$regex' : buyerName}});
          }, 
          findBuyer: function()
          {
            return BuyerDetails.find().fetch();
          },
        addBuyer : function (buyerData) {
          return BuyerDetails.insert(buyerData);
        },
        updateBuyer : function (id,buyerName,buyerAddress,buyerPhoneNo,buyerEmailId,buyerBankName,branch,IFSC,accountNumber) {
          var key = id;
          if(buyerName)
          {
            BuyerDetails.update(key,{$set:{name:buyerName}});
          }
          if(buyerAddress)
          {
           BuyerDetails.update(key,{$set:{address:buyerAddress}}); 
          }
          if(buyerPhoneNo)
          {
            BuyerDetails.update(key,{$set:{phoneNo:buyerPhoneNo}});
          }
          if(buyerEmailId)
          {
            BuyerDetails.update(key,{$set:{emailID:buyerEmailId}});
          }
          if(buyerBankName)
          {
 
            BuyerDetails.update(key,{$set:{bankName:buyerBankName}});
          }
          if(branch)
          {
            BuyerDetails.update(key,{$set:{branch:branch}});
          }
          if(IFSC)
          {
           BuyerDetails.update(key,{$set:{IFSCCode:IFSC}}); 
          }
          if(accountNumber)
          {
           BuyerDetails.update(key,{$set:{accountNumber:accountNumber}});  
          }
        },
        deleteBuyer : function (buyerId) {
          var nodeToBeDeleted = BuyerDetails.findOne(buyerId);
          BuyerDetails.remove({_id: buyerId});
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