CodeBashApp.invoiceTotal = function(){
	var Contain='';
	$("#items :text").each(function(){
		Contain += $(this).val() + "+";
	});
	var array = Contain.split('+');
	console.log(array.length);
	var sellingCostArray=[];
	var quantityArray=[];
	var j=0,i,k=0;
	//quantityArray[0]
	for(i=0;i<array.length-1;i++)
	{
		if(i % 2==0)
		{
			quantityArray[j] = array[i];	
			j++;
		}
		else{
			sellingCostArray[k] = array[i];
			k++;
		}
	}
	var stockQuantity;
	var total= 0;
	for(i=0;i<quantityArray.length;i++)
	{
		total = total + (quantityArray[i]*sellingCostArray[i]);
	}	
	Session.set('total',total);
	


};