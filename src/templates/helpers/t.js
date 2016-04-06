define('templates/helpers/t', ['handlebars', 'globalpolyglot'], function ( Handlebars, Polyglot ) {
  function t ( context, options ) {
    // Simple function for example
 //   do polyglot now
    polyglot = Polyglot();
    return polyglot.t(context);
  }
  Handlebars.registerHelper( 't', t);
  return t;
}); 
