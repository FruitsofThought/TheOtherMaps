define(
  ['hbs!templates/osminfobox',
    'jquery',
    'postal',
    'handlebars',
    'yaml!templates/osmkeysvalues.yaml',
    'promise!config',
    'lodash',
    'keymaster'
  ],
  function(template, $, postal, Handlebars, keyvalues, config, underscore) {

    OSMInfobox = function() {

    };

    OSMInfobox.prototype = {
      getHTML: function(initiallayer, properties, element, language, map) {
        var renderdata = {
          'language': language,
          'fields': {}
        };
        var missing = '';
        layers = ['any', initiallayer];
        for (var mykey in properties) {
          console.log('OSMInfobox key=' + mykey);
          for (var layer of layers) {
            console.log('OSMInfobox layer=' + layer);
            if (typeof keyvalues[layer] !== "undefined") {
              if (typeof keyvalues[layer][mykey] !== "undefined") {
                var val = properties[mykey]
                renderdata['fields'][mykey] = keyvalues[layer][mykey];
                if (typeof keyvalues[layer][mykey]['values'] !==
                  "undefined") {
                  if (typeof keyvalues[layer][mykey]['values'][val] !==
                    "undefined") {
                    renderdata['fields'][mykey]['value'] = keyvalues[
                      layer][mykey]['values'][val];
                  } else {
                    console.log(
                      "we found an undefined value, just dumping it raw"
                    );
                    renderdata['fields'][mykey]['value'] = {
                      'displayname': val
                    };
                  }
                } else {
                  // If there is a name:language (or other :language) value, use that one.
                  if (typeof properties[mykey + ':' + language] !==
                    "undefined") {
                    renderdata['fields'][mykey]['value'] = {
                      'displayname': properties[mykey + ':' + language]
                    };
                  } else {
                    renderdata['fields'][mykey]['value'] = {
                      'displayname': val
                    };
                  }
                }
                // maybe useful:
                renderdata['fields'][mykey]['key'] = mykey;
                // default order
                if (typeof renderdata['fields'][mykey]['weight'] ==
                  "undefined") {
                  renderdata['fields'][mykey]['weight'] = 100;
                }
              } else {
                console.log('OSMInfobox Missing key=' + mykey);
                // if we have not found this field yet add it
                if ((layer != 'any') && (typeof renderdata['fields'][
                    mykey
                  ] == "undefined")) {
                  if (config['debug'] == true) {
                    missing += 'Missing key: ' + mykey + '<br/>';
                  }
                }
              }
            }
          }
        }

        var sorted = renderdata;
        sorted['fields'] = underscore.sortBy(renderdata['fields'],
          'weight');
        var html = template(sorted);
        $(element).html(html + missing);

        // If CTRL is clicked, open in new tab
        $(element + " .icon").click({
          map: map
        }, function(event) {
          if (key.ctrl) {
            // Open link in new tab
            return true;
          }
        });
        // Load all the iframes
        $(element + " .osmlabel").click({
          map: map
        }, function(event) {
          if ($(this).hasClass('wikipedia') > 0) {
            map.sidebarcontrols['rightsidebar'].open('wikipediapane');
            return false;
          }
          $('#wikipediadoc').attr('src', '');
          $('#osmwiki').attr('src', '');
          $('#wikidata').attr('src', '');
          map.sidebarcontrols['leftsidebar'].disable(
            'wikipediadocpane');
          map.sidebarcontrols['leftsidebar'].disable('osmwikipane');
          map.sidebarcontrols['leftsidebar'].disable('wikidatapane');
          $(this).find('.icon').trigger('click');
          //event.data.map.sidebarcontrols['leftsidebar'].open('wikipediadocpane');
          var activetab = $(".leftsidebar iframe[src!='']")[0].id;
          if (activetab != '') {
            map.sidebarcontrols['leftsidebar'].open(activetab +
              'pane');
          }
        });

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

        $('#wikipediadoc').attr('src', '');
        $('#osmwiki').attr('src', '');
        $('#wikidata').attr('src', '');
        map.sidebarcontrols['leftsidebar'].disable('wikipediadocpane');
        map.sidebarcontrols['leftsidebar'].disable('osmwikipane');
        map.sidebarcontrols['leftsidebar'].disable('wikidatapane');
        map.sidebarcontrols['leftsidebar'].close();

        // All spans that have sub-icons are clickable
        $(element).find('.icon').parent().parent().addClass('underlined');

        if (typeof properties.wikipedia !== "undefined") {
          // If wikipedia is set, but wikidata is not then use
          // https://github.com/maxlath/wikidata-sdk/blob/master/src/queries/get_wikidata_ids_from_sitelinks.coffee
          // to get the wikidata item, then but that wikidata entry on the event bus
          var items = properties.wikipedia.split(':');
          // we could also embed ?printable=yes
          if (items.length == 1) {
            var url = '//en.m.wikipedia.org/wiki/' + items[1];
          } else {
            var url = '//' + items[0] + '.m.wikipedia.org/wiki/' + items[
              1];
          }
          $('#wikipedia').attr('src', url);
          map.sidebarcontrols['rightsidebar'].enable('wikipediapane');
        } else {
          $('#wikipediadoc').attr('src', '');
          map.sidebarcontrols['rightsidebar'].disable('wikipediapane');
        }
        return true;
      },
    }

    return new OSMInfobox();
  });
