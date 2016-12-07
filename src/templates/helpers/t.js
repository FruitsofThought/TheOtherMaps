define('templates/helpers/t', ['handlebars', 'promise!tomPolyglot'], function(
  Handlebars, Polyglot) {
  function t(context, options) {
    if (context !== "") {
      return Polyglot.t(context);
    } else {
      return "";
    }
  }
  Handlebars.registerHelper('t', t);
  return t;
});
