$(document).ready(function() {
  //adding event listeners and attaching functions
  $(document).on("click", "#add-user", addUser);


  // functions

  function addUser(event) {
    event.preventDefault();
    var pass = $("#password-input").val();
    var passConfirm = $("#Confirm-password-input").val();
    if(pass === passConfirm){
      var User = sequelize.define("User", {
        userName: $("#username-input").val(),
        password: pass,
        email: $("#email-input").val(),
      });
      $.post("ROUTE", addUser);
    }
    else {
      alert("Passwords do not match")
    }
  };
})