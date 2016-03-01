CodeBashApp.plantDetailsVO = function(name, type, scientificName, category, cost, quantity, comments){
   	var obj ={};
    obj.name = name;
    obj.type = type;
    obj.scientificName = scientificName;
    obj.category = category;
    obj.cost = cost;
    obj.quantity = quantity;
    obj.comments = comments;
    return obj;
};