Meteor.setInterval(function() {
  var photos, calls, i;
  photos = Photos.find({}).fetch();
  calls = Calls.find({}).fetch();

  for (i = 0; i < photos.length; i += 1) {
    if (!(Calls.findOne({photos:photos[i]._id}))) {
      Photos.remove(photos[i]._id);
    }
  }

  for (i = 0; i < calls.length; i += 1) {
    if (calls[i].status === "active" && !(Meteor.users.findOne(calls[i].operator))) {
      Calls.update(calls[i]._id, {$set: {status: "closed", operator: false} });
    }
  }
}, 200000);