Template.topNav.events({
  //closed calls tab toggle button
  'click #closed-calls-toggle': function () {
    if (Session.equals("closedCalls","hide")) {
      Session.set("closedCalls","show");
    }
    else {Session.set("closedCalls","hide");};
  },
  //log out button
  'click #logout-btn': function () {
    Meteor.logout();
    Router.go("/");
  },
  //settings button
  'click #settings-btn': function () {
    if (Session.get("settings")) {
      Session.set("settings",false);
    } else {Session.set("settings","menu");}
  }
});
