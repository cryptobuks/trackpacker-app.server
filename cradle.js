//================remote cloudant=================
var cradle_db = require("cradle");

var username="whinswallsistanceptelmos";
var password="irKXPnuCH8XPTQiUHfbtbvlV";
var db_url="@trackpacker.cloudant.com";


var cradle = function() {
   return new(cradle_db.Connection)('https://trackpacker.cloudant.com', 443, {
       auth: { username: username, password: password },
       cache: true,
       raw: false,
       forceSave: true
   });
};

//==================localhost====================
// var localhost="http://localhost";
// var cradle = function() {
//     return new(cradle_db.Connection)(localhost, 5984, {
//         cache: true,
//         raw: false,
//         forceSave: true
//     });
// }


module.exports = cradle;