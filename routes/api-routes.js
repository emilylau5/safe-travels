var db = require("../models");

module.exports = function(app) {

  app.post("/api/users", function(req, res) {
    db.User.create({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email
    }).then(function(result){
      res.json(result);
    });
  });

  
};
