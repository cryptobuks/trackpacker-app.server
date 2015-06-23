var cradle_db = require("cradle");

var username="whinswallsistanceptelmos";
var password="irKXPnuCH8XPTQiUHfbtbvlV";
var db_url="@trackpacker.cloudant.com";


//var cradle = new(cradle_db.Connection)("http://" + username + ":" + password + db_url, 5984, {
//        cache: true,
//        raw: false,
//        forceSave: true
//    });
//
//var db=cradle.database("maps");
//
//
////db.merge("d0c200faaed6b4af36ade8cd5b96d939", {
////    use_auto_gps_tracking: "dfdfd",
////    save_position_frequency: "999"
////}, function(err, res){});
//
//db.get('d0c200faaed6b4af36ade8cd5b96d939', function (err, doc) {
//    console.log(err);
//});


console.log("http://" + username + ":" + password + db_url);

var cradle = require('cradle');
var connection = new(cradle.Connection)('https://trackpacker.cloudant.com', 443, {
    auth: { username: username, password: password },
    cache: true,
    raw: false,
    forceSave: true
});

var db = connection.database('maps');
db.get('d0c200faaed6b4af36ade8cd5b96d939', function (err, doc) {
    console.log(doc);
});





