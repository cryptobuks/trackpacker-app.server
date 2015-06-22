var settings=function(app, CouchDB){
    var nano=CouchDB().db("settings");
    app.post("/settings/update", function(request, response){
        var req_body=request.body;
        console.log("update setting!!!!");
        nano.get("528db487eaa392a931582b45c05039c3", function(err, doc){
            console.log(err);
           updaterev = doc._rev;
           nano.insert({
              _rev: updaterev,
              active_map: req_body.trip_id, //a foreign key to the active trip _id
              gps_intervals: { //used as defaults after first trip is started,         
                 distance:2000, //meters of distance between auto lookup
                 frequency: req_body.save_frequency //the number of minutes between auto lookup
              },
              auto_gps_tracking: req_body.auto_gps_tracking,
              safty_checkin: req_body.safty_checkin
           },"528db487eaa392a931582b45c05039c3" ,function(err, body, header){  });
        });
    });
}

module.exports=settings;