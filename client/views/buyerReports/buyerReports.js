Template.buyerReports.onRendered(
  function () 
  {
    CodeBashApp.buyerReportsOnReady();
    Meteor.typeahead.inject();
    this.$('.datetimepicker').datetimepicker();
  }
  );

Template.buyerReports.helpers({
  grandTotal:function()
  {
    return Session.get('grandTotal');
  },
  buyerList:function()
  {
    return CodeBashApp.buyerDetailsService.getInstance().findBuyer();
  },
  plants:function() //auto-complete suggestions
  {   
    return CodeBashApp.plantDetailsService.getInstance().findPlants().map(function(it){ return it.name; });
  },
  typeList : function()
  {
    return PlantType.find();
  },
  invoiceList:function()
  {
    if(Session.get('buyerId2'))
    {
      var obj = CodeBashApp.invoiceService.getInstance().findInvoiceByBuyerId(Session.get('buyerId'));
      var sum= 0;
      for(var i = 0;i<obj.length;i++)
      {
        sum = sum + obj[i].totalCost;
      }
      Session.set('grandTotal',sum);
      return obj;
    }
    var array = [];
    var array2 = [];
    console.log('inside invoiceList');
    
    if(Session.get('filterDate') && Session.get('filtertype'))
    {
      console.log('date and type');
      console.log('inside filterDate and filtertype');
      var dates = Session.get('filterDate');
      dates = dates.split('+');
      var date1 = new Date(dates[0]);
      console.log("date1 obj -->"+date1);
      var date2 = new Date(dates[1]);
      if(date2 < date1)
      {
        $("#fromDateGroup").addClass('form-group has-error has-feedback');                 
        $("#fromDateSpan").html('please enter valid Date');                     
        $("#toDateGroup").addClass('form-group has-error has-feedback');                 
        $("#toDateSpan").html('please enter valid Date');                     
      }
      else
      {
        console.log("date2 obj -->"+date2);
        var obj = CodeBashApp.invoiceService.getInstance().findInvoiceByBuyerId(Session.get('buyerId'));
        for(var i=0;i<obj.length;i++)
        {     
          console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
          obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
        }
        var type = Session.get('filtertype'); 
        var id;
        var obj2 ;
        var plantId;
        var flag = 0;
        var k=0;
        var l=0;
        var obj2;
        var m;
        for(var i=0;i<obj.length;i++)
        {
          console.log('inside i loop');
          var date = CodeBashApp.invoiceService.getInstance().findInvoiceById(obj[i]._id)[0].date;
          console.log(date);
          date = date.substring(0,10);
          console.log(date);
          date = new Date(date);
          console.log('date object-->'+date);
          var flag =0;
          if(date >= date1 && date <= date2)
          {
            console.log('date is greater');
            flag = 1;
          }
          if(flag == 1)
          {
            console.log('dates checked');
            array[k] =  obj[i];
            k++;
          }
          flag = 0;
          for(var j=0;j<array.length;j++)     
          {
            obj2 = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(array[j].invoiceId);
            for(m = 0;m<obj2.length;m++)
            {
              if(CodeBashApp.plantDetailsService.getInstance().findPlantById(obj2[m].plantId)[0].type == type)
              {
                array2[l] = array[j];
                l++;
              }
            }
          }
        }
        var sum= 0;
        for(var i = 0;i<array2.length;i++)
        {
          sum = sum + array2[i].totalCost;
        }
        Session.set('grandTotal',sum);
        return array2;
      }
    }
    


    if(Session.get('filtertype'))
    {
      console.log('inside filtertype');
      var obj = CodeBashApp.invoiceService.getInstance().findInvoiceByBuyerId(Session.get('buyerId'));
      console.log(obj);
      for(var i=0;i<obj.length;i++)
      {     
        console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
        obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
      }
      var type = Session.get('filtertype');
      var id;
      var obj2 ;
      var plantId;
      var flag = 0;
      var k=0;
      for(var i=0;i<obj.length;i++)
      {
        console.log('inside i loop');
        id = obj[i].invoiceId;
        obj2 = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(id);
        for(var j=0;j<obj2.length;j++)
        {
          console.log('inside j loop');
          plantId = obj2[j].plantId;

          if(CodeBashApp.plantDetailsService.getInstance().findPlantById(plantId)[0].type == type)
          {
            console.log('elemtn inserted');
            array[k] =  obj[i];
            k++;
          }
        }
      }
      console.log(array);
      var sum= 0;
      for(var i = 0;i<array.length;i++)
      {
        sum = sum + array[i].totalCost;
      }
      Session.set('grandTotal',sum);
      return array;
    }
    if(Session.get('filterName'))
    {
      console.log('inside filterName');
      var obj = CodeBashApp.invoiceService.getInstance().findInvoiceByBuyerId(Session.get('buyerId'));
      for(var i=0;i<obj.length;i++)
      {     
        console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
        obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
      }
      var name = Session.get('filterName');
      var id;
      var obj2 ;
      var plantId;
      var flag = 0;
      var k=0;
      for(var i=0;i<obj.length;i++)
      {
        console.log('inside i loop');
        id = obj[i].invoiceId;
        obj2 = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(id);
        for(var j=0;j<obj2.length;j++)
        {
          console.log('inside j loop');
          plantId = obj2[j].plantId;

          if(CodeBashApp.plantDetailsService.getInstance().findPlantById(plantId)[0].name == name)
          {
            console.log('elemtn inserted');
            array[k] =  obj[i];
            k++;
          }
        }
      }
      console.log(array);
      var sum= 0;
      for(var i = 0;i<array.length;i++)
      {
        sum = sum + array[i].totalCost;
      }
      Session.set('grandTotal',sum);
      return array;
    }
    if(Session.get('filterDate'))
    {

      console.log('inside filterDate');
      var dates = Session.get('filterDate');
      dates = dates.split('+');
      var date1 = new Date(dates[0]);
      console.log("date1 obj -->"+date1);
      var date2 = new Date(dates[1]);
      console.log("date2 obj -->"+date2);
      if(date2 < date1)
      {
        $("#fromDateGroup").addClass('form-group has-error has-feedback');                 
        $("#fromDateSpan").html('please enter valid Date');                     
        $("#toDateGroup").addClass('form-group has-error has-feedback');                 
        $("#toDateSpan").html('please enter valid Date');                     
      }
      else{
        var obj = CodeBashApp.invoiceService.getInstance().findInvoiceByBuyerId(Session.get('buyerId'));
        for(var i=0;i<obj.length;i++)
        {     
          console.log(CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name);
          obj[i].buyerId = CodeBashApp.buyerDetailsService.getInstance().findBuyerById(obj[i].buyerId)[0].name;
        }
        
        var id;
        var obj2 ;
        var plantId;
        var flag = 0;
        var k=0;
        for(var i=0;i<obj.length;i++)
        {
          console.log('inside i loop');
          var date = CodeBashApp.invoiceService.getInstance().findInvoiceById(obj[i]._id)[0].date;
          console.log(date);
          date = date.substring(0,10);
          console.log(date);
          date = new Date(date);
          console.log('date object-->'+date);
          var flag = 0;
          if(date >= date1 && date <= date2) 
          {
            flag = 1;
          }
          if(flag == 1)
          {
            console.log('dates checked');
            array[k] =  obj[i];
            k++;
          }
          flag = 0;
        }
        var sum= 0;
        for(var i = 0;i<array.length;i++)
        {
          sum = sum + array[i].totalCost;
        }
        Session.set('grandTotal',sum);
        return array;
      }
    }



  },
  reportTitle:function()
  {
    if(Session.get('buyerId'))
    {
      return CodeBashApp.buyerDetailsService.getInstance().findBuyerNameById(Session.get('buyerId'))[0].name;
    }
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

},
'click #buyerReportId':function()
{
  Session.set('buyerId',this._id);
  Session.set('buyerId2',this._id);
  $("#reportModal").modal("show");
  $("#reportModal").css(".modal-dialog {width:75%;}");
},

'click #search':function()
{
  Session.set('buyerId2','');
  if($("#fromDate").val() && $("#toDate").val() && $("#plantType").val())
  {
    console.log('date and type');
    Session.set('filterDate',$("#fromDate").val() +"+"+ $("#toDate").val());
    Session.set('filtertype',$("#plantType").val());  
    console.log('dates set--->'+Session.get('filterDate'));
  }
  if($("#plantType").val())
  {
    Session.set('filtertype',$("#plantType").val());
  }
  if($("#plantName").val())
  {
    Session.set('filterName',$("#plantName").val());
  }
  if($("#fromDate").val() && $("#toDate").val())
  {
    Session.set('filterDate',$("#fromDate").val() +"+"+ $("#toDate").val());

    console.log('dates set--->'+Session.get('filterDate'));

  }
  
},
"click #closeReports":function()
{
  Session.set('filterDate','');
  Session.set('filtertype','');  
  Session.set('filterName','');
  Session.set('grandTotal','');
  $("#plantName").val(''); 
  Session.set('buyerId','');
  Session.set('buyerId2','');
},
"click #fromDate":function()
{
  $('#fromDateIcon').click();
  $("#fromDateGroup").addClass('form-group');                 
  $("#fromDateSpan").html('');                      
  $("#toDateGroup").addClass('form-group');                 
  $("#toDateSpan").html('');                      
},
"click #toDate":function()
{
  $('#toDateIcon').click();
  $("#fromDateGroup").addClass('form-group');                 
  $("#fromDateSpan").html('');                      
  $("#toDateGroup").addClass('form-group');                 
  $("#toDateSpan").html('');
},
'click #fromDateIcon':function()
{
  $("#fromDateGroup").addClass('form-group');                 
  $("#fromDateSpan").html('');                      
  $("#toDateGroup").addClass('form-group');                 
  $("#toDateSpan").html('');                      
},
'click #toDateIcon':function()
{
  $("#fromDateGroup").addClass('form-group');                   
  $("#fromDateSpan").html('');                      
  $("#toDateGroup").addClass('form-group');                 
  $("#toDateSpan").html('');                      
}


});
