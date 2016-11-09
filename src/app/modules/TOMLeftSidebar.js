"use strict";
define(['jquery', 'tomMap', 'hbs!templates/leftsidebar', 'leafletsidebar'], function($, map, leftSidebar) {

  class TOMLeftSidebar {
    constructor() {
      var me = this;

      // Insert the Left Sidebar HTML
      console.log('Adding Left Sidebar');
      var html = leftSidebar();
      $('#leftsidebar').html(html);
      var leftsidebar = L.control.sidebar('leftsidebar', {
        position: 'left'
      }).addTo(map);
    }
  };
  return new TOMLeftSidebar();
});
