var microtime_utils=require('../time_utils/microtimes');

var create_map = function(app, CouchDB, CradleDB){
    var nano=CouchDB().db("maps");
    var cradle = CradleDB().database("maps");
    app.post("/maps/create", function(request, response){
        console.log("create map!!!!!");
        var req_body=request.body;
        var start_microtime=new Date(req_body.start_date).getTime()/1000;
        var end_microtime=new Date(req_body.end_date).getTime()/1000;
        nano.insert({trip_name: req_body.trip_name.toString(), start_date: new Date(), end_date: new Date(),
          user_id: req_body.user_id, 
          is_trip: "YES",
          place: "China",
          gps_intervals:{
             distance: req_body.distance, //meters of distance between auto lookup
             frequency: req_body.frequency_auto_lookup //the number of minutes between auto lookup
          },
            use_auto_gps_tracking: req_body.use_auto_gps_tracking,
            save_position_frequency: req_body.save_position_frequency,
          checkin_enabled: req_body.checkin_enabled, //
          checkin_default_message: "Doing great, talk soon",// the default message to be sent 
          pin: '', // one way hash of trip pin code used for authorizing access to this trip    checkin_reminder: true // whether to produce a daily check in notification
          checkin_contacts: 
          [{
            name: "Patty Jones", //the name of the contact
            email: "someone@place.com", //email to send check in message to
            phone: 2028129595 //ten digit number of person to text check message to
           }]
       }, function(req, res){});
    });

    app.get("/maps/get_my_trips/:user_id", function(request, response){
        var req_body = request.params;
        nano.view('find_trips', 'by_user_id', {key: req_body.user_id}, function(err, body) {
            console.log("user_id: "+req_body.user_id);
            if (err) console.log(err);
            if (!body.rows.length) {
                response.json(body);
            } else {
                response.status(200).json(body);
            }
        });
    });

    app.post("/maps/update_trip", function(request, response){
        var req_body=request.body;
        console.log("update the trip!!!!!");
        cradle.merge(req_body.trip_id, {
            use_auto_gps_tracking: req_body.use_auto_gps_tracking,
            save_position_frequency: req_body.save_position_frequency
        }, function(err, res){
            console.log(err);
            console.log(res);
        });
    });

}

module.exports=create_map;