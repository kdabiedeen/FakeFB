var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'jdbc_class'
});

connection.connect(function(err){
    if(err) throw err;
    console.log('you are now connected... ');

})
;
app.use(bodyParser.json());
/*
app.use(bodyParser.urlencoded({
    extended: false
}));
*/

var middleWare = (bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + '/public'));

app.get('/logIn', function(req,res){

});

app.post('/logIn', middleWare, function(req, res) {
  console.log(req.body.username);
  console.log(req.body.password);
  /*
	connection.query('SELECT * FROM User', function(err, results){
    if(err){
      console.log("Error");
    } else {
      console.log(results.length);

      for(var i = 0; i < results.length; i++){
        //console.log(results[i]);
      }

      //EXAMPLE HOW TO SIGN UP A USER
      var s = 'INSERT INTO User (UserId, LastName, FirstName, Address, City, State, ZipCode, Telephone, Email, AcctNum, Created, CreditCard, Preferences, Rating)' +
          'VALUES (12, \'Dabiedeen\', \'Kevin\', \'5 Elmd Lane\', \'Stony VBrook\', \'NY\', 11790, \'6311234567\', \'brancuad2@gmail.com\', 132425462, \'2016-11-4\', 132425462, \'\', 0);'
      connection.query(s, function(err, results){
        if(err){
          console.log("Error");
          console.log(err)
        } else {
          console.log("Success");
        }

    	});

    }
	});
  */
});


app.listen(1185, "0.0.0.0",function() {
    //var host = server.address();
    console.log('server listening on port ' + 1185);
});
