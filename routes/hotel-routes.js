var db = require("../models");
var express = require("express");

var router = express.Router();

router.get("/", function(req, res) {
  db.Hotel.findAll({}).then(function(dbHotels) {
    res.render("accountManagement.handlebars", {
      hotels: dbHotels
    })
  })//then end
})//router.get end

router.delete("/:id", function(req, res) {
  var thisHotelID = req.params.id;
  db.Hotel.destroy({
    where: {
      id: thisHotelID
    }
  }).then(function(result) {
    res.redirect("/users/manage/");
  }) // then end
}) //router.delete end

module.exports = router;
