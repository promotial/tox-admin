Tags = new Meteor.Collection('tags');

Tags.allow({
  update: function(userId,doc,fieldNames) {
    return (_.without(fieldNames,'value').length===0);
  }
});

