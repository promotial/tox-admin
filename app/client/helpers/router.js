userDocHandle = {
  ready: function () {
    if(!Accounts.loginServicesConfigured())
      return false;
    if(Meteor.loggingIn()) {
      return false;
    }
    return true;
  }
};

Router.configure({
  layoutTemplate: 'layout',

  //redirects users that aren't logged in to login page (all paths)
  before: function () {
    if (!Meteor.user()) {

      // render the login template but keep the url in the browser the same
      this.render('login');

      // stop the rest of the before hooks and the action function 
      this.stop();
    }
  },

  //check user isn't logging in when doing login checks
  waitOn: function() {return userDocHandle;}
});

Router.map(function () {
  //admin interface
  this.route('admin', {
    path: '/admin',
    before: function () {
      if (!Meteor.user().profile.admin) {
        // redirect to app
        this.redirect("/");
      }
    }
  });
  
  //individual call view by id
  this.route('callView', {
    path: '/calls/:_id',
    before: function() {
      //redirect users back to app "/" if call doesn't exist
      if ( !Calls.findOne({_id: this.params._id}) ) {
        this.redirect("/");
      }
    },
    action: function () {
      //data property can't yet change context of child yields so using session
      Session.set("openCall",this.params._id)

      //render app and then call view template
      this.render("app");
      this.render('callView', { to: 'callTab' });
    }
  });
  
  //routes "/" to app 
  this.route('app', {
    path: '/',
    yieldTemplates: { 'noCallView': {to: 'callTab'} }
  });

  //redirect all other urls to app ("/")
  this.route('notFound', {
    path: '*',
    action: function () {
      this.redirect("/");
    }
  });
});