Meteor.startup(function() {
  Session.setDefault("closedCalls","hide");
});

var Calls = [
  {
    name: "John Doe",
    age: 23,
    weight: 64,
    when: "2hrs 15m",
    gender: "male",
    mobile:"04112233445",
    location: "LOCATION",
    photos: "PHOTO LINKS",
    status: "new",
    urgency: 0,
  },
  {
    name:"Mary Soap",
    age:"23",
    weight:"64kg",
    when:"2hrs 15m",
    gender:"female",
    mobile:"04112233445",
    location:"LOCATION",
    photos:"PHOTO LINKS",
    status:"new",
    urgency:"0",
  },
  {
    name:"Mary Soap",
    age:"23",
    weight:"64kg",
    when:"2hrs 15m",
    gender:"female",
    mobile:"04112233445",
    location:"LOCATION",
    photos:"PHOTO LINKS",
    status:"new",
    urgency:"0",
  },
];

Template.callList.helpers({
  calls: Calls,
});

Template.closedCalls.helpers({
  calls: Calls,
  display: function() {return Session.get("closedCalls")},
});

Template.callItem.helpers({
  action: "Take",
});

Template.callView.helpers({
  extend: function() {
    if (Session.equals("closedCalls","hide")) {
      return "extend";
    };
  },
});