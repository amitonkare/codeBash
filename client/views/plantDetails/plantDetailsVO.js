CodeBashApp.plantDetailsVO = function(name,type,scientificName,category,comments){
   	var obj ={};
    obj.name = name;
    obj.type = type;
    obj.scientificName = scientificName;
    obj.category = category;
    obj.comments = comments;
    //console.log(comments);
    //console.log(obj.comments);
	//console.log(obj);
    return obj;
};