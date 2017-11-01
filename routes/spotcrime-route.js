var spotcrime = require('spotcrime');
 

var loc = {
  lat: //user input,
  lon: //user input
};
 
var radius = 2; // this is miles 
 
spotcrime.getCrimes(loc, radius, function(err, crimes){
 
});