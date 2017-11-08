$(document).ready(function() {

  $(".delete-hotel").on("click", function(e) {
    e.preventDefault()
    var id = $(this).val()
    console.log(id)
    deleteHotel(id);
  })
});

var hotels = [];

// run this function on page load of /hotels getHotels();
// getHotels();

// function getHotels() {
//   $.get("/hotels", function(data) {
//     hotels = data;
//   })
// }//end getHotels

function deleteHotel(btnid) {
  queryURL = "/hotels/" + btnid + "?_method=DELETE"
  $.post(queryURL, function(response) {
    // getHotels();
  });
}//end deleteHotel