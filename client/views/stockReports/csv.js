CodeBashApp.saveCSV = function(csvContent,div){
	var content = csvContent;

	var finalVal = '';

	for(var i = 0; i < content.length; i++) {
    var value = content[i];

    for(var j = 0; j < value.length; j++) {
        var innerValue =  value[j]===null?'':value[j].toString();
        var result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0)
            result = '"' + result + '"';
        if (j > 0)
            finalVal += ',';
        finalVal += result;
    }

    finalVal += '\n';
}

console.log(finalVal);
/*
var download = document.getElementById(div);
download.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(finalVal));
download.setAttribute(div, 'test.csv');
*/
/*
parser=new DOMParser();
xmlDoc=parser.parseFromString(xml,"text/xml");
var fso = new ActiveXObject("Scripting.FileSystemObject");
var a = fso.CreateTextFile("c:\\testfile.txt", true);
a.WriteLine("This is a test.");
a.Close();
*/
 window.open('data:text/csv;charset=utf-8,' + escape(finalVal));
};