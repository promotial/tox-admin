Meteor.publish('calls', function() {
  return Calls.find();
});