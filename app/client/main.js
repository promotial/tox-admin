Meteor.startup(function() {
  Session.setDefault("closedCalls","hide");
  Session.setDefault("openList","pending");
  Session.setDefault("language","en");
  Session.setDefault("openCall", null);
  Session.set("settings",false);
  L.Icon.Default.imagePath = '/leaflet/images';
  Meteor.subscribe('calls');
  Meteor.subscribe('userList');
  Deps.autorun(function () {
    if (Meteor.user()) {
      Session.set("language",Meteor.user().profile.language);
    }
  });
});
