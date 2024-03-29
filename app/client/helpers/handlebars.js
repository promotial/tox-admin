Handlebars.registerHelper('callTimeAgo', function(date) {
  moment.lang(Session.get("language"));
  return moment(date).fromNow();
});

Handlebars.registerHelper('getOperatorInitials', function (operator) {
  if (!operator) { return "UD"; }
  if (Meteor.users.findOne(operator)) {
    var name = Meteor.users.findOne(operator).username;
  } else {
    return "UD";
  }
  return name.replace(/[^A-Z]/g, '');
});

Handlebars.registerHelper('getOperatorName', function (operator) {
  if (!operator) { return "User Deleted"; }
  if (Meteor.users.findOne(operator)) {
    return Meteor.users.findOne(operator).username;
  }
  return "User Deleted";
});

Handlebars.registerHelper('calendarTime', function(date) {
  return moment(date).calendar();
});

Handlebars.registerHelper('getDescription', function(name,date,age,sex,weight) {
  moment.lang(Session.get("language"));
  date = moment(date).format('h:mmA [on the] Do [of] MMMM YYYY');
  var sexName = multiLang("SEX_"+sex);
  var description = multiLang("DESCRIPTION");
  if (age === false) {
    age = "?";
  }
  if (weight === false) {
    weight = "?";
  }
  description = description.replace("_NAME_",name, "gi");
  description = description.replace("_DATE_",date, "gi");
  description = description.replace("_AGE_",age, "gi");
  description = description.replace("_SEX_",sexName, "gi");
  description = description.replace("_WEIGHT_",weight, "gi");
  return description;
});