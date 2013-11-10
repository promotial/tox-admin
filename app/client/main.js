Meteor.startup(function() {
  //Set default session values
  Session.setDefault("closedCalls","hide");
  Session.setDefault("openList","pending");
  Session.setDefault("language","de");
  Session.setDefault("openCall", null);
  Session.set("error",{message:"No Errors",show:false})
  Session.set("settings",false);
  Session.set("began",new Date());

  //Set leaflet image path
  L.Icon.Default.imagePath = '/leaflet/images';

  //Subscribe to meteor collections
  Meteor.subscribe('calls');
  Meteor.subscribe('userList');
  Meteor.subscribe('tags');
  Meteor.subscribe('photos');

  //Add alert sound
  var alertSound = new buzz.sound( "/sounds/alert", {
    formats: [ "ogg", "mp3", "aac" ]
  });

  // Play sound on new call
  Calls.find({}).observeChanges({
    added: function (id,fields) {
      if (fields.timestamp > Session.get("began").getTime()) {
        alertSound.play();
      }
    }
  });

  //Sets language after user logs in
  Deps.autorun(function () {
    if (Meteor.user()) {
      Session.set("language",Meteor.user().profile.language);
      Session.set("began",new Date());
    }
  });

  //Reset errors after 6 seconds
  Deps.autorun(function () {
    var errorVal = Session.get("error");
    var errorTimeout;

    var hideError = function() {
      errorVal = Session.get("error");
      errorVal.show = false;
      Session.set("error",errorVal);
    }

    if (errorVal.show === true) {
      if (errorTimeout) {
        Meteor.clearTimeout(errorTimeout);
      }
      errorTimeout = Meteor.setTimeout(hideError, 2500);
    }
  });
});

Template.layout.helpers({
  error: function() {
    return Session.get("error");
  }
});

Template.layout.preserve(['#alert']);
