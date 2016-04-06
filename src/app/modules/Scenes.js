define (['yaml', 'config'], function ($, config) {
  var a = require('yaml!'+config['scenes']);
  return a;
  var languages = fetchLanguages();

  return languages;

  function setLanguage(polyglot) {
      console.log ('set polyglot');
     _polyglot = polyglot;
  }


  function getLanguage() {
      console.log ('get polyglot');
     return _polyglot;
  }

  function fetchLanguages() {
    var translationsjson = config['scenes'];
    console.log ('going to fetch ' + translationsjson);


  // using synchronous ajax to load the json. can not use requirejs for that (and this is bad, too)
  $.ajax({
    url: translationsjson,
    async: false,
    cache: false,
    polyglot: Polyglot,
    success: function(data) {

      console.log ("got them");

    },
    error: function(state, err, bigerr) {
      console.log (err+' '+bigerr.message);
      console.log ("what language is that!?");
    }
    })
 }

});
