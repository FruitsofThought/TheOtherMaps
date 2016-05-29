"use strict";
define(['jquery', 'polyglot', 'js-yaml', 'postal', 'jscookie'], function($,
  Polyglot,
  jsyaml, postal, Cookies) {
  // This object is responsible for maintaining the strings for the current
  // language.
  class OurPolyglot extends Polyglot {
    constructor() {
      console.log('Welcome to OurPolyglot');
      // call super so we have access to this.
      super();
      this.startlang = 'en-US';
      var startlang = Cookies.get('language');
      if (typeof startlang !== "undefined") {
        this.language = startlang;
      }
      this.files = Array();
      this.files['en-US'] = Array();
      this.files['nl-NL'] = Array();
      this.files['en-US'].push('lang/en-US.yaml');
      this.files['nl-NL'].push('lang/nl-NL.yaml');
      var me = this;
      // Subscribe to different general Application events
      var _channel = postal.channel();
      var _languagesubscription = _channel.subscribe(
        "language.change",
        function(data) {
          Cookies.set('language', data.language);
          me.setLanguage(data.language);
          // We could also replace all strings in the page now, but that is too much
          // work for now, so the permalink module reloads the page instead

        });

      var _languagefilessubscription = _channel.subscribe(
        "language.addfile",
        function(data) {
          console.log("Addfile received " + data.filename);
          me.files[data.language].push(data.filename);
          if ((data.language == me.language) || (data.language ==
              'en-US')) {
            me.loadFile(data.filename);
          }
          // We could also replace all strings in the page now, but that is too much
          // work for now, so the permalink module reloads the page instead

        });

      var _scenesubscription = _channel.subscribe(
        "scenes.change",
        function(data) {
          document.title = me.t(data.scene.name) +
            ' | ' + me.t("home.title");
        });

      // We always load en-US all other languages might not be complete
      console.log('Initial Language Load');
      this.setLanguage('en-US');
      if (startlang !== "en-US") {
        console.log('Prefered Language Load: ' + startlang);
        if (typeof this.files[startlang] !== "undefined") {
          this.setLanguage(startlang);
        } else {
          console.log("Unsupported Language");
        }
      }
    }
    setLanguage(lang) {
      var me = this;
      if (typeof this.files[lang] !== "undefined") {
        this.files[lang].forEach(function(index) {
          me.loadFile(index);
        });
      }
    }
    loadFile(file) {
      console.log('going to fetch ' + file);
      var json;
      var me = this;
      // using synchronous ajax to load the json. can not use requirejs for that (and this is bad, too)
      $.ajax({
        url: file,
        async: false,
        cache: true,
        success: function(data) {
          json = jsyaml.load(data);
          // If nothing came from the yaml
          if (typeof json !== "undefined") {
            me.extend(json.phrases);
            me.locale(json.locale);
          }
        },
        error: function(state, err, bigerr) {
          console.log(err + ' ' + bigerr.message);
          console.log("what language is that!?");
        }
      });
    }
  }
  // return the function to get the polyglot. This is good, because now we can change the
  // object when we change language
  return new OurPolyglot();
});
