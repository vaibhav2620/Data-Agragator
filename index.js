const { write } = require("fs");
var http  = require("http");
var request = require("request");

var request_body = undefined;



function createhtmlstringFromJson(retrievedData){
    var html_string ="<html>\n<head>\n<title>Data aggregator </title>\n \n <header> \n <body>\n <table> ";


    html_string += "<tr>";
     for (var attribute in retrievedData[0]){
         if(typeof retrievedData[0][attribute] !== 'object'){
            html_string += "<td>" + attribute + "</td>\n";
         }
     }
     html_string += "</tr>\n";


    retrievedData.forEach(function(object) {

        html_string += "<tr>\n";
            for (var attribute in retrievedData[0]){
                if(typeof object[attribute] !== 'object'){
                        html_string += "<td>" + object[attribute] + "</td>\n";
                    }
            }
        html_string += "</tr>\n";
    })


    html_string+="</table>\n</body>\n</html>";
    return html_string;
}



request("https://api.oireachtas.ie/v1/divisions", function(err,request_res, body ){

request_body = body;


});

http.createServer(function (req ,res){
 if(request_body){
     res.writeHead(200,{"Content-type":"text/html"});
     res.end(createhtmlstringFromJson(JSON.parse(request_body)));
    }
    else{
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("The response is not ready yet ");
    }
}).listen(8080);