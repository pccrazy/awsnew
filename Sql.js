var mysql      = require('mysql');

 var pool      =    mysql.createPool({
   connectionLimit : 300, //important
   host     : 'evcenterdbnew.cbgvwlnpk0gj.us-east-1.rds.amazonaws.com',
   user     : 'ev_trainy',
   password : '!Ev_tester!06',
   database : 'evcenter_developers',
   debug    :  false
 });
module.exports = function() {
    this.handle_database = function(req,res){
      pool.getConnection(function(err,connection){
          if (err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
          }
          console.log('connected as id ' + connection.threadId);


          // do the query then release connectoin
          connection.query(req.body.Query,function(err,rows){
              connection.release();
              if(!err) {
                  console.log(rows);
                  res.json(rows);
              }
          });

          // listener in case of error in the connection
          connection.on('error', function(err) {
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
          });

    });
    //etc
}



}
