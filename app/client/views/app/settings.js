Template.settings.events({
  'click .settings-close': function() {
    Session.set("settings",false);
  },
  'click .settings-back': function() {
    Session.set("settings","menu");
  }
});

Template.settings.helpers({
  settings: function() {
    return Session.get("settings");
  },
  menu: function() {
    return Session.equals("settings","menu");
  },
  lang: function() {
    return Session.equals("settings","lang");
  },
  tags: function() {
    return Session.equals("settings","tags");
  },
  pass: function() {
    return Session.equals("settings","pass");
  }
});

Template.settingsMenu.events({
  'click #change-language': function() {
    Session.set("settings","lang");
  },
  'click #edit-tags': function() {
    Session.set("settings","tags");
  },
  'click #change-password': function() {
    Session.set("settings","pass");
  }
});

Template.settingsLang.events({
  'click .settings-menuitem': function(e) {
    Meteor.users.update(Meteor.userId(),{$set:{profile:{language:e.currentTarget.id}}});
  }
});

Template.settingsLang.helpers({
  en: function() {
    return (Meteor.user().profile.language==="en");
  },
  de: function() {
    return (Meteor.user().profile.language==="de");
  },
  fr: function() {
    return (Meteor.user().profile.language==="fr");
  }
});