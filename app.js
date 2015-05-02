var express=require("express");
var CouchDB=require("./couchdb_conf");

var app=express();
app.get("/login", function(request, response){
    var nano=CouchDB().db("users");
//    nano.insert({nimabi: "daye"}, function(err, body, header){
//        console.log(body);
//        response.json(body);
//    })
    nano.get({name: "songyu"}, function(err, body){
        response.json(body);
    });

});

app.listen(3000);