CodeBashApp.plantDetailsVO = function(name, type, scientificName, category, cost, quantity, comments){
    this.name = name;
    this.type = type;
    this.scientificName = scientificName;
    this.category = category;
    this.cost = cost;
    this.quantity = quantity;
    this.comments = comments;
    return this;
};