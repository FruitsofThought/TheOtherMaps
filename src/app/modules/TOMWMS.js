"use strict";
define(
  ['require', 'postal', 'jscookie', 'promise!config', 'tomMap', 'tomRightSidebar'],
  function(require, postal, Cookies, config, map) {

    // TODO Make Screenshot button
    // javascript:mapzen.whosonfirst.leaflet.tangram.screenshot_as_file('map');return false;

    class TOMWMS {
      constructor() {
          this.map = map;
          var me = this;
          var _channel = postal.channel();
          //        http://qgis.mountbatten.nl/wms/NgamboHistoric?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
          var layers = [
            '1973 Post Revolution Developments',
            '1987 Zanzibar Plan',
            '1960 Land Surveys Zanzibar',
            '1927 Zanzibar City Survey',
            '1897 Baumann',
            '1892 Plan of Zanzibar',
            '1846 Guillain'
          ];

          this.wmslayers = [];
          var url = 'http://qgis.mountbatten.nl/wms/NgamboHistoric?';
          var defaultOpacity = .5;

          var i = 0;
          while (i < layers.length) {
            this.wmslayers[layers[i]] = L.tileLayer.wms(url, {
              layers: layers[i],
              'style': 'Web',
              'format': 'image/png',
              'attribution': "Ngambo Team"
            });
            i++;
          };

          var control = new L.control.layers(null, this.wmslayers, {
            collapsed: false
          });
          control._map = map;

          $("#wms").append(control.onAdd(map));


          $("#wmsopacityslide").change(function() {
            console.log("setting opacity to " + this.value);
            me.updateOpacity(this.value);
          });
          me.updateOpacity(defaultOpacity);

          map.sidebarcontrols['rightsidebar'].enable('wmspane');


        }
        /** Sets the opacity of the currently selected layer
         **/
      updateOpacity(value) {
        var i = 0;
        while (i < Object.keys(this.wmslayers).length) {
          var key = Object.keys(this.wmslayers)[i];
          var layer = this.wmslayers[key];
          console.log(layer);
          layer.setOpacity(value);
          i++;
        };
      }
    };

    return new TOMWMS();
  });
