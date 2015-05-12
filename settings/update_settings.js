// function search_user(nano, user_id){
//     nano.view('settings', 'by_user_id', {key:user_id}, function(err, body) {
//          if (err) console.log(err);
//          if (!body.rows.length) {
//             return false;
//          } else {
//             return body.rows[0].id;
//          }
//     });
// };

// var settings=function(app, CouchDB){
//     var nano=CouchDB.db("settings");
//     app.post("/settings/update", function(request, response){
//         var req_body=request.body;
//         var user_id=search_user(nano, req_body.user_id)
//         if(user_id!=false){
//            nano.insert({
//               active_map: req_body.trip_id, //a foreign key to the active trip _id
//               gps_intervals: { //used as defaults after first trip is started,         
//                  distance:2000, //meters of distance between auto lookup
//                  frequency: req_body.save_frequency //the number of minutes between auto lookup
//               },
//               auto_gps_tracking: req_body.auto_gps_tracking,
//               safty_checkin: req_body.safty_checkin
//            }, function(request, response){});
//         }
//     });
// }

var settings=function(app, CouchDB){
    var nano=CouchDB().db("settings");
    app.post("/settings/update", function(request, response){
        var req_body=request.body;
        console.log(nano);
        nano.insert({
          '_rev': '1-6e592366b4586cf82308d57814039b65',
          active_map: req_body.trip_id, //a foreign key to the active trip _id
          gps_intervals: { //used as defaults after first trip is started,         
            distance:2000, //meters of distance between auto lookup
            frequency: req_body.save_frequency //the number of minutes between auto lookup
          },
          auto_gps_tracking: req_body.auto_gps_tracking,
          safty_checkin: req_body.safty_checkin
        }, function(request, response){  });
    });
}


// users.get('document_name', function(err, doc) {
//         updaterev = doc._rev;
//         users.insert({title:'here_ya_go',_rev:updaterev},'document_name', function(err, body , header) {
//             if (!err)
//             {
//                 console.log(body);
//                 res.send('update website succeed');
//             }
//             else
//             {
//                 console.log(err.error);
//             }
//         });
//   });

module.exports=settings;