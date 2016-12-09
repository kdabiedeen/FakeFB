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

app.get("/postsByGroup", function(req, res) {
  var querystring = "SELECT PostId FROM Post WHERE Post.GroupId = " + req.query.GroupId + ";";
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

app.get("/createPostOnPage", function(req, res) {
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
    var querystring2 = "INSERT INTO Post (PostId, Date, Content, CommentCount, Poster, PageId, LikeCount) " +
                        "VALUES (" + (max + 1) + ",\'" + dateString + "\',\'"  + req.query.Content + "\'," +
                        "0, "  + req.query.Poster + ", "  + req.query.PageId + ", 0);";
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

app.get("/createPostOnGroup", function(req, res) {
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
    var querystring2 = "INSERT INTO Post (PostId, Date, Content, CommentCount, Poster, GroupId, LikeCount) " +
                        "VALUES (" + (max + 1) + ",\'" + dateString + "\',\'"  + req.query.Content + "\'," +
                        "0, "  + req.query.Poster + ", "  + req.query.GroupId + ", 0);";
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

app.get("/getAllUsers", function(req, res) {
  var querystring = "SELECT UserId, LastName, FirstName FROM User";
  connection.query(querystring, function(err, results) {
    if(err) {
      console.log(err);
      return res.json({message: "ERROR"});
    }
    else {
      return res.json(results);
    }
  });
});

app.get("/getUsersByGroup", function(req, res) {
  var querystring = "SELECT User.UserId, LastName, FirstName FROM User, Membership " +
    "WHERE Membership.GroupId = " + req.query.GroupId + " AND Membership.UserId = User.UserId;"; 
    console.log(querystring);
    connection.query(querystring, function(err, results) {
      if (err) {
        console.log(err);
        return res.json({message : "ERROR"});
      } else {
        return res.json(results);
      }
    }); 
});

app.get("/getAllGroups", function(req, res) {
  var querystring = "SELECT GroupId, Name FROM Groups";
  connection.query(querystring, function(err, results) {
    if(err) {
      console.log(err);
      return res.json({message: "ERROR"});
    }
    else {
      return res.json(results);
    }
  });
});

app.get("/getAllGroupsByUser", function(req, res) {
  var querystring = "SELECT Groups.GroupId, Groups.Name FROM Groups, Membership WHERE Membership.UserId = " + 
  req.query.UserId + " AND Groups.GroupId = Membership.GroupId";
  connection.query(querystring, function(err, results) {
    if(err) {
      console.log(err);
      return res.json({message: "ERROR"});
    }
    else {
      return res.json(results);
    }
  });
});

app.get("/joinGroup", function(req, res) {
  var querystring = "INSERT INTO Membership (GroupId, UserId) " +
                    "VALUES (" + req.query.GroupId + ", " + req.query.UserId+ ");";
  connection.query(querystring, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message:"ERROR"});
    } else {
      return res.json({message:"SUCCESS"});
    }
  });
});

app.get("/unjoinGroup", function(req, res) {
  var querystring = "DELETE FROM Membership " +
                    "WHERE GroupId = " + req.query.GroupId + " AND UserId = " + req.query.UserId + ";";
  connection.query(querystring, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message:"ERROR"});
    } else {
      return res.json({message:"SUCCESS"});
    }
  });
});

app.get("/sendMessage", function(req, res) {
  var querystring1 = "SELECT MAX(MessageId) as max FROM Message;";
  var max = -1;

  connection.query(querystring1, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message:"ERROR"});
    } else {
      var Message = results[0];
      var date = new Date();
      var dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
      max = results[0].max;
    }
    var querystring2 = "INSERT INTO Message (MessageId, Date, Content, Sender, Receiver) " +
                        "VALUES (" + (max + 1) + ",\'" + dateString + "\',\'"  + req.query.Content + "\'," +
                        req.query.Sender + ", "  + req.query.Receiver + ");";
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

app.get("/deleteMessage", function(req, res) {
  var querystring = "DELETE FROM Message WHERE MessageId = " + req.query.MessageId + ";";
  connection.query(querystring, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message : "ERROR"});
    } else {
      return res.json({message : "SUCCESS"});
    }
  });
});

app.get("/likePost", function(req, res) {
  var querystring = "UPDATE Post SET LikeCount = LikeCount + 1 WHERE PostId = " + req.query.PostId + ";"
  connection.query(querystring, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message : "ERROR"});
    } else {
      console.log(querystring);
      return res.json({message : "SUCCESS"});
    }
  });
});

app.get("/unlikePost", function(req, res) {
  var querystring = "UPDATE Post SET LikeCount = LikeCount - 1 WHERE PostId = " + req.query.PostId + ";"
  connection.query(querystring, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message : "ERROR"});
    } else {
      return res.json({message : "SUCCESS"});
    }
  });
});

app.get("/likeComment", function(req, res) {
  var querystring = "UPDATE Comment SET LikeCount = LikeCount + 1 WHERE CommentId =" + req.query.CommentId + ";"
  connection.query(querystring, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message : "ERROR"});
    } else {
      return res.json({message : "SUCCESS"});
    }
  });
});

app.get("/unlikeComment", function(req, res) {
  var querystring = "UPDATE Comment SET LikeCount = LikeCount - 1 WHERE CommentId =" + req.query.CommentId + ";"
  connection.query(querystring, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message : "ERROR"});
    } else {
      return res.json({message : "SUCCESS"});
    }
  });
});

app.get("/createComment", function(req, res) {
  var querystring1 = "SELECT MAX(CommentId) as max FROM Comment;";
  var max = -1;

  connection.query(querystring1, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message:"ERROR"});
    } else {
      var Comment = results[0];
      var date = new Date();
      var dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
      max = results[0].max;
    }
    var querystring2 = "INSERT INTO Comment (CommentId, Date, Content, Poster, Post, LikeCount) " +
                        "VALUES (" + (max + 1) + ",\'" + dateString + "\',\'"  + req.query.Content + "\'," +
                        req.query.Poster + ", "  + req.query.PostId + ", 0);";
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

app.get("/editPost", function(req, res) {
  var querystring = "UPDATE Post SET Content = \'" + req.query.Content + 
                    "\' WHERE PostId = " + req.query.PostId + ";";
  connection.query(querystring, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message:"ERROR"});
    } else {
      return res.json({message:"SUCCESS"});
    }
  });
});

app.get("/editComment", function(req, res) {
  var querystring = "UPDATE Comment SET Content = \'" + req.query.Content + 
                    "\' WHERE CommentId = " + req.query.CommentId + ";";
  console.log(querystring);
  connection.query(querystring, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message:"ERROR"});
    } else {
      return res.json({message:"SUCCESS"});
    }
  });
});

app.get("/createAd", function(req, res) {
  var querystring1 = "SELECT MAX(AdId) as max FROM Advertisement;";
  var max = -1;
  connection.query(querystring1, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message:"ERROR"});
    } else {
      max = results[0].max;
      var date = new Date();
      var dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
      var querystring2 = "INSERT INTO Advertisement (AdId, EmployeeId, Type, Date, Company, ItemName, Content, UnitPrice, NumUnits) " +
                          "VALUES (" + (max + 1) + "," + req.param("EmployeeId") + ",\'"  + req.param("Type") + "\',\'" +
                          dateString + "\',\'"  + req.param("Company") + "\',\'"  + req.param("ItemName") + "\',\'"  +
                          req.param("Content") + "\',"  + req.param("UnitPrice") + ","  + req.param("NumUnits") + ");";
      console.log(querystring1);
      connection.query(querystring2, function(err, results) {
        if(err){
          console.log(err);
          return res.json({message:"ERROR"});
        } else {
          return res.json({message:"SUCCESS"});
        }
      });
    }
  });
});

app.get("/isEmployee", function(req, res) {
    console.log("PRINT THIS " + req.param("UserId"));
    var querystring1 = "SELECT * FROM Employee WHERE Employee.UserId = " + req.param("UserId") + ";";
    connection.query(querystring1, function(err, results) {
      if(err){
        console.log("ERROR HERE 343");
        console.log(err);
        return res.json({message:"ERROR"});
      } else {
        if(results.length == 0)
          return res.json({message: "EMPTY"});
         else
          return res.json({message:"SUCCESS", SSN: results[0].SSN});
      }
    });
});

app.get("/executeDeleteAd", function(req, res) {
  console.log(req.param("AdId"));
  var querystring = "DELETE FROM Sale WHERE Sale.AdId = " + req.param("AdId") + ";";
  connection.query(querystring, function(err, results) {
    if(err){
      console.log(err);
      return res.json({message:"ERROR"});
    } else {
      var querystring = "DELETE FROM Advertisement WHERE Advertisement.AdId = " + req.param("AdId") + ";";
      connection.query(querystring, function(err, results) {
        if(err){
          console.log(err);
          return res.json({message:"ERROR"});
        } else {
          return res.json({message:"SUCCESS"});
        }
      });
    }
  });
});

app.get("/deleteAd", function(req, res) {
  var querystring = "SELECT * FROM Advertisement WHERE Advertisement.EmployeeId = " + req.param("SSN") + ";";
  connection.query(querystring, function(err, results) {
    if (err) {
      return res.json({err:err});
    } else{
        var messageIds = [];
        for (var i = 0; i < results.length; i++) {
          messageIds[i] = results[i].AdId + " " + results[i].Company + " " + results[i].ItemName;
        }

        return res.json(messageIds);
    }

  });
});

app.get("/collectAds", function(req, res) {
  var querystring = "SELECT * FROM Advertisement;";
  connection.query(querystring, function(err, results) {
    if (err) {
      return res.json({err:err});
    } else{
        var messageIds = [];
        for (var i = 0; i < results.length; i++) {
          messageIds[i] = results[i].AdId + " " + results[i].Company + " " + results[i].ItemName;
        }
        return res.json(messageIds);
    }
  });
});

app.get("/recordTrans", function(req, res) {
  var querystring1 = "SELECT MAX(TransId) as max FROM Sale;";
  var max = -1;
  connection.query(querystring1, function(err, results) {
    if (err) {
      console.log(err);
      return res.json({message:"ERROR"});
    } else {
  max = results[0].max;
  var dateString = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var querystring = "INSERT INTO Sale(TransId, UserId, Timestamp, AdId, NumUnits, AcctNum) VALUES(" + (max + 1) + "," + req.param("UserId") + ",\'" + dateString + "\'," + req.param("AdId") + "," + req.param("numUnits") + "," + req.param("acctNum") + ");";
  console.log(querystring);
  connection.query(querystring, function(err, results) {
    if (err) {
      return res.json({err:err});
    } else {
      return res.json({message: 'SUCCESS'});
    }
  });
  }
});
});

app.get("/suggest", function(req, res) {
  var querystring = "SELECT ItemName From (" +
"SELECT Distinct Type From Advertisement A WHERE EXISTS(SELECT * FROM Sale S WHERE S.UserId = " + req.param("UserId") + " AND A.AdId = S.AdId)" +
") AS B, Advertisement A WHERE A.Type = B.Type;";
console.log(querystring);
  connection.query(querystring, function(err, results) {
    if (err) {
      return res.json({err:err});
    } else{
        var messageIds = [];
        for (var i = 0; i < results.length; i++) {
          messageIds[i] = results[i].ItemName;
        }
        return res.json(messageIds);
    }
  });
});

app.get("/mailingList", function(req, res) {
  var querystring = "SELECT UserId, LastName, FirstName, Email FROM User U WHERE EXISTS(SELECT * FROM Sale S WHERE U.UserId = S.UserId);";
  console.log(querystring);
  connection.query(querystring, function(err, results) {
    if (err) {
      return res.json({err:err});
    } else{
        var messageIds = [];
        for (var i = 0; i < results.length; i++) {
          messageIds[i] = results[i].UserId + " " + results[i].LastName + ", " + results[i].FirstName + " " + results[i].Email;
        }
        return res.json(messageIds);
    }
  });
});

app.get("/deletePost", function(req, res) {
  var querystring = "DELETE FROM Post WHERE PostId = " + req.query.PostId + ";";
  connection.query(querystring, function(err, results) {
    if(err) {
      console.log(err);
      return res.json({message : "ERROR"});
    } else {
      return res.json({message : "SUCCESS"});
    }
  });
});

app.get("/deleteComment", function(req, res) {
  var querystring = "DELETE FROM Comment WHERE CommentId = " + req.query.CommentId + ";";
  connection.query(querystring, function(err, results) {
    if(err) {
      console.log(err);
      return res.json({message : "ERROR"});
    } else {
      return res.json({message : "SUCCESS"});
    }
  });
});

app.get("/renameGroup", function(req, res) { 
  var querystring = "UPDATE Groups Set Name = " + req.query.Name + 
" WHERE GroupId = " + req.query.GroupId + ");";
    connection.query(querystring, function(err, results) {
        if (err) {
          console.log(err);
          return res.json( { message:"ERROR"});
        } else {
          return res.json( { message:"SUCCESS"});
        }
    });
});

app.get("/deleteGroup", function(req, res) { 
  var querystring1 = "DELETE FROM Groups WHERE GroupId = " + req.query.Name + ");";
    connection.query(querystring1, function(err, results) {
        if (err) {
          console.log(err);
          return res.json( { message:"ERROR"});
        } else {
          var querystring2 = "DELETE FROM Membership WHERE GroupId = " + req.query.Name + ");";
          connection.query(querystring2, function(err, results) {
          if (err) {
            console.log(err);
            return res.json( { message:"ERROR"});
          } else {
            return res.json( { message:"SUCCESS"});
          }
        });
    }
  });
});

app.get("/getGroupName", function(req, res) {
  var querystring = "SELECT Name FROM Groups WHERE GroupId = " + req.query.GroupId + ";";
  connection.query(querystring, function(err, results) {
    if (err) {
      console.log(err);
      return res.json( { message:"ERROR"});
    } else {
      var group = results[0];
      return res.json(group);
    }
  });
});


app.listen(1185, "0.0.0.0",function() {
    //var host = server.address();
    console.log('server listening on port ' + 1185);
});

//# sourceURL=server.js