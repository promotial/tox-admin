Meteor.users.allow({
  remove: function () {
    return true;
  },
  update: function () {
    return true;
  }
});