Calls = new Meteor.Collection('calls');

Calls.allow({
  update: function(userId,doc,fieldNames,modifier) {   
    return (_.without(fieldNames,'status','urgency','operator').length===0);
  }
});

Calls.deny({
  update: function(userId,doc,fieldNames,modifier) {
    if (!userId) {return true};
    if (!( _.isEmpty(_.omit(modifier,'$set')))) {return true};
    var status=modifier['$set'].status; var urgency=modifier['$set'].urgency; var operator=modifier['$set'].operator; var you=Meteor.users.findOne({_id: userId}).username;
    if (status) {if (!(status==="pending" || status==="active" || status==="closed")) {return true}; };
    if (urgency) {if (!(urgency >= 0 && urgency <= 4)) {return true}; };
    if (operator) {if ( !( (doc.operator===false || doc.operator===you) && (operator===you || operator===false)) ) {return true}; };
    if (operator===false) {if (! (status==="pending") ) {return true}};
    if (operator===you) {if (! (status==="active") ) {return true}};
    if (status==="pending") {if (! (operator===false) ) {return true}}; 
    if (status==="active" && doc.status !== "closed") {if (! (operator===you) ) {return true}}; 
    if (status==="closed") {if (! (doc.operator===you) ) {return true}}; 
    return false;
  }
});