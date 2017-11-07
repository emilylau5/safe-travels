var db = require("../models");

var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function(app) {
  app.get("/", function(req, res) {
  res.render("login_signup");
  });

  app.get("/search", function(req, res) {
    res.render("index");
  });

  app.get("/api/users", function(req, res) {
    //run a query against the database for the username or password provided
    console.log("logging the request data");
    console.log(req.query);

    bcrypt.hash(req.query.password, saltRounds, function(err, hash) {
         
      db.User.findOne({
        where : {
          $or : {
            userName : req.query.userName
            // password : hash
          }
        }
      }).then(function(dbUser) {
        console.log(dbUser);
        console.log(hash);
        if (req.query.userName === dbUser.userName) {
          res.json({
            validation : "pass"
          }); //end of res.json
        } //end of if
        else {
          res.json({
            validation : "fail"
          }); //end of res.json
        } //end of else
      }); //end of then
    }); //end of bcrypt
  }); //end of get

  app.post("/api/users", function(req, res) {
    console.log(req.body);
    //go through a series of account info validations and send the response back to client if any issue(s)
    var isPasswordUnique;
    var isUserNameUnique;
    var isEmailUnique;
    var arePasswordsEqual;

    //run a query to check if the user already exists in the database
    db.User.findOne({
      where : {
        $or : {
          userName : req.body.UserName,
          email : req.body.email
        } 
      }
    }).then(function(dbUser) {
      //console.log(dbUser);

      //first check if the passwords entered are exactly same
      if (req.body.password !== req.body.passConfirm) {
        console.log("passwords do not match!");
        res.json({
          passwordIssue : true});
      }

      //else if there is no data in the db
      else if (!dbUser) {
        console.log("new user added to account!");
        // var hashPassword = passHash(req.body.password);
        // console.log("this is hash 2" + hashPassword)
        //go ahead and insert new account into database
      
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          // Store hash in your password DB.
          console.log("this the hash" + hash)
          db.User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            password: hash
          }).then(function(result){
            //just send the same response as in the above if in order for the client-side validation logic to work
            res.json({
              outcome : "success",
              user: result
            });
          });
        });
      } 
      //else it means there is data, and need to respond with an object
      else if (dbUser) {
        console.log("the account into already exists in the db!")
        console.log(dbUser);
        res.json(dbUser);
      }
    }); //end of findOne method
  }); //end of app.post("/api/users")

  app.post("/users/:id/hotels", function(req, res) {
    console.log(req.body);
    if(req.body.rating) {
      db.Hotel.create({
        name: req.body.name,
        rating: req.body.rating,
        city: req.body.city,
        UserId: req.params.id,
      }).then(function(result) {
        res.json(result);
      })
    }
    else {
      db.Hotel.create({
        name: req.body.name,
        city: req.body.city,
        UserId: req.params.id,
      }).then(function(result) {
        res.json(result);
      })
    }
  })

  //needs to be rerouted and needs to grab user account info from the db **JW
  app.get("/users/:id/manage", function(req, res) {

    res.render("accountManagement");
  });

}; //end of module export
