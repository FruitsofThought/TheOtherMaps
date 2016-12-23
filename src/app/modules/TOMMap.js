/**
 * Copyright (c) 2016, Reinier Battenberg
 * All rights reserved.
 *
 * Source code can be found at:
 * https://github.com/FruitsofThought/TheOtherMaps
 *
 * @license GPL 3.0
 *
 *
 * @module TOMMap
 *
 * @file Creates the leaflet map with TOM attributes
 */
"use strict";
define(['require', 'jquery', 'promise!config', 'permalink', 'leaflet', 'leafletclickevents',
    'leaflethash', 'sceneswitcher', 'leafletgeocodermapzen'
  ],
  function(require, $, config, permaLink) {
    console.log('Creating Map');
    // setView expects format ([lat, long], zoom)
    var map_start_location = permaLink.CurrentMapLocation;

    var map = L.map('map', {
      center: map_start_location.slice(0, 3),
      zoom: map_start_location[2],
      debugTangram: config.debug,
      visualClickEvents: 'click contextmenu', //can be multiple space-seperated events, like 'click', 'contextmenu', 'dblclick'...
      zoomControl: true
    });
    var hash = new L.Hash(map);

    if (config.controls.pelias) {
      var options = {
        layers: ['country', 'region', 'locality', 'venue', 'street'],
        params: {
          sources: ['wof'],
          //'boundary.country': ['nl', 'tz'] // This fails, you can only  use 1 country as a string
        }
      };

      L.control.geocoder(config.mapzenapikey, options).addTo(map);
    }
    return map;
  });
