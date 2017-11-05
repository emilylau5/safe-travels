var express = require("express");
var bodyParser = require("body-parser");


var app = express();

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var PORT = process.env.PORT || 8050;

var db = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

//listener for 
app.get("/", function(req, res) {
  res.render("index");
});

app.post("/search", function(request, response) {//this is Justin's testing of google APIs
  console.log(request.body);

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

  var hotelsData = {};
  client.get(queryURL, function(data) {
    // console.log(data);
    // for(index in data.results) { //trying to get the website for the places because the search results don't contain it
    //   var placeURL = "https://maps.googleapis.com/maps/api/place/details/json?";
    //   placeURL += "key="
    //   placeURL += gMapsKey;
    //   placeURL += "&placeid=" + data.results[index].place_id;
    //   // console.log(placeURL);
    //   client.get(placeURL, function(data) {
    //     data.results[index].url = data.result.website;
    //     console.log(data.results[index]);
    //   })
    // }
    var responseData = {
      hotelsData: data,
    }

    var crimeLoc = {
      lat: parseFloat(request.body.location.lat),
      lon: parseFloat(request.body.location.lng)
    }

    spotcrime.getCrimes(crimeLoc, 1, function(err, crimes){
      if(err) {
        throw err;
        console.log("error getting crime data");
      }
      console.log(crimes);
      responseData.crimeData = crimes;
      response.json(responseData);
    });

  })
  
})
