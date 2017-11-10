//event listeners for add user and search city buttons
$(document).ready(function() {

  //adding event listeners and attaching functions

  //listener for search  
  $(document).on("click", "#search-btn", searchCity);

  //listener for create new account submit button
  $("#add-user").on("click", addUser);

  //listener for existing user login
  $("#login-submit").on("click", function(event) {
    checkUser(event);
  });
});

// //avoid naming conflicts
// var Cookies2 = Cookies.noConflict();

//initialize city to be an empty object
var city = {};

//autocomplete city search function
$(function () {
  $("#f_elem_city").autocomplete({
    source: function (request, response) {
     $.getJSON(
      "https://gd.geobytes.com/AutoCompleteCity?key=a3cc0dbcc33d5ab9e28c3db728646ee7&callback=?&q="+request.term,
      function (data) {
       response(data);
      }
     );
    },
    minLength: 3,
    select: function (event, ui) {
     var selectedObj = ui.item;
     $("#f_elem_city").val(selectedObj.value);
    getcitydetails(selectedObj.value);
     return false;
    },
    open: function () {
     $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
    },
    close: function () {
     $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
    }
   });
   $("#f_elem_city").autocomplete("option", "delay", 100);
});
//end autocomplete

function addUser(event) {
  //prevent page from refreshing by default
  event.preventDefault();

  console.log("add new user listener triggered!");

  //make sure to reset the erro-divs to their invisible state
  $(".error-div").removeClass("visible").addClass("invisible");

  //grab the new account details provided in the form
  var firstName = $("#first-name-input").val().trim();
  var lastName = $("#last-name-input").val().trim();
  var email = $("#email-input").val().trim();
  var userName = $("#new-username-input").val().trim();
  var password = $("#new-password-input").val();
  var passConfirm = $("#new-password-confirm-input").val();

  //create a new use object
  var newUser = {
    firstName : firstName,
    lastName : lastName,
    email : email,
    userName : userName,
    password : password,
    passConfirm : passConfirm
  };

  if (password !== passConfirm) {
    //show the validation error on the browser
    console.log("there is a mismatch in passwords");
    $("#error-password-no-match").removeClass("invisible").addClass("visible");
  } //else send the POST request to the server
  else {
    //send the POST request to the server
    $.post("/users", newUser, function(data) {
      //if the insert is successful
      if ("outcome" in data) {
        //route to search page
        // console.log(data);
        Cookies2.set("UserID", data.user.id);
        window.location.href = "/search";
      } //else if there is a mismatch in password entered
      else if ("passwordIssue" in data) {
        console.log("there is a mismatch in password");
        //show the password validation error
        $("#error-password-no-match").removeClass("invisible").addClass("visible");
      } //else either the email, username or password already exists in the db
      else if ("firstName" in data) {
        console.log("The account info provided already exists");
        console.log(data);
        //if the first name already exists in the db
        if (data.userName === userName) {
          //show the username validation error
          $("#error-username").removeClass("invisible").addClass("visible");
        } //else if the password already exists in the db
        else if (data.password === password) {
          //show the password validation error
          $("#error-password-not-available").removeClass("invisible").addClass("visible");
        } //else if the email already exists
        else if (data.email === email) {
          //show the email validation error
          $("#error-email").removeClass("invisible").addClass("visible");
        }
      } else {
        console.log("There is something wrong with the info. The account cannot be added");
      }
    });
  }
}

function checkUser(event) {  
  //prevent page from refreshing by default
  event.preventDefault();

  //make sure to reset the error-divs to their invisible state
  $(".error-div-signup").removeClass("visible").addClass("invisible");

  console.log("checking for user in the database");

  //grab the username and password provided in the form
  var userNameInput = $("#input-user-name").val().trim();
  var passWordInput = $("#input-password").val();

  console.log('user name : ' + userNameInput);
  console.log('password : ' + passWordInput);

  var existingUser = {
    userName : userNameInput,
    password : passWordInput
  };

  // send the get request to the server
  $.post("/users/login", existingUser, function(data) { //this needs to be routed differently **JW
    console.log("I am getting my data back");
    console.log(data.validation);
    if(data.userId) {
      Cookies2.set("UserID", data.userId);
      window.location.href = "/search";
    }
    else {
      //else if there is no data returned (null), this means that the user name does not exist in db
      if (data.validation === "user name does not exist") {
        $("#error-username-not-exist").removeClass("invisible").addClass("visible");
      }
      //else if there is an issue with the provided password
      else if (data.validation === "passwords DO NOT match!") {
        $("#error-password-incorrect").removeClass("invisible").addClass("visible")
      }
    }
  });
}

//grab lat and lng from autocomplete
function searchCity() {
  city.start = $("#departure-input").val();
  city.end = $("#return-input").val();
  console.log(Cookies2.get("UserID"));
  var route = "/search/" + Cookies2.get("UserID");

  console.log(city);
  console.log(route);
  $.post(route, city, function(data) {
    console.log(data);
    initMap(city.location, data.hotelsData.results, data.crimeData)
  });
} //end searchCity

function getcitydetails(fqcn) {  
  if (typeof fqcn == "undefined") fqcn = jQuery("#f_elem_city").val();
  cityfqcn = fqcn;
  if (cityfqcn) {
    $.getJSON("https://gd.geobytes.com/GetCityDetails?key=a3cc0dbcc33d5ab9e28c3db728646ee7&callback=?&fqcn="+cityfqcn, function (data) {
      city = {
        location: {
          lat: data.geobyteslatitude, 
          lng: data.geobyteslongitude
        },
        name: data.geobytescity
      }
    });
  } //end if statement
} //end get city details