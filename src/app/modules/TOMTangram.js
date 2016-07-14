"use strict";
define(
  ['require', 'postal', 'jscookie', 'config', 'tomMap', 'tomTangramInteraction', 'tomWikidataLayer'],
  function(require, postal, Cookies, config, map, tomTangramInteraction) {

    // TODO Make Screenshot button
    // javascript:mapzen.whosonfirst.leaflet.tangram.screenshot_as_file('map');return false;

    class TOMTangram {
      constructor() {
        this.map = map;
        this.map.on('viewreset', function() {
          console.log("Going to redraw the map");
          $('body').addClass('waiting');
        });
        this.map.on('movestart', function() {
          console.log("Going to redraw the map");
          $('body').addClass('waiting');
        });

        var me = this;
        var _channel = postal.channel();
        this._scenesubscription = _channel.subscribe(
          "scenes.change",
          function(data) {
            me.ChangeScene(data.scene);
          });

        this._languagesubscription = _channel.subscribe(
          "language.change",
          function(data) {
            console.log("Changing Map Language to " + Cookies.get('language'));
            if (data.language != '') {
              console.log("Global is  ", me.layer.scene.config.global);

              if (me.layer.scene.config.global.language != data.language.substr(0, 2)) {
                console.log("Changing Map Language to " + Cookies.get('language'))
                  // This will for now be overruled by the Permalink module
                  // which does a hard reload of the page. But of course
                  // the aim is to not do that eventually
                if (typeof me.layer !== "undefined") {
                  console.log("Changing Map Language to " + Cookies.get('language'));
                  me.layer.scene.config.global.language = Cookies.get('language').substr(0, 2);
                  me.layer.scene.updateConfig();
                  console.log("NEW Global is  ", me.layer.scene.config.global);
                }
              }
            }
          });

      }
      ChangeScene(scene) {
          if (typeof this.layer === "undefined") {
            var options = {
              scene: scene.tangramScene,
              preUpdate: this.preUpdate,
              postUpdate: this.postUpdate,
              attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | <a href="http://www.openstreetmap.org/about" target="_blank">&copy; OSM contributors</> | <a href="https://tilesmountbatten.nl/" target="_blank">Mountbatten</a>',
              showDebug: (config.debug == true),
              logLevel: config.logLevel || 'info', // or 'warn' or 'error' or anything else for no logging
              introspection: (config.debug == true),
            };


            this.layer = Tangram.leafletLayer(options);
            var me = this;
            this.layer.on('init', function() {
              if (typeof me.layer.scene.config.global === "undefined") {
                // This is only to prevent errors, the actual
                // translate function does not work if you assign it from here.
                //               
                me.layer.scene.config.global = {};
              }

              console.log("INIT Global is  ", me.layer.scene.config.global);
              me.layer.scene.config.global.labels = true; // We can store this in a cookie later
              me.layer.scene.config.global.language = Cookies.get('language').substr(0, 2);
              me.layer.scene.updateConfig();
              console.log("INIT NEW Global is  ", me.layer.scene.config.global);
              console.log("Initial Layer Initialized");
              tomTangramInteraction.initFeatureSelection(me.map, this.scene);
            });

            this.layer.scene.subscribe({
              view_complete: function() {
                $('body').removeClass('waiting');
              }
            });
            this.layer.scene.subscribe({
              load: function(e) {
                //$('body').removeClass('waiting');
                console.log('scene loaded:', e);
              }
            });
            $('body').addClass('waiting');

            this.layer.addTo(this.map);

          } else {
            this.layer.scene.load(scene.tangramScene);
            $('body').addClass('waiting');

          }
        }
        // this might be per tile or so. bit odd. keeps on firing
      preUpdate(willrender) {
        //  console.log("Updating Tangram");
        if (willrender) {
          //    $('body').addClass('waiting');
        }
      }
      postUpdate(result) {
        if (result) {
          //  console.log("Done Updating Tangram");
          //  $('body').removeClass('waiting');
        };
      }
    };

    return new TOMTangram();
  });
