"use strict";
define(
  ['require', 'postal', 'tomMap', 'tomTangramInteraction'],
  function(require, postal, map, tomTangramInteraction) {

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
      }
      ChangeScene(scene) {
          if (typeof this.layer === "undefined") {
            this.layer = Tangram.leafletLayer({
              scene: scene.tangramScene,
              preUpdate: this.preUpdate,
              postUpdate: this.postUpdate,
              attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | <a href="http://www.openstreetmap.org/about" target="_blank">&copy; OSM contributors</> | <a href="https://tilesmountbatten.nl/" target="_blank">Mountbatten</a>',
            });
            var me = this;
            this.layer.on('init', function() {
              console.log("Initial Layer Initialized");
              tomTangramInteraction.initFeatureSelection(me.map, this.scene);
            });

            this.layer.scene.subscribe({
              view_complete: function() {
                $('body').removeClass('waiting');

              }
            });
            $('body').addClass('waiting');

            this.layer.addTo(this.map);

          } else {
            this.layer.scene.reload(scene.tangramScene);
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
