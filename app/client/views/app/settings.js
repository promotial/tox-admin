Template.settings.events({
  'click .settings-close': function() {
    Session.set("settings",false);
  }
});

Template.settings.helpers({
  settings: function() {
    return Session.get("settings");
  }
});
