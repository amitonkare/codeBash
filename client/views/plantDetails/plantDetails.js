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
    "click #updatePlant": function () {
        CodeBashApp.plantDetailsService.getInstance().updatePlant();
    },
    "click #deletePlant": function () {
        CodeBashApp.plantDetailsService.getInstance().deletePlant();
    }
});

Template.plantDetailsTable.helpers({
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