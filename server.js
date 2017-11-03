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
   
  var client = new Client();

  var gMapsKey = 'AIzaSyD6aSsAsp9fRnCVn31vt9559Qz6S6dqYrM';

  var location = request.body.location.lat + "," + request.body.location.lng;
  var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
  queryURL += "query=hotel&key="
  queryURL += gMapsKey;
  queryURL += "&type=lodging&location=" + location;
  queryURL += "&radius=5000"

  client.get(queryURL, function(data) {
    console.log(data.results[0]);
    // var modData = function(data) {
      // for(index in data.results) {
      //   var geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json?place_id=";
      //   geoCodeURL += toString(data.results[index].id);
      //   geoCodeURL += "&key=" + gMapsKey;
      //   client.get(geoCodeURL, function(response) {
      //     console.log({geoCodeURL});
      //     console.log(response);
      //   })
      // }
    // }
    response.json(data);
  })

})
