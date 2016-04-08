define(['jquery', 'polyglot', 'js-yaml', 'postal'], function($, Polyglot,
  jsyaml, postal) {
  var _polyglot = new Polyglot();
  setLanguage('en-US');

  var _channel = postal.channel();
  var _languagesubscription = _channel.subscribe(
    "language.change",
    function(data) {
      //require(['permalink'], function(permalink) {
      setLanguage(data.language);
      // We could also replace all strings in the page now, but that is too much
      // work for now, so the permalink module reloads the page instead
      //});
    });

  var _scenesubscription = _channel.subscribe(
    "scenes.change",
    function(data) {
      document.title = data.name + ' | The Other Maps Project';
    });



  // return the function to get the polyglot. This is good, because now we can change the
  // object when we change language
  console.log('returning getPolyglot');
  return getPolyglot;

  function setPolyglot(polyglot) {
    console.log('set polyglot');
    _polyglot = polyglot;
  }

  function getPolyglot() {
    console.log('get polyglot');
    return _polyglot;
  }

  function setLanguage(lang) {
    var translationsjson = 'lang/' + lang + '.yaml';
    console.log('going to fetch ' + translationsjson);

    // using synchronous ajax to load the json. can not use requirejs for that (and this is bad, too)
    $.ajax({
      url: translationsjson,
      async: false,
      cache: false,
      polyglot: Polyglot,
      success: function(data) {
        console.log('fetched file');
        json = jsyaml.load(data);
        var polyglot = getPolyglot();
        polyglot.extend(json.phrases);
        polyglot.locale(json.locale);
        setPolyglot(polyglot);
      },
      error: function(state, err, bigerr) {
        console.log(err + ' ' + bigerr.message);
        console.log("what language is that!?");
      }
    })
  }
});
