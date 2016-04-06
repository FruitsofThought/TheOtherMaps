define (['jquery', 'polyglot', 'permalink', 'js-yaml'], function ($, Polyglot, permaLink, jsyaml) {
  var _polyglot = new Polyglot();

  setLanguage('en-UK');
  lang = getDefaultLanguage();
  if (lang != 'en-UK') {
    setLanguage(lang);
  }
  
  // return the function to get the polyglot. This is good, because now we can change the
  // object when we change language
  console.log ('returning getPolyglot');
  return getPolyglot; 
  
  function setPolyglot(polyglot) {
      console.log ('set polyglot');
     _polyglot = polyglot; 
  }  
  
  
  function getPolyglot() {
      console.log ('get polyglot');
     return _polyglot; 
  }
  
  function setLanguage(lang) {
    var translationsjson ='lang/'+lang+'.yaml';
    console.log ('going to fetch ' + translationsjson);

      
  // using synchronous ajax to load the json. can not use requirejs for that (and this is bad, too)  
  $.ajax({
    url: translationsjson,
    async: false,
    cache: false,
    polyglot: Polyglot,
    success: function(data) {
      console.log ('fetched file');
      json = jsyaml.load(data);
      var polyglot = getPolyglot();
      polyglot.extend(json.phrases);
      polyglot.locale(json.locale);
      setPolyglot(polyglot);
    },
    error: function(state, err, bigerr) {
      console.log (err+' '+bigerr.message);
      console.log ("what language is that!?");
    }
    })
 }
 
 function getDefaultLanguage() {
   return permaLink.getCurrentLanguage();
 }
 
});