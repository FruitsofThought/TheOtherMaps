"use strict";
define(['require', 'jquery', 'postal', 'tomMap'], function(require, $, postal,
  map) {

  class TOMLocationsPanel {
    constructor() {
      var me = this;
      var _channel = postal.channel();
      this._scenesubscription = _channel.subscribe(
        "scenes.change",
        function(data) {
          me.ChangeScene(data.scene);
        });
    }
    ChangeScene(scene) {
      var mylocations = scene.locations;
      mylocations
        .then(function(locations) {
          locations.scene = scene;

          console.log("We found locations");
          require(['hbs!templates/TOMLocationsPanel'], function(
            Locations) {
            var html = Locations(locations);
            $('#locations').html(html);

            $("#locations .marker").click(function() {
              console.log("Moving Map");
              map.setView([this.dataset.lat, this.dataset.lon],
                this.dataset.zoom);
            });
          });
        })
        .catch(function() {
          console.log("This scene has no locations");
          $('#locations').html('');
        });
    }
  };
  return new TOMLocationsPanel();
});
