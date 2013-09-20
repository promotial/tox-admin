Handlebars.registerHelper('callTime', function(date) {
  moment.lang('en');
  return moment(date).format('h:mm a [on the] Do [of] MMMM YYYY');
});