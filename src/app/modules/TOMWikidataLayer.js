"use strict";
define(
  ['require', 'jquery', 'postal', 'tomMap', 'wikidata-sdk', 'jscookie',
    'leaflet'
  ],
  function(require, $, postal, map, wdk, Cookies) {

    class TOMWikidataLayer {
      constructor() {
        this.map = map;
        this.markers = new L.layerGroup();
        this.wikiproperty = '';
        this.wikivalue = '';
        var me = this;
        this.map.on('viewreset', function() {
          console.log("Going to redraw the map");
          me.populate();
        });
        this.map.on('movestart', function() {
          console.log("Going to redraw the map");
          me.populate();
        });

        this._channel = postal.channel();
        this._wikidatasubscription = this._channel.subscribe(
          "wikidata.change",
          function(data) {
            me.addtoMap(data.wikidataproperty, data.wikidatavalue);
          });

        this._scenesubscription = this._channel.subscribe(
          "scenes.change",
          function(data) {
            // TODO This should be an option
            // me.remove();
          });
      }
      addtoMap(wikiproperty, wikivalue) {
        this.wikiproperty = wikiproperty;
        this.wikivalue = wikivalue;
        this.remove();
        this.populate();
      }
      remove() {
        this.markers.clearLayers();
        this.markers.remove();
      }
      populate() {
        if (this.wikiproperty.length + this.wikivalue.length === 0) {
          return;
        }
        $('body').addClass('waiting');
        var bounds = this.map.getBounds();
        // TODO: Here we can calculate markers.getBounds() compared to map.getBounds()
        // and only ask for the difference (which in case of diagonal panning or
        // zooming out is a lot of calculations.
        // zooming in should not requery though.
        // this also would allow us to query an area much larger than the first view.)
        var sw = bounds.getWest() + ' ' + bounds.getSouth();
        var ne = bounds.getEast() + ' ' + bounds.getNorth();

        var language = Cookies.get('language').substr(0, 2);
        // Add english as fallback language
        if (language != 'en') {
          language += ",en";
        }
        //var attribute = 'wdt:P84';
        //var value = 'wd:Q540431'; // Cuipers
        // TODO find any subclass of something (in this case,railway stations)
        // https://query.wikidata.org/#%23defaultView%3AMap%0ASELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20%3Fcoords%20WHERE%20%7B%0A%20%20%3Fitem%20wdt%3AP31%2Fwdt%3AP279%2a%20wd%3AQ55488%20.%0A%20%20OPTIONAL%20%7B%20%3Fitem%20wdt%3AP625%20%3Fcoords%20%7D%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%20.%20%7D%0A%7D%20ORDER%20BY%20%3FitemLabel
        // try with this cathedral Q2942370 which is a subclass of Church Q16970
        var attribute = this.wikiproperty;
        var value = this.wikivalue;
        var query = "";
        if ((typeof value !== 'undefined') && (value != '')) {
          query = "?item wdt:" + attribute + " wd:" + value + " .";
        }
        var sparql =
          "SELECT ?item ?itemLabel ?itemDescription ?coord ?valueLabel ?valueDescription WHERE { \
                SERVICE wikibase:box {\
                    ?item wdt:P625 ?coord .\
                    bd:serviceParam wikibase:cornerSouthWest \"Point(" +
          sw + ")\"^^geo:wktLiteral .\
                    bd:serviceParam wikibase:cornerNorthEast \"Point(" + ne +
          ")\"^^geo:wktLiteral .\
                }\ " + query +
          " ?item wdt:" + this.wikiproperty +
          " ?value .\
              		SERVICE wikibase:label { bd:serviceParam wikibase:language \"" + language +
          "\" } .  \
                }";

        /*  Sparql for all items with property X
                  SELECT ?item ?label ?coord ?style ?stylelabel WHERE {
                    SERVICE wikibase:box {                    ?item wdt:P625 ?coord .
                                          bd:serviceParam wikibase:cornerSouthWest "Point(6.10592007637024 52.78372015455761)"^^geo:wktLiteral .
                                          bd:serviceParam wikibase:cornerNorthEast "Point(6.118676662445069 52.78746418843369)"^^geo:wktLiteral .
                                         }
                    ?item wdt:P149 ?style .
                    ?item rdfs:label ?label filter (lang(?label) = "en")
                    ?style rdfs:label ?stylelabel filter (lang(?stylelabel) = "en")
                  }*/
        var url = wdk.sparqlQuery(sparql);
        var me = this;
        $.ajax(url)
          .done(function(data) {
            me.markers.remove();
            data.results.bindings.forEach(function(result) {
              console.log(result.itemLabel.value);

              var point1 = result.coord.value.split("(")[1].split(
                ")")[
                0].split(" ");
              var point = [point1[1], point1[0]];
              var label = result.itemLabel.value;
              var description = (typeof result.itemDescription != 'undefined') ? result.itemDescription
                .value :
                "";
              var marker = L.circleMarker(point, {
                  "title": label + " " + description,
                  "alt": result.item.value,
                  "color": "#ff0000"
                })
                .bindPopup(result.itemLabel.value)
                .addTo(me.markers);

            });
            me.markers.addTo(me.map);
            $('body').removeClass('waiting');
          });
        return false;
      }
    };

    return new TOMWikidataLayer();
  });
