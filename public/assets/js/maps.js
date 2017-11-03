function initMap(centeredOn, hotels, crimes) {
  // console.log(centeredOn);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {
      lat: parseFloat(centeredOn.lat),
      lng: parseFloat(centeredOn.lng)
      // lat: 37.786784,
      // lng: -122.408715
    }
  });
  console.log(map);
  for(index in hotels) {
    
    var marker = new google.maps.Marker({
      position: {
        lat: parseFloat(hotels[index].geometry.location.lat),
        lng: parseFloat(hotels[index].geometry.location.lng)
      },
      map: map,
      // icon: hotels[index].icon
    });

    var contentHTML = "<h2>" + hotels[index].name + "</h2><br>";
    contentHTML += "<p>Rating: " + hotels[index].rating + "</p>";
    contentHTML += "<p>Address: " + hotels[index].formatted_address + "</p>";

    var infowindow = new google.maps.InfoWindow({
      content: contentHTML,

    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }
  console.log("for loop done");
}