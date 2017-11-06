//dependencies : require Express and Body Parser
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

//require our data models for syncing
var db = require("./models");

//initialize an Express application
var app = express();

//assign a port for the app
var PORT = process.env.PORT || 8050;

//set up Handlebars for our app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Set up Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//SSet a static directory
app.use(express.static("public"));

//require html and api routing
//require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
//require("./routes/spotcrime-route.js")(app);


//Sync our Sequelize models and starting our Express App
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

//listener for landing page
// app.get("/", function(req, res) {
//   res.render("index");
// });

//testing of landing page, will modularize this later ** Winfred
// app.get("/", function(req, res) {
//   res.render("login_signup");
// });

// //testing of create new user, will modularize this later ** Winfred
// app.post("/api/users", function(req, res) {
//     console.log(req.body);

//   db.User.create({
//     firstName : req.body.firstName,
//     lastName : req.body.lastName,
//     email: req.body.email,
//     userName: req.body.userName,
//     password: req.body.password
//     }).then(function(result){
//     res.json(result);
//   });
// });

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

    spotcrime.getCrimes(crimeLoc, .1, function(err, crimes){
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
