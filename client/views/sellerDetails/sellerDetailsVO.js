CodeBashApp.sellerDetailsVO = function(name,address,phoneNo,emailId,bankName,branch,IFSCCode,accountNumber){
    var obj = {};
    obj.name = name;
    obj.address = address;
    obj.phoneNo = phoneNo;
    obj.emailId = emailId;
    obj.bankAccountDetails = {};
    obj.bankAccountDetails.bankName = bankName;
    obj.bankAccountDetails.branch = branch;
    obj.bankAccountDetails.IFSCCode = IFSCCode
    obj.bankAccountDetails.accountNumber = accountNumber;
    console.log("value object-->" + obj);
    return obj;
};