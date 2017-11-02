var spotcrime = require('spotcrime');
 

var loc = {
  lat: 37.774929,
  lon: -122.419416
};
 
var radius = 5; // this is miles 
 
spotcrime.getCrimes(loc, radius, function(err, crimes){
 console.log(crimes)
});