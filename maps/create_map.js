var microtime_utils=require('../time_utils/microtimes');

var create_map = function(app, CouchDB){
    var nano=CouchDB().db("maps");
    app.post("/maps/create", function(request, response){
        console.log("create map!!!!!");
        var req_body=request.body;
        var start_microtime=new Date(req_body.start_date).getTime()/1000;
        var end_microtime=new Date(req_body.end_date).getTime()/1000;
        nano.insert({name: req_body.trip_name.toString(), start_date: new Date(), end_date: new Date(),
          user_id: req_body.user_id, 
          is_trip: "YES",
          spots: [
             {
             	created: parseInt(new Date().getTime()/1000),
             	title: req_body.title, 
             	notes: req_body.notes, 
             	reverse_geo: "",
             	geo_point: {
             		type: "Feature", 
             		geometry: {
             			type: "Point",
             			coordinates: [req_body.lat, req_body.lon]
             		},
             		properties: {
             			name: req_body.property_name
             		}
             	},
             	photos: [{
                    thumb: '', 
                    local_path: '', 
                    remote_path: ''
             	}], 

             	videos:[{
             		thumb: '', //base64 encoded thumbnail - may not use
                    local_path: "", //where the picture is in their camera role                    
                    remote_path: "" //where it is located in S3 storage  
             	}]
             }
          ],
          gps_intervals:{
             distance: req_body.distance, //meters of distance between auto lookup
             frequency: req_body.frequency_auto_lookup //the number of minutes between auto lookup
          },
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
}

module.exports=create_map;