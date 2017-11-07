var db = require("../models");
var express = require("express");

var router = express.Router();

//this router is on the root "/search"
router.get("/", function(req, res) {
  res.render("index");
  db.Search.findAll({}).then(function(dbSearches) {
    res.render("accountManagement.handlebars", {
      search: dbSearches
    })//render end
  })//then end
});

router.post("/:userid", function(request, response) {//this is Justin's testing of google APIs
  console.log(request.body);
  console.log(request.params);
  var http = require("http");
  var Client = require('node-rest-client').Client;
  var spotcrime = require('spotcrime');
   
  var client = new Client();

  var gMapsKey = 'AIzaSyDS0mO9a53OQPEB6J4al4DoyH2FlInfx40';

  var location = request.body.location.lat + "," + request.body.location.lng;
  var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
  queryURL += "query=hotel&key="
  queryURL += gMapsKey;
  queryURL += "&type=lodging&location=" + location;
  queryURL += "&radius=5000"

  db.Search.create({
    city: request.body.name,
    startDate: request.body.start,
    endDate: request.body.end,
    queryString: queryURL,
    UserId: parseInt(request.params.userid)

  }).then(function(result) {
    console.log({result});
    var hotelsData = {};
    client.get(queryURL, function(data) {

      var responseData = {
        hotelsData: data,
      }

      var crimeLoc = {
        lat: parseFloat(request.body.location.lat),
        lon: parseFloat(request.body.location.lng)
      }

      spotcrime.getCrimes(crimeLoc, .1, function(err, crimes){
        if(err) {
          throw err;
          console.log("error getting crime data");
        }
        responseData.crimeData = crimes;
        response.json(responseData);
      });
    })
  })
})

router.delete("/:searchid", function(request, response) {
  var thisSearchID = request.params.searchid;
  db.Search.destroy({
    where: {
      id: thisSearchID
    }
  }).then(function(result){
    res.json(result)
  })// end then
})//end router.delete


module.exports = router;