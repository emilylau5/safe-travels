$(document).ready(function() {

  $(".delete-search").on("click", function(e) {
    e.preventDefault()
    var id = $(this).val()
    console.log(id)
    deleteSearches(id);
  })

  $("#past").on("click", "a", function(event) {
    console.log("search clicked!");
    // event.preventDefault();
    var searchID = $(this).data("search-id");
    reSearch(searchID);
  })
});

var search = [];

// run this function on page load of /hotels getHotels();
// getHotels();

function getSearches() {
  $.get("/searches", function(data) {
    search = data;
  })
}//end getHotels

function deleteSearches(btnid) {
  queryURL = "/search/" + btnid + "?_method=DELETE"

  $.post(queryURL, function(response) {
    // getSearches();
    window.location.reload();
  });
}//end deleteSearch

function reSearch(id) {
  $.get("/search/" + id, function(data) {
    console.log(data);
    initMap(data.location, data.hotelsData.results, data.crimeData);
  })
}

function logout() {
  Cookies2.remove("UserID");
  window.location.reload();
}