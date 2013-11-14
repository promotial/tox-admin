Meteor.users.allow({
  update: function () {
    return true;
  },
  remove: function (userId, doc) {
    if (!userId || doc._id === userId ) {return false;}
    return Meteor.users.findOne({_id: userId}).profile.admin;
  }
});