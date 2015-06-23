var nano = require('nano');
var username="whinswallsistanceptelmos";
var password="irKXPnuCH8XPTQiUHfbtbvlV";
var db_url="@trackpacker.cloudant.com";

var CouchDB = function(){
    return {db_conn_str: "http://" + username + ":" + password + db_url,
        db: function (database_name) {
            return nano(this.db_conn_str + "/" + database_name)
        }
    }
};

//console.log(CouchDB.db("users"));
//console.log(CouchDB.db_conn_str);

module.exports = CouchDB;