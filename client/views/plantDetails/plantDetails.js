
Template.searchPlant.helpers({
    types : function(){
        var obj=[];
        obj.push({type:" "});
        obj.push({type:"flowering"});
        obj.push({type:"fruiting"});
        return obj;
    },
});


Template.searchPlant.events({
    "click #searchPlant": function (event) {
        event.preventDefault();
        var searchKey = $("#key").val();
        var searchType = $("#type").val();
        Session.set('searchKey',searchKey);
        Session.set('searchType',searchType);
        console.log(Session.get('searchKey'));
    }
});

Template.plantDetails.events({
});

Template.plantDetails.helpers({
    getHeaderName: function () {
        return "Plant Details";
    }
});

Template.plantDetailsTable.events({
    "click #updateDetails":function()
    {
        Session.set('update','true');
        Session.set('id',this._id);
    },
    "click #updatePlant": function () {
        var name = $("#plantName").val();
        plantType = $("#plantType").val();
        plantScientificName = $("#plantScientificName").val();
        plantCategory = $("#plantCategory").val();
        plantCost = $("#plantCost").val();
        plantQuantity = $("#plantQuantity").val();
        console.log("id -->" + Session.get('id'));
        CodeBashApp.plantDetailsService.getInstance().updatePlant(Session.get('id'),name,plantScientificName,plantType,plantCategory,plantCost,plantQuantity);
        Session.set('update','');
        Session.set('id','');
    },
    "click #deletePlant": function () {
        CodeBashApp.plantDetailsService.getInstance().deletePlant(this._id);
    }
});

Template.plantDetailsTable.helpers({
    update:function(){
        if(Session.get('update') == 'true')
        {
            return true;
        }
    },   
    plantsList : function(){
         if(Session.get('searchKey')) 
         {              
         plants = CodeBashApp.plantDetailsService.getInstance().findPlantByName(Session.get('searchKey')); 
         return plants;
        }
        if(Session.get('searchType'))
        {
         plants = CodeBashApp.plantDetailsService.getInstance().findPlantByType(Session.get('searchType')); 
         return plants;   
        }                  
    }
});