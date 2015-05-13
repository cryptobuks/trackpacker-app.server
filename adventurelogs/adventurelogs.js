var adventurelogs=function(app, CouchDB){
   var nano=CouchDB().db("adventurelogs");
   app.post('/adventurelogs/update', function(request, response){
      var req_body=request.body;
      nano.get(req_body.user_id, function(err, doc){
      	 if(doc){
      	 	console.log("Found!");
      	 	updaterev=doc._rev;
      	 	doc.log.push({id: req_body.map_id, name: req_body.map_name});
      	 	nano.insert({_id: req_body.user_id, _rev: updaterev, log:doc.log}, 
      	 		req_body.user_id, function(err, body, header){console.log(err); });
      	 }
         else{
         	console.log("NONo Record!");
            nano.insert({_id: req_body.user_id, log:[{id: req_body.map_id, name: req_body.map_name}]}, 
            	req_body.user_id, function(err, body, header){
            		console.log(err);
            	});
         }
      });
   });
}


module.exports=adventurelogs;