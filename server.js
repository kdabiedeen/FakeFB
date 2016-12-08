var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'innercircle'
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

app.get('/login', function(req,res){
  console.log(req.param("id"));
  connection.query("SELECT * FROM User WHERE User.UserId = " + req.param("id") + ";", function(err, results) {
    if (err) {
      return res.json({ message: "ERROR" });
    } else {
      var user = results[0];
      if(user != undefined) {
      return res.json({
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
      });
    } else {
      return res.json({ message: "ERROR" });
    }
    }
  })
});

app.get('/signUp', function(req, res) {
  // get the userId, then insert
  var querystring1 = "SELECT MAX(UserId) as max FROM User;";
  var max = -1;
  connection.query(querystring1, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message:"ERROR"});
    } else {
      var UserId = results[0];
      var date = new Date();
      var dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
      console.log(req.param("LastName"));
      max = results[0].max;
    }
    var querystring2 = "INSERT INTO User (UserId, LastName, FirstName, Address, City, State, ZipCode, Telephone, Email, AcctNum, Created, CreditCard, Preferences, Rating) " +
                        "VALUES (" + (max + 1) + ",\'" + req.param("LastName") + "\',\'"  + req.param("FirstName") + "\',\'" +
                        req.param("Address") + "\',\'"  + req.param("City") + "\',\'"  + req.param("State") + "\',"  +
                        req.param("ZipCode") + ","  + req.param("Telephone") + ",\'"  + req.param("Email") + "\',"  +
                        req.param("AcctNum") + ",\'"  + dateString + "\',"  + req.param("CreditCard") + ",\'"  + req.param("Preferences") + "\',0);";
    console.log(querystring2);
    connection.query(querystring2, function(err, results) {
        if (err) {
          console.log(err);
          return res.json( { message:"ERROR"});
        } else {
          var querystring3 = "SELECT * FROM User WHERE User.UserId = " + (max + 1) + ";";
          console.log(querystring3);
          connection.query(querystring3, function(err, results) {
          console.log(results[0]);
          if (err) {
            console.log(err);
            return res.json( { message:"ERROR"});
          } else {
            return res.json(results[0]);
            }
          })
        }
      })
    });
});

app.get("/displayUser", function(req, res) {
  connection.query("SELECT * FROM User WHERE User.UserId = " + req.query.UserId + ";", function(err, results) {
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
  connection.query("SELECT * FROM Post, User WHERE Post.PostId = " + req.query.PostId + " AND Post.Poster = User.UserId;", function(err, results) {
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
  connection.query("SELECT PostId FROM Post WHERE Post.Poster = " + req.query.UserId + ";", function(err, results) {
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
  connection.query("SELECT * FROM Comment, User WHERE Comment.CommentId = " + req.query.CommentId + " AND User.UserId = Comment.Poster;", function(err, results) {
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
  connection.query("SELECT CommentId FROM Comment WHERE Comment.Post = " + req.query.PostId + ";", function(err, results) {
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
  connection.query("SELECT * FROM Page WHERE Page.PageId = " + req.query.PageId + ";", function(err, results) {
    if (err) {
      return res.json( { err: err } );
    } else {
      return res.json(results[0]);
    }
  });
});

app.get("/displayMessage", function(req, res) {
  var querystring = "SELECT Message.MessageId, Message.Date, Message.Content, " +
                    "Sender.UserId as senderId, Sender.FirstName as senderFirst, Sender.LastName as senderLast, " +
                    "Receiver.UserId as receiverId, Receiver.FirstName as receiverFirst, Receiver.LastName as receiverLast " +
                    "FROM Message, User Sender, User Receiver " +
                    "WHERE Message.MessageId = " + req.query.MessageId + 
                    " AND Message.Sender = Sender.UserId AND Message.Receiver = Receiver.UserId";

  connection.query(querystring, function(err, results) {
    if (err) {
      return res.json( {err:err});
    } else {
      var message = results[0];
      var sender = results[0];
      var receiver = results[0];

      var data = {
        message : {
          MessageId: message.MessageId,
          Date: message.Date,
          Content: message.Content,
          Sender: message.senderId,
          Receiver: message.receiverId
        },
        sender: {
          UserId: sender.senderId,
          FirstName: sender.senderFirst,
          LastName: sender.senderLast
        },
        receiver: {
          UserId: receiver.receiverId,
          FirstName: receiver.receiverFirst,
          LastName: receiver.receiverLast,
        }
      }

      return res.json(data);

    }
  });
});

app.get("/receivedMessages", function(req, res) {
  var querystring = "SELECT MessageId FROM Message WHERE Message.Receiver = " + req.query.UserId + ";";
  connection.query(querystring, function(err, results) {
    if (err) {
      return res.json({err:err});
    } else{
        var messageIds = [];
        for (var i = 0; i < results.length; i++) {
          messageIds[i] = results[i].MessageId;
        }

        return res.json(messageIds);
    }

  });
});

app.get("/sentMessages", function(req, res) {
  var querystring = "SELECT MessageId FROM Message WHERE Message.Sender = " + req.query.UserId + ";";
  connection.query(querystring, function(err, results) {
    if (err) {
      return res.json({err:err});
    } else{
        var messageIds = [];
        for (var i = 0; i < results.length; i++) {
          messageIds[i] = results[i].MessageId;
        }

        return res.json(messageIds);
    }

  });
});

app.get("/pageByUser", function(req, res) {
  var querystring = "SELECT PageId FROM Page WHERE Page.Owner = " + req.query.UserId + ";";
  connection.query(querystring, function(err, results) {
    if (err) {
      return res.json({err:err});
    } else {
      return res.json(results[0]);
    }
  })
})

app.get("/postsByPage", function(req, res) {
  var querystring = "SELECT PostId FROM Post WHERE Post.PageId = " + req.query.PageId + ";";
  connection.query(querystring, function(err, results) {
    if (err) {
      return res.json({err:err});
    }
    else {
      var postIds = [];
      for (var i = 0; i < results.length; i++) {
        postIds[i] = results[i].PostId;
      }

      return res.json(postIds);
    }
  });
});

app.post("/createPostOnPage", function(req, res) {
  var querystring1 = "SELECT MAX(PostId) as max FROM Post;";
  var max = -1;

  connection.query(querystring1, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message:"ERROR"});
    } else {
      var Post = results[0];
      var date = new Date();
      var dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
      max = results[0].max;
    }
    var querystring2 = "INSERT INTO Post (PostId, Date, Content, CommentCount, Poster, PageId) " +
                        "VALUES (" + (max + 1) + ",\'" + dateString + "\',\'"  + req.query.Content + "\'," +
                        "0, "  + req.query.Poster + ", "  + req.query.PageId + ");";
    connection.query(querystring2, function(err, results) {
        if (err) {
          console.log(err);
          return res.json( { message:"ERROR"});
        } else {
          return res.json( { message:"SUCCESS"});
        }
      })
    });
});

app.listen(1185, "0.0.0.0",function() {
    //var host = server.address();
    console.log('server listening on port ' + 1185);
});
