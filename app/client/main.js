Meteor.startup(function() {
  //Set default session values
  Session.setDefault("closedCalls","hide");
  Session.setDefault("openList","pending");
  Session.setDefault("language","de");
  Session.setDefault("openCall", null);
  Session.set("error",{message:"No Errors",show:false})
  Session.set("settings",false);
  var now = new Date();
  Session.set("began",now.getTime());

  //Set leaflet image path
  L.Icon.Default.imagePath = '/leaflet/images';

  //Subscribe to meteor collections
  Meteor.subscribe('calls');
  Meteor.subscribe('userList');
  Meteor.subscribe('tags');

  //Sets language after user logs in
  Deps.autorun(function () {
    if (Meteor.user()) {
      Session.set("language",Meteor.user().profile.language);
    }
  });

  //Add alert sound
  var alertSound = new buzz.sound( "/sounds/alert", {
    formats: [ "ogg", "mp3", "aac" ]
  });

  //Play sound on new call
  Deps.autorun(function () {
    var latest = _.max(Calls.find().fetch(), function (call) {
      return call.timestamp;
    });
    if (latest.status === "pending" && latest.timestamp > Session.get("began"))
      alertSound.play();
  });

  //Reset errors after 6 seconds
  Deps.autorun(function () {
    var errorVal = Session.get("error");

    var hideError = function() {
      var errorVal = Session.get("error");
      errorVal.show = false;
      Session.set("error",errorVal);
    }

    if (errorVal.show === true) {
      if (errorTimeout) {
        Meteor.clearTimeout(errorTimeout);
      }
      var errorTimeout = Meteor.setTimeout(hideError, 2500)
    }
  });
});

Template.layout.helpers({
  error: function() {
    return Session.get("error");
  }
});

Template.layout.preserve(['#alert']);


