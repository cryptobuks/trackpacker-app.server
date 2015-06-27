var settings=function(app, CouchDB, CradleDB){
    var nano=CouchDB().db("settings");
    var cradle = CradleDB().database("settings");
    app.post("/settings/update", function(request, response){
        var req_body=request.body;
        console.log("update setting!!!!");
        cradle.view("settings/by_user_id", {user_id: req_body.user_id}, function(err, doc){
            //console.log(doc[0].value._id);
            cradle.merge(doc[0].value._id, {
                use_auto_gps_tracking: req_body.use_auto_gps_tracking,
                save_position_frequency: req_body.save_position_frequency
            }, function(err2, res2){
                //console.log(err2);
                //console.log(res2);
            });
        });
    });
}

module.exports=settings;