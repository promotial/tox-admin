Template.login.events({
  'submit #login-form' : function(e, t){
    // retrieve the input field values
    var email = trimInput(t.find('#login-email').value);
    var password = t.find('#login-password').value;

    if (email === null || email === undefined || email === "") {
      Session.set("error",{message:"Please enter an email",show:true});
      return false;
    }

    if (password === null || password === undefined || password === "") {
      Session.set("error",{message:"Please enter a password",show:true});
      return false;
    }

    Meteor.loginWithPassword(email, password, function(err) {
      if (err) {
        if (err.reason === "Match failed") {
          err.reason = "Fill in all values";
        }
        Session.set("error",{message:(err.reason != null) ? err.reason:"Unknown Error",show:true});
      } else {
        Meteor.subscribe('calls');
        Meteor.subscribe('tags');
        Meteor.subscribe('photos');
      }
    });

    return false;
  }
});