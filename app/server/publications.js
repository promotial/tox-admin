Meteor.publish('calls', function(userID) {
  if (this.userId) {
    return Calls.find({},{fields: {user: 0}});
  } else {
    check(userID, String);
    return Calls.find({user:userID}, [{fields: {operator: 0, status: 0}},{ sort: [["timestamp","asc"]] }]);
  };
});