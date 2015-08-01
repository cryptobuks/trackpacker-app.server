var points_service = function(app, CouchDB, CradleDB){
    var nano=CouchDB().db("points");
    var cradle = CradleDB().database("points");
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
            if (err)
              response.status(500);
            else response.status(200)
        });
    });

    app.get("/maps/get_points_by_map_id/:map_id", function(request, response){
        var req_body = request.params;
        console.log("get my points!!!");
        console.log("map id: "+req_body.map_id);
        nano.view('query_points', 'by_map_id', {key: req_body.map_id}, function(err, body) {
            if (err) console.log(err);
            if (!body.rows.length) {
                response.status(500);
            } else {
                response.status(200).json(body);
            }
        });
    });

    app.post("/points/upload_photo", function(request, response){
        console.log("upload photos!!!!");
        var req_body = request.params;
        cradle.get(req_body.point_id, function(err, doc){

        });
    });

    app.post("/points/update_descriptions", function(request, response){
        console.log("update descriptions!!!!");
        var req_body = request.body;
        console.log(req_body.point_id);
        cradle.get(req_body.point_id, function(err, doc){
            if(err) {
                console.log("rrror!"+err);
                response.status(500);
            }
            else{
                console.log("descriptions: "+doc);
                cradle.merge(req_body.point_id, {
                    descriptions: req_body.descriptions
                }, function(merge_err, merge_res){
                    if(merge_err) {
                        console.log("error!"+merge_err);
                        response.status(500).json("failed");
                    }
                    else{
                        console.log("200!!!");
                        response.status(200).json("success");
                    }
                });
                response.status(200);
            }
        });
    });
};

module.exports = points_service;