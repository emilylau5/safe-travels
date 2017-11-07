$(document).ready(function() {

  $(".delete-hotel").on("click", function(e) {
    e.preventdefault()
    var id = $(this).val()
    console.log(id)
    deleteSearches(id);
  })
}

var search = [];

// run this function on page load of /hotels getHotels();
getHotels();

function getSearches() {
  $.get("/searches", function(data) {
    search = data;
  })
}//end getHotels

function deleteSearches(btnid) {
  queryURL = "/searches/" + btnid + "?_method=DELETE"
  $.post(queryURL, function(response) {
    getSearches();
  });
}//end deleteHote