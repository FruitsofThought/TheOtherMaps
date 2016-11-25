define('templates/helpers/t', ['handlebars', 'promise!tomPolyglot'], function(
  Handlebars, Polyglot) {
  function t(context, options) {
    return Polyglot.t(context);
  }
  Handlebars.registerHelper('t', t);
  return t;
});
