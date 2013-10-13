Meteor.startup(function() {
  Session.setDefault("closedCalls","hide");
  Session.setDefault("openList","pending");
  Session.setDefault("openCall", null);
  Session.set("language","en");
  Session.set("settings",false);
  L.Icon.Default.imagePath = '/leaflet/images';
  Meteor.subscribe('calls');
  Meteor.subscribe('userList');
});
