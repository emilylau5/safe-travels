var spotcrime = require('spotcrime');
 

var loc = {
  lat: 34.045200,
  lon: -118.283997
};
 
var radius = 1; // this is miles 
 
spotcrime.getCrimes(loc, radius, function(err, crimes){
 console.log(crimes)
});

// 34.085319, -118.143546
//:
// lat:"34.045200"
// lng:"-118.283997"