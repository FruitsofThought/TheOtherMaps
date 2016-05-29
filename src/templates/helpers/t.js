define('templates/helpers/t', ['handlebars', 'ourpolyglot'], function(
  Handlebars, Polyglot) {
  function t(context, options) {
    return Polyglot.t(context);
  }
  Handlebars.registerHelper('t', t);
  return t;
});
