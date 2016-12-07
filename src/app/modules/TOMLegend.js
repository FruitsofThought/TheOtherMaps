"use strict";
define(['require', 'jquery', 'postal', 'tomMap', 'yaml!templates/osmkeysvalues.yaml'], function(require, $, postal,
  map, keyvalues) {

  class TOMLegend {
    constructor() {
      console.log("Loading TOMLegend");
      this._channel = postal.channel();
      var me = this;
      this._scenessubscription = this._channel.subscribe(
        "scenes.change",
        function(data) {
          me.insertLegend(data.scene);
        });
    }
    insertLegend(scene) {
        var me = this;
        var mylegend = scene.legend;
        mylegend
          .then(function(legend) {
            legend.scene = scene;
            legend.keyvalues = keyvalues;

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

              me.setLabels("#legend");


            });
          })
          .catch(function() {
            console.log("This scene has no legend");
            $('#legend').html('');
          });
      }
      /* this is copied from infobox and should be substituted with
       * Mutation Observers
       */
    setLabels(element) {
      $(element + " .valuelabel.wikipedia").click(function() {
        console.log("opening wikipedia pane");
        map.sidebarcontrols['rightsidebar'].open('wikipediapane');
      });

      $(element + " .wikipedia_white").hover(function() {
        $(this).toggleClass('wikipedia_white wikipedia_black');
      });

      $(element + " .wikipedia_white").click({
        map: map
      }, function(event) {
        var url = '//en.m.wikipedia.org/wiki/' + this.attributes[2]
          .nodeValue;
        $('#wikipediadoc').attr('src', url);
        event.data.map.sidebarcontrols['leftsidebar'].enable(
          'wikipediadocpane');
        return false;
      });

      $(element + " .openstreetmap_bw").hover(function() {
        $(this).toggleClass('openstreetmap_bw openstreetmap_color');
      });
      $(element + " .openstreetmap_bw").click({
        map: map
      }, function(event) {
        var url = '//wiki.openstreetmap.org/w/index.php?title=' +
          this.attributes[2].nodeValue +
          '&mobileaction=toggle_view_mobile';
        $('#osmwiki').attr('src', url);

        event.data.map.sidebarcontrols['leftsidebar'].enable(
          'osmwikipane');
        return false;
      });

      $(element + " .wikidata_bw").click({
        map: map
      }, function(event) {
        var url = '//m.wikidata.org/w/index.php?title=' + this.attributes[
          2].nodeValue + '&mobileaction=toggle_view_mobile';
        $('#wikidata').attr('src', url);
        event.data.map.sidebarcontrols['leftsidebar'].enable(
          'wikidatapane');
        return false;
      });
      $(element + " .wikidata_bw").hover(function() {
        $(this).toggleClass('wikidata_bw wikidata_color');
      });

      $(element + " .mapmarker_bw").hover(function() {
        $(this).toggleClass('mapmarker_bw mapmarker_color');
      });
      $(element + " .mapmarker_bw").click({
        map: map
      }, function(event) {
        var channel = postal.channel();
        channel.publish("wikidata.change", {
          wikidataproperty: this.dataset.wikidataproperty,
          wikidatavalue: this.dataset.wikidatavalue
        });

        return false;
      });
      $(element + " .keylabel").hover(function() {
        $(this).toggleClass('visible');
      });
      $(element + " .valuelabel").hover(function() {
        $(this).toggleClass('visible');
      });
      // All spans that have sub-icons are clickable
      $(element).find('.icon').parent().parent().addClass('underlined');

    }
  };
  return new TOMLegend();
});
