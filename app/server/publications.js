Meteor.publish('calls', function(userID) {
  if (this.userId) {
    return Calls.find({},{fields: {user: 0}});
  } else if (userID) {
    check(userID, String);
    return Calls.find({user:userID}, [{fields: {operator: 0, status: 0}},{ sort: [["timestamp","asc"]] }]);
  } else {
    return Calls.find({user:"foo"});
  }
});

Meteor.publish("userData", function () {
  if (this.userId) {
    if (Meteor.users.findOne(this.userId).profile.admin) {
      return Meteor.users.find({_id: this.userId});
    }
  }
  return Meteor.users.find({_id: this.userId},
      {fields: {'profile.admin':0}});
});

Meteor.publish('userList', function() {
  if (this.userId) {
    if (Meteor.users.findOne(this.userId).profile.admin) {
      return Meteor.users.find({});
    }
  }
});

Meteor.publish('tags', function() {
  if (this.userId) {
    return Tags.find({});
  }
});

