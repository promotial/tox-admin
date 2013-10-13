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

Template.settingsTags.events({
  'click .tags-save': function(e,t) {
    var number = Number(e.currentTarget.id);
    var value = trimInput(t.find('#val-'+number).value);
    var id = Tags.findOne({number:number})._id;
    Tags.update(id,{$set:{value:value}});
  }
});

Template.settingsTags.helpers({
  urgency: function(number) {
    return Tags.findOne({number:number}).value;
  }
});