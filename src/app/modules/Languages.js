define (['jquery', 'polyglot', 'permalink', 'config'], function ($, Polyglot, permaLink, config) {

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
    var translationsjson ='https://gist.githubusercontent.com/franz-josef-kaiser/4582383/raw/497e8167f88f5b1689b77e0f6993b2fd250c602f/iso_639-2.json';
    console.log ('going to fetch ' + translationsjson);


    // using synchronous ajax to load the json. can not use requirejs for that (and this is bad, too)
    $.ajax({
      url: translationsjson,
      async: false,
      cache: (config['debug']),
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
