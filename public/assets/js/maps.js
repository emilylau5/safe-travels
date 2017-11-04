function initMap(centeredOn, hotels, crimes) {
  // console.log(centeredOn);
  var infowindow = new google.maps.InfoWindow();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {
      lat: parseFloat(centeredOn.lat),
      lng: parseFloat(centeredOn.lng)
      // lat: 37.786784,
      // lng: -122.408715
    }
  });

  function placeMarker (hotel) {
    var contentHTML = "<h3>" + hotel.name + "</h3><br>";
    contentHTML += "<p>Rating: " + hotel.rating + "</p>";
    contentHTML += "<p>Address: " + hotel.formatted_address + "</p>";
    
    var marker = new google.maps.Marker({
      position: {
        lat: parseFloat(hotel.geometry.location.lat),
        lng: parseFloat(hotel.geometry.location.lng)
      },
      map: map,
      windowContent: contentHTML
      // icon: hotels[index].icon
    });

    google.maps.event.addListener(marker, "click", function() {
      infowindow.close();
      infowindow.setContent(this.windowContent);
      infowindow.open(map,marker);
    });
  }

  for (index in hotels) {
    placeMarker(hotels[index]);
  }
    
  console.log("for loop done");
}