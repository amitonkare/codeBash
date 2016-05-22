CodeBashApp.buyerDetailsService = (function () {
  var instance;
  CodeBashApp.buyers = [];

  var init = function () {
      return {
        findBuyerById:function(id)
        {
          return BuyerDetails.find({_id:id}).fetch();
        },
        findBuyerByName : function (buyerName) {
           return BuyerDetails.find({name : {'$regex' : buyerName}});
          }, 
          findBuyerNameById:function(id)
          {
            return BuyerDetails.find({"_id":id}).fetch();
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
            BuyerDetails.update(key,{$set:{emailId:buyerEmailId}});
          }
          if(buyerBankName)
          {
             
             var obj = BuyerDetails.find({_id:id}).fetch();
             console.log(obj);
             var obj3 = obj[0];
             console.log(obj3);
             var ob2 = {};
             ob2.bankName = buyerBankName;
             ob2.branch = obj3.bankAccountDetails.branch;
             ob2.IFSCCode =  obj3.bankAccountDetails.IFSCCode;
             ob2.accountNumber = obj3.bankAccountDetails.accountNumber;
             console.log(ob2);
             BuyerDetails.update(key,{$set:{bankAccountDetails:ob2}});
          }
          if(branch)
          {
             var obj = BuyerDetails.find({_id:id}).fetch();
             console.log(obj);
             var obj3 = obj[0];
             console.log(obj3);
             var ob2 = {};
             ob2.bankName = obj3.bankAccountDetails.bankName;
             ob2.branch = branch;
             ob2.IFSCCode =  obj3.bankAccountDetails.IFSCCode;
             ob2.accountNumber = obj3.bankAccountDetails.accountNumber;
             console.log(ob2);
             BuyerDetails.update(key,{$set:{bankAccountDetails:ob2}});
          
          }
          if(IFSC)
          {
             var obj = BuyerDetails.find({_id:id}).fetch();
             console.log(obj);
             var obj3 = obj[0];
             console.log(obj3);
             var ob2 = {};
             ob2.bankName = obj3.bankAccountDetails.bankName;
             ob2.branch = obj3.bankAccountDetails.branch;
             ob2.IFSCCode = IFSC;
             ob2.accountNumber = obj3.bankAccountDetails.accountNumber;
             console.log(ob2);
             BuyerDetails.update(key,{$set:{bankAccountDetails:ob2}});          
          }
          if(accountNumber)
          {
             var obj = BuyerDetails.find({_id:id}).fetch();
             console.log(obj);
             var obj3 = obj[0];
             console.log(obj3);
             var ob2 = {};
             ob2.bankName = obj3.bankAccountDetails.bankName;
             ob2.branch = obj3.bankAccountDetails.branch;
             ob2.IFSCCode = obj3.bankAccountDetails.IFSCCode;
             ob2.accountNumber = accountNumber;
             console.log(ob2);
             BuyerDetails.update(key,{$set:{bankAccountDetails:ob2}});          
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