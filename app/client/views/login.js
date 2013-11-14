Template.login.events({
  'click #login-button' : function (e, t) {
    // retrieve the input field values
    var email = Utils.trimInput(t.find('#login-email').value);
    var password = t.find('#login-password').value;

    if (email === null || email === undefined || email === "") {
      Session.set("error",{message:"Please enter an email",show:true});
      return false;
    }

    if (password === null || password === undefined || password === "") {
      Session.set("error", {message: "Please enter a password",show:true});
      return false;
    }

    Meteor.loginWithPassword(email, password, function(err) {
      if (err) {
        if (err.reason === "Match failed") {
          err.reason = "Fill in all values";
        }
        Session.set("error", {message: err.reason || "Unknown Error", show: true});
      } else {
        Meteor.subscribe('calls');
        Meteor.subscribe('tags');
        Meteor.subscribe('photos');
      }
    });

    return false;
  },
  'click .change-forgot': function () {
    Session.set("forgot", !Session.get("forgot"));
    return false;
  },
  'click .send-forgot-btn': function () {
    var email = Utils.trimInput(document.getElementById("login-email-forgot").value);
    if (email === "") {
      Session.set("error", {message: "Please enter an email address", show: true});
      return false;
    }
    var validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (validEmail.test(email)) {
      Accounts.forgotPassword({email: email}, function (err) {
        if (err) {
          Session.set("error", {message: err.reason || "Unknown Error", show: true});
        } else {
          Session.set("error", {message: "Your reset token has been sent to your email address", show: true});
        }
      });
    } else {
      Session.set("error", {message: "Please enter a real email address", show: true});
    }
    return false;
  },
  'click #change-button': function () {
    var token = Utils.trimInput(document.getElementById("login-reset-token").value);
    var password = Utils.trimInput(document.getElementById("login-new-password").value);

    if (token === "" || password === "") {
      Session.set("error", {message: "Please enter your reset token & new password", show: true});
      return false;
    }

    Accounts.resetPassword(token, password, function (err) {
      if (err) {
        if (err.reason === "Token expired") {
          err.reason = "The token you entered has expired or is invalid";
        }
        Session.set("error", {message: err.reason || "Unknown Error", show: true});
      } else {
        Session.set("error", {message: "Your password has been changed successfully", show: true});
      }
    });

    return false;
  }
});

Template.login.helpers({
  forgot: function () {
    return Session.get("forgot");
  }
});