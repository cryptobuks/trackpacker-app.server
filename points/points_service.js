var points_service = function(app, CouchDB){
    var nano=CouchDB().db("points");
    app.post("/maps/add_points", function(request, response){
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
                    coordinates: [req_body.latitude, req_body.longitude]
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
};

module.exports = points_service;