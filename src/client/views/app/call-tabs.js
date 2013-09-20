Meteor.startup(function() {
  Session.setDefault("closedCalls","hide");
  Session.setDefault("openList","pending");
  Session.setDefault("openCall", null);
  L.Icon.Default.imagePath = '/leaflet/images';
});

Template.callList.helpers({
  calls: function() {
    if (Session.equals("openList","pending")) {
      return Calls.find({status:"pending"}, { sort: [["timestamp","desc"]] });
    }
    else {
      return Calls.find({status:"active"}, { sort: [["urgency","desc"],["timestamp","desc"]] }); 
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
    return Calls.find({status:"closed"}, { sort: [["timestamp","desc"]] });
  },
  hide: function() {
    if (Session.equals("closedCalls","show")) {
      return "closed-show";
    };
  },
});

Template.callItem.helpers({
  action: "Action",
});

Template.callView.helpers({
  shrink: function() {
    if (Session.equals("closedCalls","show")) {
      return "call-view-shrink";
    };
  },
  call: function() {
    return Calls.findOne({_id:Session.get("openCall")});
  },
});

Template.callView.preserve(['#call-view-title','#call-tab-view']);

Template.callView.rendered = function() {
  var call = Calls.findOne({_id:Session.get("openCall")});
  var map = L.map('call-view-map').setView([call.loc.lat, call.loc.lon], 16);

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                   '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18
  }).addTo(map);
};

Template.noCallView.preserve(['#call-view-title','#call-tab-view']);

Template.noCallView.helpers({
  shrink: function() {
    if (Session.equals("closedCalls","show")) {
      return "call-view-shrink";
    };
  },
});


    
