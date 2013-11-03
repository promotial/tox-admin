Meteor.users.allow({
  remove: function () {
    return true;
  },
  update: function () {
    return true;
  }
});

Meteor.users.deny({
  remove: function (userId,doc) {
    if (!userId) {return true;}
    if (doc._id === userId) {return true;}
    if (Meteor.users.findOne({_id: userId}).profile.admin !== true) {
      return true;
    }
    return false;
  }
});