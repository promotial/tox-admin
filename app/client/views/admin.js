Template.admin.events({
});

Template.admin.helpers({
  users: Meteor.users.find()
});

Template.userItem.helpers({
  getEmail: function(emails) {
    return emails[0].address;
  }
});
