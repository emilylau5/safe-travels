$(function() {

  $("#map").on("click", ".bookmark", function() {
    console.log($(this));
    var hotelSave = {
      name: $(this).data("name"),
      rating: $(this).data("rating"),
      city: city.name,
    }
    console.log(hotelSave);

    var route = "/users/" + 1 + "hotels";
    $.post(route, hotelSave, function(response) {
      console.log("posted");
    })

  });

})