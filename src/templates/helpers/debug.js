define('templates/helpers/debug', ['handlebars'], function(
  Handlebars) {
  function debug(context, options) {
    console.log(
      'This : ', this);
    console.log(
      'Context : ', context
      //      'Variables referenced in this template: ',                     context.vars,
      //      'Partials/templates that this file directly depends on: ',     context.deps,
      //      'Helpers that this template directly depends on: ',            context.helpers,
      //      'The metadata object at the top of the file (if it exists): ', context.meta
    );
  }
  Handlebars.registerHelper('debug', debug);
  return debug;
});
