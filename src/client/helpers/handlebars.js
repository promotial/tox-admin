Handlebars.registerHelper('callTime', function(date) {
  moment.lang('en');
  return moment(date).format('h:mmA [on the] Do [of] MMMM YYYY');
});

Handlebars.registerHelper('callTimeAgo', function(date) {
  moment.lang('en');
  return moment(date).fromNow();
});

Handlebars.registerHelper('getInitials', function(name) {
  return name.replace(/[^A-Z]/g, '');
});