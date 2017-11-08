var db = require("../models");
var express = require("express");
var http = require("http");
var Client = require('node-rest-client').Client;
var spotcrime = require('spotcrime');
 
var client = new Client();

var router = express.Router();

//this router is on the root "/search"
router.get("/", function(req, res) {

  console.log(req.headers.cookie);
  if(!req.headers.cookie) {
    res.redirect("/");
  }
  else {
    var cookieString = req.headers.cookie.split("=");
    var userID = cookieString[1];
    console.log({userID});
    db.Search.all({
      where: {
        UserId : userID
      },
      attributes:["id", "city", "startDate", "endDate"],
      include: ["User"]
    }).then(function(data) {
      if(data.length) {
        // console.log(data);
        var searchData = [];
        for (var index in data) {
          searchData.push(data[index].dataValues);
        }
        var thing = {
          search: searchData,
          user: searchData[0].User
        }
        // res.json(req.headers.cookie);
        res.render("index", thing);
      }
      else {
        res.render("index");
      }
    })
  } 
});

router.get("/:id", function(req, res) {
  db.Search.findById(req.params.id).then(function(data) {
    console.log(data.location);
    var location = data.location.split(",");
    var queryURL = data.queryString;
    var hotelsData = {};
    client.get(queryURL, function(data) {
      var responseData = {
        hotelsData: data,
      }

      var crimeLoc = {
        lat: parseFloat(location[0]),
        lon: parseFloat(location[1])
      }

      spotcrime.getCrimes(crimeLoc, .1, function(err, crimes){
        if(err) {
          throw err;
          console.log("error getting crime data");
        }
        responseData.crimeData = crimes;
        responseData.location = {
          lat: crimeLoc.lat,
          lng: crimeLoc.lon
        }
        res.json(responseData);
      });
    })
  })
})

router.post("/:userid", function(request, response) {//this is Justin's testing of google APIs
  console.log(request.body);
  console.log(request.params);
  
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
    location: location,
    UserId: parseInt(request.params.userid)

  }).then(function(result) {
    // console.log({result});
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
    response.redirect("/users/manage/");
  })// end then
})//end router.delete


module.exports = router;