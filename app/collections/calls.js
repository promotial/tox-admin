Calls = new Meteor.Collection('calls');

Calls.allow({
  update: function(userId,doc,fieldNames,modifier) {   
    return (_.without(fieldNames,'status','urgency','operator').length===0);
  },
  remove: function(userId,doc) {
    return true;
  }
});

Calls.deny({
  update: function(userId,doc,fieldNames,modifier) {
    if (!userId) {return true}
    if (!( _.isEmpty(_.omit(modifier,'$set')))) {return true}
    var status=modifier['$set'].status; var urgency=modifier['$set'].urgency; var operator=modifier['$set'].operator;
    if (status) {if (!(status==="pending" || status==="active" || status==="closed")) {return true}}
    if (urgency) {if (!(urgency >= 0 && urgency <= 4)) {return true} }
    if (operator) {if ( !( (doc.operator===false || doc.operator===userId) && (operator===userId || operator===false)) ) {return true} }
    if (operator===false) {if (! (status==="pending") ) {return true}}
    if (operator===userId) {if (! (status==="active") ) {return true}}
    if (status==="pending") {if (! (operator===false) ) {return true}}
    if (status==="active" && doc.status !== "closed") {if (! (operator===userId) ) {return true}}
    if (status==="closed") {if (! (doc.operator===userId) ) {return true}}
    return false;
  },
  remove: function(userId,doc) {
    return !userId;
  }
});