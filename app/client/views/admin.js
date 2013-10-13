Template.admin.events({
  'click #new-user': function(e,t) {
    Accounts.createUser({
      username: trimInput(t.find('#new-name').value),
      email: trimInput(t.find('#new-email').value),
      password: trimInput(t.find('#new-password').value),
      profile: {admin:t.find('#new-admin').checked,language:"en"}
    });

    //clear inputs
    t.find('#new-email').value="";
    t.find('#new-name').value="";
    t.find('#new-password').value="";
    t.find('#new-admin').checked=false;
  }
});

Template.admin.helpers({
  users: Meteor.users.find({_id:{$not:Meteor.userId()}})
});

Template.userItem.events({
  'click .save-changes': function(e,t) {
    var id = e.currentTarget.id.substr(1);

    var params = {
      emails: [{address:trimInput(t.find('#e'+id).value)}],
      username: trimInput(t.find('#n'+id).value),
      profile: {admin:t.find('#a'+id).checked}
    };

    Meteor.users.update(id,{$set:params});
  },
  'click .delete-account': function(e) {
    var id = e.currentTarget.id.substr(1);
    Meteor.users.remove(id);
  }
});

Template.userItem.helpers({
  getEmail: function(emails) {
    return emails[0].address;
  }
});
