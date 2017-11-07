
var hotels = [];

// run this function on page load of /hotels getHotels();
// getHotels();

function rowPerHotel() {
  var newDiv = $("<div>")
  var newRow;
  for(index in hotels) {
    newRow = $("<li>" + hotels[index]).append("<button class='delete btn btn-default'>x</button>")
    newDiv.append(newRow)
  }
}

function getHotels() {
  $.get("/hotels", function(data) {
    hotels = data;
    rowPerHotel();
  })
}//end getHotels

function deleteHotel(event) {
  event.stopPropagation();
  var id = $(this).data("id");
  queryURL = "/hotels/" + id + "?_method=DELETE"
  $.post(queryURL, function(response) {
    getHotels();
  });
}//end deleteHote