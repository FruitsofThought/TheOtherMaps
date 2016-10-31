"use strict";
define(
  ['require', 'postal'],
  function(require, postal) {

    class TOMTangramInteraction {
      constructor() {
          this.selection_info_label = document.createElement('span');
          this.selection_info_table = document.createElement('dl');
          var channel = postal.channel();
          var me = this;
          this._scenessubscription = channel.subscribe(
            "scenes.change",
            function(data) {
              if (me.selection_info_label.parentNode != null) {
                me.selection_info_label.parentNode.removeChild(
                  me.selection_info_label);
              }
              if (me.selection_info_table.parentNode != null) {
                me.selection_info_table.parentNode.removeChild(
                  me.selection_info_table);
              }
              if (typeof me.map !== "undefined") {
                me.map.sidebarcontrols['leftsidebar'].disable(
                  'wikipediapane');
                me.map.sidebarcontrols['rightsidebar'].disable(
                  'infopane');
              }
            });
        }
        // Feature selection
      initFeatureSelection(map, scene) {
        // Selection info shown on hover
        var selection_info_label = this.selection_info_label;
        var selection_info_table = this.selection_info_table;
        this.map = map;
        //      selection_info.setAttribute('class', 'label');
        //      selection_info.style.display = 'block';

        // Show selected feature on hover
        scene.container.addEventListener('mousemove', function(event) {
          var pixel = {
            x: event.clientX,
            y: event.clientY
          };

          scene.getFeatureAt(pixel).then(function(selection) {
            if (!selection) {
              $('.leaflet-container').css('cursor', 'pointer');
              return;
            }
            var feature = selection.feature;
            // Only if there is a feature, but we have not clicked on a feature and are
            // showing the table with attributes
            // TODO do nicer stuff with the events of the sidebar
            if ((feature != null) && (selection_info_table.parentNode ==
                null)) {
              $('.leaflet-container').css('cursor', 'help');

              var label = '';
              if (feature.properties.name != null) {
                label = feature.properties.name;
              }
              // Only if there is a label
              if (label != '') {
                selection_info_label.innerHTML = label;
                $('#infopane .sidebar-header').append(
                  selection_info_label);
              } else if (selection_info_label.parentNode !=
                null) {
                $('.leaflet-container').css('cursor',
                  'pointer');
                selection_info_label.parentNode.removeChild(
                  selection_info_label);
              }
            } else {
              if (selection_info_label.parentNode != null) {
                selection_info_label.parentNode.removeChild(
                  selection_info_label);
              }
            }
            // But always when not hoovering a feature, reset the mousepointer
            if (feature == null) {
              $('.leaflet-container').css('cursor', 'pointer');
            }
          });

          // Don't show labels while panning
          // Why not?
          if (scene.panning == true) {
            if (selection_info_label.parentNode != null) {
              //                    selection_info_label.parentNode.removeChild(selection_info_label);
            }
          }
        });

        // Show selected feature on click
        scene.container.addEventListener('click', function(event) {
          var pixel = {
            x: event.clientX,
            y: event.clientY
          };

          scene.getFeatureAt(pixel).then(function(selection) {
            if (!selection) {
              if (selection_info_label.parentNode != null) {
                selection_info_label.parentNode.removeChild(
                  selection_info_label);
              }
              if (selection_info_table.parentNode != null) {
                selection_info_table.parentNode.removeChild(
                  selection_info_table);
              }
              return;
            }
            var feature = selection.feature;
            var loaded = false;
            if ((feature != null)) {
              if ((feature.properties != null)) {
                require(['osminfobox'], function(box) {
                  loaded = box.getHTML(feature.source_layer,
                    feature.properties,
                    '#info', 'en', map);
                  map.sidebarcontrols['rightsidebar'].open(
                    'infopane');
                });
              } else if (selection_info_label.parentNode !=
                null) {
                selection_info_table.parentNode.removeChild(
                  selection_info_table);
                map.sidebarcontrols['leftsidebar'].disable(
                  'wikipediapane');
                map.sidebarcontrols['rightsidebar'].disable(
                  'infopane');
              };

            } else if (selection_info_label.parentNode !=
              null) {
              selection_info_label.parentNode.removeChild(
                selection_info_label);
              if (selection_info_table.parentNode != null) {
                selection_info_table.parentNode.removeChild(
                  selection_info_table);
              }
            }
          });

          // Don't show labels while panning
          if (scene.panning == true) {
            if (selection_info_label.parentNode != null) {
              //                    selection_info_label.parentNode.removeChild(selection_info);
            }
          }
        });

      }
    };
    return new TOMTangramInteraction();
  });
