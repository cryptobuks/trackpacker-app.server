var settings=function(app, CouchDB, CradleDB){
    var nano=CouchDB().db("settings");
    var cradle = CradleDB().database("settings");
	
	app.post("/settings/create_if_not_exist", function(request, response){
		var req_body = request.body;
        nano.view('settings', 'by_user_id', {key: req_body.user_id}, function(err, body) {
            if (err) console.log(err);
            if (!body.rows.length) {
                nano.insert({ user_id: req_body.user_id }, function(insert_error, body_after_insert){
                	response.status(200);
                });
            }
        });
	});
	
    app.post("/settings/update", function(request, response){
        var req_body=request.body;
        console.log("update setting!!!!");
        cradle.view("settings/by_user_id", {user_id: req_body.user_id}, function(err, doc){
            console.log(doc[0].value);
            cradle.merge(doc[0].value._id, {
                use_auto_gps_tracking: req_body.use_auto_gps_tracking,
                save_position_frequency: req_body.save_position_frequency
            }, function(err2, res2){
                console.log(err2);
                //console.log(res2);
                if(!err2) response.status(200);
            });
        });
    });

    app.get("/settings/get/:user_id", function(request, response){
        var req_body = request.params;
        console.log("get settings hit!!!");
        console.log("user_id: "+req_body.user_id);
        nano.view('settings', 'by_user_id', {key: req_body.user_id}, function(err, body) {
            console.log("user_id: "+req_body.user_id);
            if (err) console.log(err);
            if (!body.rows.length) {
                response.json(body);
            } else {
                response.status(200).json(body);
            }
        });
    });
}

module.exports=settings;