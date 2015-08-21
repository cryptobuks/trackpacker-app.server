var points_service = function(app, CouchDB, CradleDB){
    var nano=CouchDB().db("points");
    var cradle = CradleDB().database("points");
    app.post("/maps/add_points", function(request, response){
        console.log("add points called!!!!");
        var req_body = request.body;
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
            if (err){
                console.log(err);
                response.status(500);
            }
            else {
                console.log(body);
                response.status(200).json(body).end();
            }
        });
    });

    app.get("/maps/get_points_by_map_id/:map_id", function(request, response){
        var req_body = request.params;
        console.log("get my points!!!");
        console.log("map id: "+req_body.map_id);
        nano.view('query_points', 'by_map_id', {key: req_body.map_id}, function(err, body) {
            if (err) console.log(err);
            if (!body.rows.length) {
                response.status(500).end();
            } else {
                response.status(200).json(body).end();
            }
        });
    });

    app.post("/points/update_descriptions", function(request, response){
        console.log("update descriptions!!!!");
        var req_body = request.body;
        console.log(req_body.point_id);
        cradle.get(req_body.point_id, function(err, doc){
            if(err) {
                console.log(err);
                response.status(500).end();
            }
            else{
                cradle.merge(req_body.point_id, {
                    descriptions: req_body.descriptions
                }, function(merge_err, merge_res){
                    if(merge_err) {
                        console.log("error!"+merge_err);
                        response.status(500).end();
                    }
                    else
                        response.status(200).end();
                });
            }
        });
    });

    app.post("/points/upload_photos", function(request, response){
        console.log("upload photos!");
        var req_body = request.body;
        cradle.get(req_body.point_id, function(err, doc){
            if (err) {
                console.log("server errror");
                response.status(500);
            }
            else{
                console.log(doc);
                doc.photos.push({
                        thumb: "",
                        local_path: "",
                        remote_path: req_body.photo_remote_url
                    });
                cradle.merge(req_body.point_id, {photos: doc.photos}, function(merge_err, merge_res){
                    if (merge_err){
                        response.status(500);
                    }
                    else response.status(200).json("success");
                });
            }
            response.status(200).json("success");
        });
    });

    app.get("/points/get_photos/:point_id", function(request, response){
        console.log("get photos!!");
        var req_body = request.params;
        cradle.get(req_body.point_id, function(err, doc){
            if (err) response.status(500).json("");
            else
                response.status(200).json(doc);
        });
    });

    app.get("/points/get_descriptions/:point_id", function(request, response){
        var req_body = request.params;
        cradle.get(req_body.point_id, function(err, doc){
            if (err) response.status(500).json("");
            else response.status(200).json(doc);
        });
    });

    app.post("/points/sync_existing_point", function(request, response){
        var req_body = request.body;
        console.log("couch db point id: "+req_body.point_id);
        cradle.get(req_body.point_id, function(err, doc){
            if (err) response.status(500).end();
            else{
                //if the params has photo_remote_url key, then we know the user wanna update photo
                if (req_body.photos != undefined && req_body.photos != null && req_body.photos.length > 0){
                    photos_arr = req_body.photos.split(",");
                    cradle.merge(req_body.point_id, {photos: photos_arr}, function(merge_err, merge_res){
                        if (merge_err) response.status(500).end();
                        else response.status(200).end();
                    });
                }
                //if descriptions key is not null, then user wanna update journal
                if (req_body.descriptions != undefined && req_body.descriptions != null && req_body.descriptions.length > 0) {
                    cradle.merge(req_body.point_id, {
                        descriptions: req_body.descriptions
                    }, function(merge_err, merge_res){
                        if(merge_err) {
                            console.log("error for journal!"+merge_err);
                            response.status(500).json("").end();
                        }
                        else
                            response.status(200).json("").end();
                    });
                }
                response.status(200).end();
            }
        });
    });
};

module.exports = points_service;