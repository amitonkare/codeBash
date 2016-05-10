Template.buyerReports.onRendered(
    function () 
    {
    CodeBashApp.buyerReportsOnReady();
    }
);

Template.buyerReports.helpers({
  buyerList:function()
  {
    return CodeBashApp.buyerDetailsService.getInstance().findBuyer();
  }
});

Template.buyerReports.events({
  'click #printBuyerReports':function(){
    CodeBashApp.printdiv("buyerReports","buyerReports"); 
    $("#maindiv").remove();
    Router.current().render(Template.buyerReports);
  },
  'click #buyerReportsCSV':function(){
    var array = CodeBashApp.buyerDetailsService.getInstance().findBuyer();
    var dataArray = [];
    var stringArray = [];
    for(var i=0;i<array.length;i++)
    {
       stringArray.push(array[i]._id);
       stringArray.push(array[i].name);
       stringArray.push(array[i].address);
       stringArray.push(array[i].phoneNo);
       stringArray.push(array[i].emailId);
       stringArray.push(array[i].bankAccountDetails.bankName);
       stringArray.push(array[i].bankAccountDetails.branch);
       stringArray.push(array[i].bankAccountDetails.IFSCCode);
       stringArray.push(array[i].bankAccountDetails.accountNumber);
       dataArray[i] = stringArray;
       stringArray=[];
    }
    console.log("data array of csv--->" + dataArray);
    CodeBashApp.saveCSV(dataArray,'buyerReports');

  },
  'click #buyerReportsPDF':function()
  {    
    var specialElementHandlers = {
    '#buyerReports': function (element, renderer) {
        return true;
      }
    };
   var doc = new jsPDF();
   doc.fromHTML($('#buyerReports').html(), 15, 15, {
        'width': 1000,
            'elementHandlers': specialElementHandlers
    });
    doc.save('buyerReports.pdf');

  }

});
