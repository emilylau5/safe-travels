var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
  res.render("login_signup");
  });

  app.get("/search", function(req, res) {
    res.render("index");
  });

  app.post("/api/users", function(req, res) {
    console.log(req.body);

    db.User.create({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email: req.body.email,
      userName: req.body.userName,
      password: req.body.password
    }).then(function(result){
      res.json(result);
    });
  });

  
};
