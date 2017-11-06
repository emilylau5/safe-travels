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
    if(hotel.rating) {
      contentHTML += "<p>Rating: " + hotel.rating + "</p>";
    }
    contentHTML += "<p>Address: " + hotel.formatted_address + "</p>";
    contentHTML += '<button class="btn btn-primary bookmark" data-name="' + hotel.name + '" data-address="' + hotel.formatted_address + '" data-rating="' + hotel.rating + '">Bookmark</button>'
    
    var marker = new google.maps.Marker({
      position: {
        lat: parseFloat(hotel.geometry.location.lat),
        lng: parseFloat(hotel.geometry.location.lng)
      },
      map: map,
      windowContent: contentHTML,
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

  var heatmapData = [];
    for (var index in crimes) {
      // console.log(crimes[index].lat, crimes[index].lon)
      // var latLng = {
      //   lat: parseFloat(crimes[index].lat),
      //   lng: parseFloat(crimes[index].lon)
      // }
      var latLng = new google.maps.LatLng(crimes[index].lat, crimes[index].lon);
      var magnitude = crimes[index].type;
      var weight = .5;
      switch (magnitude) {
        case "Shooting" :
          weight = 2.5
          break;
        case "Burglary" :
           weight = 2
          break;
        case "Assault" :
          weight = 2
          break;
        case "Theft" :
          weight = 1.5
          break;
        case "Robbery" :
          weight = 1.5
          break;
        case "Arrest" :
          weight = 1
          break;
      }
      var weightedLoc = {
        location: latLng,
        weight: weight
      };
      heatmapData.push(weightedLoc);
    }
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    dissipating: true,
    map: map,
    radius: 60
  });
    
}