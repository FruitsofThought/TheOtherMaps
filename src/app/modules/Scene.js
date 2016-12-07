"use strict";
define(
  ['require', 'jquery',
    'promise!tomPolyglot',
    'js-yaml',
    'jscookie',
    'postal',
    'promise!config'
  ],
  function(require, $, Polyglot, jsyaml, Cookies, postal, config) {

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
        engine.myPromise = Promise.resolve()
          .then(function() {
            var lang = Cookies.get('language');
            engine.loadPhrases(lang).then(function() {
              return true;
            });
          })
          .then(function() {
            return engine;
          })
      }

      get load() {
        return this.myPromise;
      }

      loadPhrases(language) {

        if ($.inArray(language, this.languages) == -1) {
          language = this.languages[0];
        };
        var json;
        var translationsjson = this.path + 'lang/' + language + '.yaml';
        if (config.debug) {
          translationsjson += "?bust=" + (new Date()).getTime();
        }
        return Polyglot.loadFile(translationsjson);
      }

      get tangramScene() {
          var engine = this;
          var path = engine.path + engine.file;
          if (config.debug) {
            path += "?bust=" + (new Date()).getTime();
          }
          return path;
        }
        // legend may be overridden by the layer
        // otherwise, this return value disables the legend pane
      get legend() {
        var me = this;
        var mypromise = Promise.resolve({
          then: function(resolve, fail) {
            var path = 'yaml!' + me.path + 'legend.yaml';
            if (config.debug) {
              path += "?bust=" + (new Date()).getTime();
            }
            require([path],
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
            var path = 'yaml!' + me.path + 'locations.yaml';
            if (config.debug) {
              path += "?bust=" + (new Date()).getTime();
            }
            require([path],
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
