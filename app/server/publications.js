Meteor.publish('calls', function(userID) {
  if (this.userId) {
    return Calls.find({},{fields: {user: 0}});
  } else if (userID) {
    check(userID, String);
    return Calls.find({user:userID}, [{fields: {urgency:0, operator: 0, status: 0}},{ sort: [["timestamp","asc"]] }]);
  } else {
    return Calls.find({user:"foo"});
  }
});

Meteor.publish("userData", function () {
  if (this.userId) {
    if (Meteor.users.findOne(this.userId).profile.admin) {
      return Meteor.users.find({ fields: { "services.resume": 0 } });
    } else {
      return Meteor.users.find({_id: this.userId}, {fields: {"services.resume": 0, "profile.admin": 0 } });
    }
  }
});

Meteor.publish('tags', function() {
  if (this.userId) {
    return Tags.find({});
  }
});

Meteor.publish('photos', function() {
  if (this.userId) {
    return Photos.find({});
  }
});
