var express = require('express');
var app = express();
var http = require('http');
var url = require('url');

//app.get('/*', function(req, res){
//    res.send('dniwe');
//    res.end();
//});

function parse(regex, flags, urlString, callback){
    try {
//        var req = http.request(url.parse(urlString),function(response){
//            console.log(response);
//            callback(null, response);
//        });
//        req.on('error', function(e) {
//            console.log('problem with request: ' + e.message);
//            callback(new Error(),{error: e.message});
//        });
        var regex = new RegExp(regex, flags);
        http.get(urlString, function(res) {
            var body = '';
            res.on('data', function (chunk) {
                body+=chunk;
            });
            res.on('end', function () {
                console.log(body);
                //body=body.split('\r\n').join('');
                //body=body.split('\n').join('');
                var data = body.match(regex);
                callback(null, JSON.stringify({data: data}));
            });
        }).on('error', function(e) {
                console.log('problem with request: ' + e.message);
                callback(new Error(),{error: e.message});
            });
    } catch(e) {
        console.log(e);
        callback(new Error(),{error: 'invalid regex or url'});
    }
}

app.get('/:regex/:flags/:url?', function(req, res){
    console.log(req.params.regex, req.params.flags, req.params.url);
    //console.log(url.parse(req.params.url));

    parse(req.params.regex, req.params.flags, req.params.url, function(err, obj){
        res.send(obj);
        res.end();
    })
});



//app.get('/', function(req, res){
//    res.send('hello world');
//});

app.listen(3000);