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

  var loggedIn = 0;

  if(loggedIn)
    return res.redirect('./main.html');
  else
    return res.redirect('./login.html');
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

app.get("/displayUser", function(req, res) {
  connection.query("SELECT * FROM User WHERE User.UserId = " + req.param("UserId") + ";", function(err, results) {
    if (err) {
      return res.json({ message: "ERROR" });
    } else {
      var user = results[0];
      return res.json( {
        UserId: user.UserId,
        LastName: user.LastName,
        FirstName: user.FirstName,
        Address: user.Address,
        City: user.City,
        State: user.State,
        ZipCode: user.ZipCode,
        Telephone: user.Telephone,
        Email: user.Email,
        AcctNum: user.AcctNum,
        CreditCard: user.CreditCard,
        Created: user.Created,
        Preferences: user.Preferences,
        Rating: user.Rating
      } );
    }
  })
});

app.get("/displayPost", function(req, res) {
  connection.query("SELECT * FROM Post, User WHERE Post.PostId = " + req.param("PostId") + " AND Post.Poster = User.UserId;", function(err, results) {
    if (err) {
      return res.json( { err: err });
    }
    else {
      var post = results[0];
      var user = results[0];
      var data = {

        post : {
          PostId: post.PostId,
          Date: post.Date,
          Content: post.Content,
          CommentCount: post.CommentCount,
          Poster: post.Poster,
          PageId: post.PageId,
          GroupId: post.GroupId,
          LikeCount: post.LikeCount
        },
        user : {
          UserId: user.UserId,
          FirstName: user.FirstName,
          LastName: user.LastName
        }

      }

      return res.json(data);
    }
  });
});

app.get("/displayAllPosts", function(req, res) {
  connection.query("SELECT PostId FROM Post WHERE Post.Poster = " + req.param("UserId") + ";", function(err, results) {
    if (err) {
      return res.json( { err: err });
    }
    else {
      var data = [];

      for (var i = 0; i < results.length; i++) {
        data[i] = results[i].PostId;
      }

      return res.json(data);
    }
  });
});

app.get("/displayComment", function(req, res) {
  connection.query("SELECT * FROM Comment, User WHERE Comment.CommentId = " + req.param("CommentId") + " AND User.UserId = Comment.Poster;", function(err, results) {
    if (err) {
      return res.json( {err: err});
    }
    else {
      var comment = results[0];
      var user = results[0];
      var data = {

        comment : {
          Commentid: comment.CommentId,
          Date: comment.Date,
          Content: comment.Content,
          Poster: comment.Poster,
          Post: comment.PostId,
          LikeCount: comment.LikeCount
        },
        user : {
          UserId: user.UserId,
          FirstName: user.FirstName,
          LastName: user.LastName
        }

      }

      return res.json(data);
    }
  });
});

app.get("/showComments", function(req, res) {
  connection.query("SELECT CommentId FROM Comment WHERE Comment.Post = " + req.param("PostId") + ";", function(err, results) {    
    if (err) {
      return res.json( { err: err });
    }
    else {
      var data = [];

      for (var i = 0; i < results.length; i++) {
        data[i] = results[i].CommentId;
      }

      return res.json(data);
    }
  });
});

app.get("/displayPage", function(req, res) {
  connection.query("SELECT * FROM Page WHERE Page.PageId = " + req.param("PageId") + ";", function(err, results) {
    if (err) {
      return res.json( { err: err } );
    } else {
      return res.json(results[0]);
    }
  });
});

app.listen(1185, "0.0.0.0",function() {
    //var host = server.address();
    console.log('server listening on port ' + 1185);
});
