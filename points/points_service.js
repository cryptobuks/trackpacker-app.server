var points_service = function(app, CouchDB){
    var nano=CouchDB().db("points");
    app.post("/maps/add_points", function(request, response){
        console.log("add points called!!!!")
        var req_body = request.body;
        console.log("create new point!!!");
        nano.insert({
            user_id: req_body.user_id,
            map_id: req_body.map_id,
            created: parseInt(new Date().getTime()/1000),
            title: req_body.title,
            notes: req_body.notes,
            reverse_geo: "",
            geo_point: {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: {lat: req_body.latitude, long: req_body.longitude}
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
        }, function(err, body){
            console.log(err);
        });
    });

    app.get("/maps/get_points_by_map_id/:map_id", function(request, response){
        var req_body = request.params;
        console.log("get my points!!!");
        console.log("map id: "+req_body.map_id);
        nano.view('query_points', 'by_map_id', {key: req_body.map_id}, function(err, body) {
            if (err) console.log(err);
            if (!body.rows.length) {
                response.json(body);
            } else {
                response.status(200).json(body);
            }
        });
    });
};

module.exports = points_service;