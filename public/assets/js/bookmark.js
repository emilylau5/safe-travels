$(function() {

  $("#map").on("click", ".bookmark", function() {
    console.log($(this));
    var hotelSave = {
      name: $(this).data("name"),
      city: city.name,
    }
    if($(this).data("rating")!== "undefined") {
      hotelSave.rating = $(this).data("rating");
    }
    console.log(hotelSave);

    var route = "/users/" + Cookies2.get("UserID") + "/hotels";
    $.post(route, hotelSave, function(response) {
      console.log("posted");
      console.log(response);
    })

  });

})