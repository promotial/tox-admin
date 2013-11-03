Template.admin.events({
  'click #new-user': function(e,t) {
    params = {};
    params.username = trimInput(t.find('#new-name').value);
    params.email = trimInput(t.find('#new-email').value);
    params.password = trimInput(t.find('#new-password').value);
    params.profile = {admin:t.find('#new-admin').checked,language:"de"}

    if (params.email === null || params.email === undefined || params.email === "") {
      Session.set("error",{message:"Please enter an email",show:true});
      return false;
    }

    if (params.password === null || params.password === undefined || params.password === "") {
      Session.set("error",{message:"Please enter a password",show:true});
      return false;
    }

    if (params.username === null || params.username === undefined || params.username === "") {
      Session.set("error",{message:"Please enter a name",show:true});
      return false;
    }

    Meteor.call('newUser', params, function(err) {
      if (err) {
        if (err.reason === "Match failed") {
          err.reason = "Fill in all values";
        }
        Session.set("error",{message:(err.reason != null) ? err.reason:"Unknown Error",show:true});
      } else {
        //clear inputs
        t.find('#new-email').value="";
        t.find('#new-name').value="";
        t.find('#new-password').value="";
        t.find('#new-admin').checked=false;
      }
    });

    return false;
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
    return false;
  },
  'click .delete-account': function(e) {
    var id = e.currentTarget.id.substr(1);
    Meteor.users.remove(id);
    return false;
  }
});

Template.userItem.helpers({
  getEmail: function(emails) {
    return emails[0].address;
  }
});
