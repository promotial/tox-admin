Template.login.events({
  'submit #login-form' : function(e, t){
    e.preventDefault();
    
    var trimInput = function(val) {
      return val.replace(/^\s*|\s*$/g, "");
    }
    
    // retrieve the input field values
    var email = trimInput(t.find('#login-email').value);
    var password = t.find('#login-password').value;

    Meteor.loginWithPassword(email, password, function(err) {
      if (err) {
        console.log("Login Failed");
      }
    });

    return false; 
  }
});