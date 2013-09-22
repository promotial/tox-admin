Handlebars.registerHelper('callTime', function(date) {
  moment.lang('en');
  return moment(date).format('h:mmA [on the] Do [of] MMMM YYYY');
});

Handlebars.registerHelper('callTimeShort', function(date) {
  moment.lang('en');
  return moment(date).fromNow();
});