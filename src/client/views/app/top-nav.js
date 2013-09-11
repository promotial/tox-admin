Template.topNav.events({
  //closed calls tab toggle button
  'click #closed-calls-toggle': function (event) {
  	if (Session.equals("closedCalls","hide")) {
      Session.set("closedCalls","show")
  	}
    else {Session.set("closedCalls","hide")};
  },
});