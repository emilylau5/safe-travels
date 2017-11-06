function hashThisPass(){
  var credential = require('credential'),
    pw = credential(),
    newPassword = USER INPUT;
   
  pw.hash(newPassword, function (err, hash) {
    if (err) { throw err; }
    //hash should be the password already
    console.log('Store the password hash.', hash);
  });
} // end function hashthispass