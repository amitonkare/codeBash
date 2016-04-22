CodeBashApp.printdiv = function(printdivname,route)
{
var headstr = "<html><head><title></title></head><body>";
var footstr = "</body>";
var newstr = document.getElementById(printdivname).innerHTML;
var oldstr = document.body.innerHTML;
document.body.innerHTML = headstr+newstr+footstr;
window.print();
document.body.innerHTML = oldstr;
return false;
Router.go('/'+route);
}