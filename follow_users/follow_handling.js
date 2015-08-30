var follow_users = function(app, CouchDB, CradleDB){
    var nano=CouchDB().db("follow_users");
    var cradle = CradleDB().database("follow_users");

    app.post("/users/follow", function(request, response){
     var req_body = request.body;
     console.log("follow user!");
     nano.view('search_target', 'by_user_id', {key: req_body.user_id}, function(err, body){
     	console.log(body.rows.length);
         if (body.rows.length == 0) {
            //insert follow
            nano.insert({
              user_id: req_body.user_id, 
              target_id: req_body.target_id, 
              verified: 'no'
            }, function(insert_err, insert_body){
            	console.log("yao cha le");
            	console.log(insert_err);
               if(!insert_err) response.status(200).end();
               else response.status(500).end();
            });
         } 
         else {
         	console.log("zhao dao le!");
            response.status(500).end();
         }
     });
  });
};

module.exports=follow_users;
