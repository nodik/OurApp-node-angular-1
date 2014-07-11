var express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http'),
    url = require('url');

app.use(express.static(path.join(__dirname, 'part2'))); //  "public" off of current is root

function parse(regex, flags, urlString, callback){
    try {
        var regex = new RegExp(regex, flags);
        http.get(urlString, function(res) {
            var body = '';
            res.on('data', function (chunk) {
                body+=chunk;
            });
            res.on('end', function () {               
               
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

    parse(req.params.regex, req.params.flags, req.params.url, function(err, obj){
        res.send(obj);
        res.end();
    })
});

app.listen(8080);
console.log('Listening on port 8080');