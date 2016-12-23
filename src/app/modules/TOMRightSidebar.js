"use strict";
define(['jquery', 'postal', 'tomMap', 'jscookie', 'hbs!templates/rightsidebar', 'hbs!templates/osmlabel', 'tomLegend',
  'tomLocationsPanel', 'leafletsidebar', 'sceneswitcher'
], function($, postal, map, Cookies, rightSidebar) {

  class TOMRightSidebar {
    constructor() {
      var me = this;

      // Insert the Right Sidebar HTML
      console.log('Adding Right Sidebar');
      var html = rightSidebar();
      $('#rightsidebar').html(html);
      var rightsidebar = L.control.sidebar('rightsidebar', {
        position: 'right'
      }).addTo(map);

      $(".sidebar .openstreetmap_bw").hover(function() {
        $(this).toggleClass('openstreetmap_bw openstreetmap_color');
      });

      $(".sidebar .wikidata_bw").hover(function() {
        $(this).toggleClass('wikidata_bw wikidata_color');
      });

      $("#settings input[name=language][value=" + Cookies.get('language') + "]")
        .prop('checked', true);
      $("#settings input").click(function() {
        console.log("clicked " + this.value);
        var channel = postal.channel();
        channel.publish("language.change", {
          language: this.value
        });
      });

      // The above is going to go into its own sidebar files. But for now more code that deals with them.
      // This will enable/disable the panels based on content
      // select the target node

      // configuration of the observer:
      var observerconfig = {
        attributes: false,
        childList: true,
        characterData: false
      };


      var legendtarget = document.getElementById('legend');

      // create an observer instance
      var legendobserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          console.log(mutation.type, mutation);
          if (mutation.target.children.length > 0) {
            map.sidebarcontrols['rightsidebar'].enable('legendpane');
          } else {
            map.sidebarcontrols['rightsidebar'].disable('legendpane');
          }
        });
      });

      // The above is going to go into its own sidebar files. But for now more code that deals with them.
      // This will enable/disable the panels based on content
      // select the target node
      var locationstarget = document.getElementById('locations');

      // create an observer instance
      var locationsobserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          console.log(mutation.type, mutation);
          if (mutation.target.children.length > 0) {
            map.sidebarcontrols['rightsidebar'].enable('locationspane');
          } else {
            map.sidebarcontrols['rightsidebar'].disable('locationspane');
          }
        });
      });

      // pass in the target node, as well as the observer options

      legendobserver.observe(legendtarget, observerconfig);
      locationsobserver.observe(locationstarget, observerconfig);

    }
  };
  return new TOMRightSidebar();
});
