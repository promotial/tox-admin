Handlebars.registerHelper('callTimeAgo', function(date) {
  moment.lang(Session.get("language"));
  return moment(date).fromNow();
});

Handlebars.registerHelper('getInitials', function(name) {
  return name.replace(/[^A-Z]/g, '');
});

Handlebars.registerHelper('getDescription', function(name,date,age,sex,weight) {
  moment.lang(Session.get("language"));
  date = moment(date).format('h:mmA [on the] Do [of] MMMM YYYY');
  var description = multiLang("DESCRIPTION");
  description = description.replace("_NAME_",name, "gi");
  description = description.replace("_DATE_",date, "gi");
  description = description.replace("_AGE_",age, "gi");
  description = description.replace("_SEX_",sex, "gi");
  description = description.replace("_WEIGHT_",weight, "gi");
  return description;
});