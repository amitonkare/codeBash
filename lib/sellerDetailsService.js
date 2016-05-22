CodeBashApp.sellerDetailsService = (function () {
  var instance;
  CodeBashApp.sellers = [];

  var init = function () {
      return {
        findSellerById:function(id)
        {
          return SellerDetails.find({_id:id}).fetch();
        },
        findSellerByName : function (sellerName) {
           return SellerDetails.find({name : {'$regex' : sellerName}});
          }, 
          findSellerNameById:function(id)
          {
            return SellerDetails.find({"_id":id}).fetch();
          },
          findSeller: function()
          {
            return SellerDetails.find().fetch();
          },
          addSeller : function (sellerData) {
          return SellerDetails.insert(sellerData);
        },
        updateSeller : function (id,sellerName,sellerAddress,sellerPhoneNo,sellerEmailId,sellerBankName,branch,IFSC,accountNumber) {
          var key = id;
          if(sellerName)
          {
            SellerDetails.update(key,{$set:{name:sellerName}});
          }
          if(sellerAddress)
          {
           SellerDetails.update(key,{$set:{address:sellerAddress}}); 
          }
          if(sellerPhoneNo)
          {
            SellerDetails.update(key,{$set:{phoneNo:sellerPhoneNo}});
          }
          if(sellerEmailId)
          {
            SellerDetails.update(key,{$set:{emailId:sellerEmailId}});
          }
          if(sellerBankName)
          {
             
             var obj = SellerDetails.find({_id:id}).fetch();
             console.log(obj);
             var obj3 = obj[0];
             console.log(obj3);
             var ob2 = {};
             ob2.bankName = sellerBankName;
             ob2.branch = obj3.bankAccountDetails.branch;
             ob2.IFSCCode =  obj3.bankAccountDetails.IFSCCode;
             ob2.accountNumber = obj3.bankAccountDetails.accountNumber;
             console.log(ob2);
             SellerDetails.update(key,{$set:{bankAccountDetails:ob2}});
          }
          if(branch)
          {
             var obj = SellerDetails.find({_id:id}).fetch();
             console.log(obj);
             var obj3 = obj[0];
             console.log(obj3);
             var ob2 = {};
             ob2.bankName = obj3.bankAccountDetails.bankName;
             ob2.branch = branch;
             ob2.IFSCCode =  obj3.bankAccountDetails.IFSCCode;
             ob2.accountNumber = obj3.bankAccountDetails.accountNumber;
             console.log(ob2);
             SellerDetails.update(key,{$set:{bankAccountDetails:ob2}});          
          }
          if(IFSC)
          {
             var obj = SellerDetails.find({_id:id}).fetch();
             console.log(obj);
             var obj3 = obj[0];
             console.log(obj3);
             var ob2 = {};
             ob2.bankName = obj3.bankAccountDetails.bankName;
             ob2.branch = obj3.bankAccountDetails.branch;
             ob2.IFSCCode = IFSC;
             ob2.accountNumber = obj3.bankAccountDetails.accountNumber;
             console.log(ob2);
             SellerDetails.update(key,{$set:{bankAccountDetails:ob2}});          
          }
          if(accountNumber)
          {
             var obj = SellerDetails.find({_id:id}).fetch();
             console.log(obj);
             var obj3 = obj[0];
             console.log(obj3);
             var ob2 = {};
             ob2.bankName = obj3.bankAccountDetails.bankName;
             ob2.branch = obj3.bankAccountDetails.branch;
             ob2.IFSCCode = obj3.bankAccountDetails.IFSCCode;
             ob2.accountNumber = accountNumber;
             console.log(ob2);
             SellerDetails.update(key,{$set:{bankAccountDetails:ob2}});          
          }
        },
        deleteSeller : function (sellerId) {
          var nodeToBeDeleted = SellerDetails.findOne(sellerId);
          SellerDetails.remove({_id: sellerId});
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