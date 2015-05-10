var express=require("express");
var CouchDB=require("./couchdb_conf");
var bodyParser = require('body-parser');
var multer  = require('multer');

//require the custom modules
var login=require("./authenticate/login");

var app=express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(multer({ dest: './uploads/'}));

//use all the custom modules
login(app, CouchDB);

app.listen(8888);