Template.plantReports.onRendered(function(){
});


Template.plantReports.helpers({
	plantList:function()
	{
		return CodeBashApp.plantDetailsService.getInstance().findPlants();
	}
});


Template.plantReports.events({
	'click #search':function()
    {
        var obj = CodeBashApp.invoiceService.getInstance().findInvoice();
        var name = $('#plantName').val();
        var id;
        var obj2 ;
        var plantId;
        var flag = 0;
        var k=0;
        var l=0;
        var obj2;
        var m;
        var quantityArray = [];
        var array=[];
        var array2 = [];
        var month = $('#month').val();
        for(var i=0;i<obj.length;i++)
        {
                // console.log('inside i loop');
                var date = CodeBashApp.invoiceService.getInstance().findInvoiceById(obj[i]._id)[0].date;
                // console.log(date);
                date = date.substring(0,10);
                // console.log(date);
                date = new Date(date);
                // console.log('date object-->'+date);
                var flag =0;
                //console.log('month--->'+month);
                //console.log('date.getMonth()--->'+date.getMonth());
                
                if(Number(date.getMonth()+1) == month)
                {   
                    flag = 1;
                    console.log('dates checked');
                }
                if(flag == 1)
                {
                    // console.log('dates checked');
                    array[k] =  obj[i];
                    k++;
                }
                flag = 0; 
            }
            //console.log("array--->"+array);
            for(var j=0;j<array.length;j++)         
            {
                obj2 = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(array[j].invoiceId);
                console.log(obj2);
                for(m = 0;m<obj2.length;m++)
                {
                    if(CodeBashApp.plantDetailsService.getInstance().findPlantById(obj2[m].plantId)[0].name == name)
                    {
                        array2[l] = array[j];
                        l++;                         
                    }                        
                }
            }

            for(var x =0;x<31;x++)
            {
                quantityArray[x] = 0;
            }
            //console.log("array2--->"+array2);
            for(m=0;m<array2.length;m++)
            {
                obj2 = CodeBashApp.invoiceDetailsService.getInstance().findInvoiceByInvoiceDetailsId(array2[m].invoiceId);
                date = CodeBashApp.invoiceService.getInstance().findInvoiceById(array2[m]._id)[0].date;
                console.log("date from invoice -->"+date)
                console.log(date.substring(3,5));
                //console.log(obj2.length);
                for(k=0;k<obj2.length;k++)
                {
                    if(CodeBashApp.plantDetailsService.getInstance().findPlantById(obj2[k].plantId)[0].name == name)
                    {
                        console.log(obj2[k].quantity);
                        if(quantityArray[Number(date.substring(3,5))-1] != 0)
                        {
                            quantityArray[Number(date.substring(3,5))-1] = quantityArray[Number(date.substring(3,5))-1] + Number(obj2[k].quantity);
                        }
                        else
                        {
                            quantityArray[Number(date.substring(3,5))-1] = Number(obj2[k].quantity); 
                        }

                    }

                }
            }

            for(var x =0;x<31;x++)
            {
                quantityArray[x];
            }
            console.log('quantityArray--->'+quantityArray);    
           




            $(function ()
            {


                $('#container').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: name+" Monthly Reports"
                    },
                    subtitle: {
                        text:''
                    },
                    xAxis: {
                        categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                        title: {
                            text: 'Days'
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Quantity',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' '
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 80,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'quantity ',
                        data: quantityArray
                    }]
                });
});

}

});