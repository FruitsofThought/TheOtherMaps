"use strict";
define(
  ['require', 'jquery',
    'ourpolyglot',
    'js-yaml',
    'jscookie',
    'postal'
  ],
  function(require, $, Polyglot, jsyaml, Cookies, postal) {

    class Scene {
      constructor(config) {
          this.id = config['id'];
          this.file = this.id + ".yaml";
          this.name = 'scenes.' + this.id + '.name';
          this.groupid = config['groupid'];
          this.groupname = 'scenes.' + this.id + '.group';
          this.description = 'scenes.' + this.id + '.description';
          this.languages = config['languages'];
          // TODO this needs to go into a post-constructor in Scene
          var engine = this;
          var channel = postal.channel();
          var language;
          for (language of this.languages) {
            var path = this.path + 'lang/' + language + '.yaml';
            channel.publish("language.addfile", {
              language: language,
              filename: path
            });
          }
          engine.myPromise = Promise.resolve()
            .then(function() {
              var lang = Cookies.get('language');
              //engine.loadPhrases(lang);
              return;
            })
        }
        // This should be an event. when the language changes
        // the polyglot is overridden
      loadPhrases(language) {

        if ($.inArray(language, this.languages) == -1) {
          language = this.languages[0];
        };
        var json;
        var translationsjson = this.path + 'lang/' + language + '.yaml';
        //        console.log("scene language path " + translationsjson);
        // using synchronous ajax to load the json. can not use requirejs for that (and this is bad, too)
        $.ajax({
          url: translationsjson,
          async: false,
          cache: true,
          polyglot: Polyglot,
          success: function(data) {
            //            console.log('fetched language file ' + translationsjson);
            json = jsyaml.load(data);
            Polyglot.extend(json.phrases);
          },
          error: function(state, err, bigerr) {
            console.log(err + '  ' + bigerr.message);
            console.log("what layer language is that!?");
          }
        });
      }
      get Promise() {
        var engine = this;
        return engine.myPromise;
      }
      get tangramScene() {
          var engine = this;
          return engine.path + engine.file;
        }
        // legend may be overridden by the layer
        // otherwise, this return value disables the legend pane
      get legend() {
        var me = this;
        var mypromise = Promise.resolve({
          then: function(resolve, fail) {
            require(['yaml!' + me.path + 'legend.yaml'],
              function(yaml) {
                // console.log("yaml", yaml);
                resolve(yaml);
              },
              function(err) {
                console.log("Error loading a legend.", err);
                fail();
              });
          }
        });
        return mypromise;
      }

      get locations() {
        var me = this;
        var mypromise = Promise.resolve({
          then: function(resolve, fail) {
            require(['yaml!' + me.path + 'locations.yaml'],
              function(yaml) {
                resolve(yaml);
              },
              function(err) {
                fail();
              });
          }
        });
        return mypromise;
      }
    }
    return Scene;
  });
