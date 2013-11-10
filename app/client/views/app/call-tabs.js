Template.callList.helpers({
  calls: function() {
    if (Session.equals("openList","pending")) {
      return Calls.find({status:"pending"}, { sort: [["timestamp","asc"]] });
    }
    else {
      return Calls.find({status:"active"}, { sort: [["urgency","desc"],["timestamp","asc"]] });
    }
  },
  pending: function() {
    if (Session.equals("openList","pending")) {
      return "open-list";
    }
  },
  active: function() {
    if (Session.equals("openList","active")) {
      return "open-list";
    }
  }
});

Template.callList.events({
  //show pending calls
  'click .call-list-button-pending': function (event) {Session.set("openList","pending");},
  //show active calls
  'click .call-list-button-active': function (event) {Session.set("openList","active");}
});

Template.closedCalls.preserve(['#call-tab-closed','#closed-calls-title']);

Template.closedCalls.helpers({
  calls: function() {
    return Calls.find({status:"closed"}, { sort: [["timestamp","desc"]] });
  },
  hide: function() {
    if (Session.equals("closedCalls","show")) {
      return "closed-show";
    }
  }
});

Template.callItem.helpers({
  action: function(status) {
    var actionVal;
    switch(status) {
      case "pending": actionVal = multiLang("TAKE");   break;
      case "active" : actionVal = multiLang("CLOSE");  break;
      case "closed" : actionVal = multiLang("DELETE"); break;
    }
    return actionVal;
  },
  assignedAction: function(status) {
    var actionVal;
    switch(status) {
      case "active" : actionVal=multiLang("LEAVE"); break;
      case "closed" : actionVal=multiLang("OPEN"); break;
    }
    return actionVal;
  },
  notTaken: function(status) {
    if (status!=="pending") {
      return true;
    }
    return false;
  },
  notClosed: function(status) {
    if (status!=="closed") {
      return true;
    }
    return false;
  },
  myCall: function(operator) {
    if (Meteor.userId() === operator) {
      return true;
    }
    return false;
  },
  selected: function(id) {
    if (Session.get("openCall") === id) {
      return true;
    }
    return false;
  }
});

Template.callItem.events({
  "click #call-item-action-btn": function() {
    if (this.status === "pending") {
      Calls.update(this._id, {
        $set: {status:"active", operator:Meteor.userId()}
      });
      Router.go("/calls/"+this._id);
      Session.set("openList","active");
    } else if (this.status === "active" && this.operator==Meteor.userId()) {
      Calls.update(this._id, {
        $set: {status:"closed"}
      });
      if (Session.equals("openCall",this._id)) {
        Router.go("/");
      }
    } else if (this.status === "closed") {
      Calls.remove(this._id);
      if (Session.equals("openCall",this._id)) {
        Router.go("/");
      }
    };
  },
  "click #call-item-assigned-action": function() {
    if (this.status === "active") {
      Calls.update(this._id, {
        $set: {status:"pending", operator:false, urgency:0}
      });
      Router.go("/");
      Session.set("openList","pending");
    } else if (this.status === "closed") {
      Calls.update(this._id, {
        $set: {status:"active"}
      });
      Router.go("/calls/"+this._id);
      Session.set("openList","active");
    }
  }
});


Template.callView.helpers({
  shrink: function() {
    if (Session.equals("closedCalls","show")) {
      return "call-view-shrink";
    }
  },
  call: function() {
    return Calls.findOne({_id:Session.get("openCall")});
  },
  urgency: function(number) {
    return Tags.findOne({number:number}).value;
  },
  isPending: function(status) {
    return (status==="pending");
  },
  getImages: function(photos) {
    return Photos.find({_id:{$in:photos}});
  },
  isOne: function(val) {
    return (val===1);
  }
});

Template.callView.preserve(['#call-view-title','#call-tab-view']);

Template.callView.rendered = function() {
  var call = Calls.findOne({_id:Session.get("openCall")});

  if (call) {
    document.getElementById("call-view-urgency").selectedIndex = call.urgency;

    var map = L.map('call-view-map').setView([call.loc.lat, call.loc.lon], 16);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18
    }).addTo(map);

    var marker = L.marker([call.loc.lat, call.loc.lon]).addTo(map);

    HTTP.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + call.loc.lat + "," + call.loc.lon + "&sensor=false", function(error,result) {
      if (result) {
        callerLoc = result.data.results[0].formatted_address;
        marker.bindPopup(callerLoc).openPopup();
      }
    });

    marker.bindPopup(call.loc.lat + ", " + call.loc.lon).openPopup();
  }

  Deps.autorun(function() {
    Session.get("closedCalls");
    var renderAgain = function(){map.invalidateSize();};
    Meteor.setTimeout(renderAgain,1550);
  });
};

Template.callView.events({
  "change #call-view-urgency": function() {
    Calls.update(this._id, {
      $set: {urgency: document.getElementById("call-view-urgency").selectedIndex}
    });
  },
  "click .send-btn": function(e,t) {
    var commentsInput = t.find('.call-view-comments-input');
    Meteor.call("newComment",commentsInput.value,Session.get("openCall"),
      function(e,r) {
        if (e) {
          console.log(e.reason);
        } else {commentsInput.value = "";}
      }
    );
  }
});

Template.noCallView.preserve(['#call-view-title','#call-tab-view']);

Template.noCallView.helpers({
  shrink: function() {
    if (Session.equals("closedCalls","show")) {
      return "call-view-shrink";
    }
  }
});


    
