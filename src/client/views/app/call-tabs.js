Meteor.startup(function() {
  Session.setDefault("closedCalls","hide");
  L.Icon.Default.imagePath = '/leaflet/images'
  Session.setDefault("openList","pending")
});

Template.callList.helpers({
  calls: function() {
    if (Session.equals("openList","pending")) {
      return Calls.find({status:"pending"});
    }
    else {
      return Calls.find({status:"active"}); 
    };
  },
  pending: function() {
    if (Session.equals("openList","pending")) {
      return "open-list";
    }; 
  },
  active: function() {
    if (Session.equals("openList","active")) {
      return "open-list";
    };
  },
});

Template.callList.events({
  //show pending calls
  'click .call-list-button-pending': function (event) {Session.set("openList","pending")},
  //show active calls
  'click .call-list-button-active': function (event) {Session.set("openList","active")},
});

Template.closedCalls.preserve(['#call-tab-closed','#closed-calls-title']);

Template.closedCalls.helpers({
  calls: function() {
    return Calls.find({status:"closed"});
  },
  hide: function() {
    if (Session.equals("closedCalls","show")) {
      return "closed-show";
    };
  },
});

Template.callItem.helpers({
  action: "Take",
});

Template.callView.preserve(['#call-view']);

Template.callView.helpers({
  shrink: function() {
    if (Session.equals("closedCalls","show")) {
      return "call-view-shrink";
    };
  },
});

Template.callView.rendered = function() {
  var map = L.map('call-view-map').setView([51.505, -0.09], 16);

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                   '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18
  }).addTo(map);
};



    
