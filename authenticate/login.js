var login=function(app, CouchDB){
  var nano=CouchDB().db("users");
  app.get("/users/login/:email/:password", function(request, response){

    nano.view('login', 'by_email_and_password', {key:[request.params.email, request.params.password]}, function(err, body) {
      if (err) console.log(err);
         if (!body.rows.length) {
            response.json(body);
         } else {
            response.status(200).json(body);
         }
      });
  });

  app.post("/users/signup", function(request, response){
      var req_body=request.body;
      nano.insert({first_name: req_body.first_name, last_name: req_body.last_name,
                   email: req_body.email, password: req_body.password,
                   sync_url: "https://trackpacker.cloudant.com/users"},
                   function(request, response){

      });
  });

  app.post("/users/upload", function(request, response){
      console.log(request.files);
  });
}

module.exports=login;
