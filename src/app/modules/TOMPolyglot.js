"use strict";
define(['jquery', 'polyglot', 'js-yaml', 'postal', 'jscookie', 'promise!config'], function($,
  Polyglot, jsyaml, postal, Cookies, config) {
  // This object is responsible for maintaining the strings for the current
  // language.
  class TOMPolyglot extends Polyglot {
    constructor() {
      console.log('Welcome to TOMPolyglot');
      // call super so we have access to this.
      super();
      this.startlang = 'en-US';
      var startlang = Cookies.get('language');
      if (typeof startlang !== "undefined") {
        this.startlang = startlang;
      }
      this.files = Array();
      this.files['en-US'] = Array();
      this.files['nl-NL'] = Array();
      this.files['en-US'].push(config.basepath + 'lang/en-US.yaml');
      this.files['nl-NL'].push(config.basepath + 'lang/nl-NL.yaml');
      var i = 0;
      while (i < Object.keys(config.languagefiles).length) {
        var lang = Object.keys(config.languagefiles)[i];
        this.files[lang].push(config.languagefiles[lang]);
        i++;
      }
      //      this.files = $.extend(true, this.files, config.languagefiles);
      var me = this;
      // Subscribe to different general Application events
      var _channel = postal.channel();
      var _languagesubscription = _channel.subscribe(
        "language.change",
        function(data) {
          // We could also replace all strings in the page now, but that is too much
          // work for now, so the permalink module reloads the page instead
        });

      // We always load en-US all other languages might not be complete
      console.log('Initial Language Load');
      var initialpromises = this.setLanguage('en-US');
      console.log("Initial promises #1", initialpromises);
      if (this.startlang !== "en-US") {
        console.log('Prefered Language Load: ' + this.startlang);
        if (typeof this.files[this.startlang] !== "undefined") {
          console.log("Initial promises #2", initialpromises);
          initialpromises = $.merge(initialpromises, this.setLanguage(this.startlang));
        } else {
          console.log("Unsupported Language");
        }
      }
      this.loader = Promise.resolve(initialpromises).then(function() {
        console.log("Finally Loaded Polyglot files");
      });
    }

    /** function load
     * @returns Promise that when resolved returns the TOMPolyglot object itself
     **/
    load() {
        this.loader.then(function() {
          console.log("FINALLY Loaded Tooltips");
          return this;
        });
        return this.loader;
      }
      /**
       * Loads language files of a given languages
       * @param lang Language in format en-US
       * @returns Array of promises that are busy loading the files.
       */
    setLanguage(lang) {
      var me = this;
      var promises = [];
      if (typeof this.files[lang] !== "undefined") {
        this.files[lang].forEach(function(index) {
          promises.push(me.loadFile(index));
        });
      }
      console.log("Setlanguage promises", promises);
      return promises;
    }

    /** @function loadFile
     * @params file URL to file with translations that should be Loaded
     * @returns Promise that the file will be Loaded
     **/
    loadFile(file) {
      if (config.debug) {
        file += "?bust=" + (new Date()).getTime();
      }

      console.log('going to fetch ' + file);
      var json;
      var me = this;
      // using synchronous ajax to load the json. can not use requirejs for that (and this is bad, too)
      var loadpromise = $.when(
        $.ajax({
          url: file,
          cache: true,
          success: function(data) {
            json = jsyaml.load(data);
            // If nothing came from the yaml
            if (typeof json !== "undefined") {
              me.extend(json.phrases);
              me.locale(json.locale);
              console.log("Added " + this.url);
            }
          },
          error: function(state, err, bigerr) {
            console.log(err + ' ' + bigerr.message);
            console.log("what language is that!?");
          }
        })
      );
      return loadpromise;
    }
  }
  // return the function to get the polyglot. This is good, because now we can change the
  // object when we change language
  var configpromise = Promise.resolve({
    then: function(resolve, reject) {

      var localPolyglot = new TOMPolyglot();
      localPolyglot.loader.then(function() {
        console.log("Resolved Polyglot");
        resolve(localPolyglot);
      })
    }
  });
  return configpromise;

});
