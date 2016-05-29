"use strict";
define(['require', 'jquery', 'postal', 'tomMap'], function(require, $, postal,
  map) {

  class TOMLegend {
    constructor() {
      this._channel = postal.channel();
      var me = this;
      this._scenessubscription = this._channel.subscribe(
        "scenes.change",
        function(data) {
          me.insertLegend(data.scene);
        });
    }
    insertLegend(scene) {
      var mylegend = scene.legend;
      mylegend
        .then(function(legend) {
          legend.scene = scene;

          console.log("We found a legend");
          require(['hbs!templates/legend'], function(Legend) {
            var html = Legend(legend);
            $('#legend').html(html);

            $("#legend .marker").click(function() {
              console.log("Moving Map");
              map.setView([this.dataset.lat, this.dataset.lon],
                this.dataset
                .zoom);
            });
          });
        })
        .catch(function() {
          console.log("This scene has no legend");
          $('#legend').html('');
        });
    }
  };
  return new TOMLegend();
});
