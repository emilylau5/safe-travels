//dependencies : require Express and Body Parser
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");

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

//telling methodOverride to check if there's an overriding method to our requests
app.use(methodOverride('_method'));

//Set a static directory
app.use(express.static("public"));

var userRoutes = require("./routes/user-routes.js");
var searchRoutes = require("./routes/search-routes.js");
var hotelRoutes = require("./routes/hotel-routes.js");

app.get("/", function(req, res) {
  console.log(req.headers.cookie);
  if(!req.headers.cookie) {
    res.render("login_signup");
  }
  else {
    var cookieString = req.headers.cookie.split("=");
    var userID = cookieString[1];
    console.log({userID});
    // res.json(req.headers.cookie);
    res.redirect("/search");
  }
});
app.use("/users", userRoutes);
app.use("/search", searchRoutes);
app.use("/hotels", hotelRoutes);

//Sync our Sequelize models and starting our Express App
db.sequelize.sync(/*{force: true}*/).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


