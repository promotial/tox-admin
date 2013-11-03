Meteor.startup(function() {
  //Set default session values
  Session.setDefault("closedCalls","hide");
  Session.setDefault("openList","pending");
  Session.setDefault("language","de");
  Session.setDefault("openCall", null);
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
});


