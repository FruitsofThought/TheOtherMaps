"use strict";
define(['require', 'jquery', 'config', 'permalink', 'leaflet', 'leafletclickevents',
    'leaflethash', 'sceneswitcher', 'leafletgeocodermapzen'
  ],
  function(require, $, config, permaLink) {
    console.log('Creating Map');
    // setView expects format ([lat, long], zoom)
    var map_start_location = permaLink.CurrentMapLocation;

    var map = L.map('map', {
      center: map_start_location.slice(0, 3),
      zoom: map_start_location[2],
      visualClickEvents: 'click contextmenu' //can be multiple space-seperated events, like 'click', 'contextmenu', 'dblclick'...
    });
    var hash = new L.Hash(map);

    var options = {
      layers: ['country', 'region', 'locality', 'venue', 'street'],
      params: {
        sources: ['wof'],
        //'boundary.country': ['nl', 'tz'] // This fails, you can only  use 1 country as a string
      }
    };

    L.control.geocoder(config.mapzenapikey, options).addTo(map);
    return map;
  });
