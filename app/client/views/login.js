Template.login.events({
  'submit #login-form' : function(e, t){
    e.preventDefault();
    
    // retrieve the input field values
    var email = trimInput(t.find('#login-email').value);
    var password = t.find('#login-password').value;

    Meteor.loginWithPassword(email, password, function(err) {
      if (err) {
        console.log("Login Failed");
      } else {
        Meteor.subscribe('calls');
        Meteor.subscribe('tags');
      }
    });

    return false;
  }
});