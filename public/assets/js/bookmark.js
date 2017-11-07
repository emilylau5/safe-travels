$(function() {

  $("#map").on("click", ".bookmark", function() {
    console.log($(this));
    var hotelSave = {
      name: $(this).data("name"),
      rating: $(this).data("rating"),
      city: city.name,
    }
    console.log(hotelSave);

    var route = "/users/" + Cookies2.get("UserID") + "/hotels";
    $.post(route, hotelSave, function(response) {
      console.log("posted");
      console.log(response);
    })

  });

})