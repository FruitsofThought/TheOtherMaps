"use strict";
define(['require', 'jquery', 'permalink', 'leaflet', 'leafletclickevents',
    'leaflethash', 'sceneswitcher'
  ],
  function(require, $, permaLink) {
    console.log('Creating Map');
    // setView expects format ([lat, long], zoom)
    var map_start_location = permaLink.CurrentMapLocation;

    var map = L.map('map', {
      center: map_start_location.slice(0, 3),
      zoom: map_start_location[2],
      visualClickEvents: 'click contextmenu' //can be multiple space-seperated events, like 'click', 'contextmenu', 'dblclick'...
    });
    var hash = new L.Hash(map);

    return map;
  });
