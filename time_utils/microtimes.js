var microtime_utils={
	get_microtime: function(){
	    return parseInt(new Date().getTime()/1000);
    }
}


module.exports=microtime_utils;