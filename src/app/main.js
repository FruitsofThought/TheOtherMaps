define ([
  'require',
  'jquery',
  'globalpolyglot',
  'permalink',
  'yaml',
  'handlebars',
  'hbs!templates/leftsidebar',
  'hbs!templates/rightsidebar',
  'config',
  'osminfobox',
  'sceneswitcher',
  'leaflet',
  'leaflethash',
  'leafletsidebar',
  'leafletclickevents',
  'sceneswitcher',
  'locationlist',
  'keymaster'
], function (require, $, Polyglot, permaLink, jsyaml, HandleBars, leftsidebar, rightsidebar, config, box) {
//  var scenes = require('yaml!'+config['scenes']);
//  var locations = require('yaml!'+config['locations']);
//console.log ('there are this many scenes: ' + config['scenes'].length());

    var polyglot = Polyglot();
    // or in switch language?
    document.title = polyglot.t("home.title");

    var map = L.map('map', {
      visualClickEvents: 'click contextmenu' //can be multiple space-seperated events, like 'click', 'contextmenu', 'dblclick'...
    });

    // Insert the Left Sidebar HTML
    var html = leftsidebar();
    $('#leftsidebar').html(html);
      // Sidebar Control
    var leftsidebar = L.control.sidebar('leftsidebar', {
      position: 'left'
    }).addTo(map);

    // Insert the Left Sidebar HTML
    var html = rightsidebar();
    $('#rightsidebar').html(html);
      // Sidebar Control
    var rightsidebar = L.control.sidebar('rightsidebar', {
      position: 'right'
    }).addTo(map);

    $(".sidebar .openstreetmap_bw").hover(function(){
      $(this).toggleClass('openstreetmap_bw openstreetmap_color');
    });

    $(".sidebar .wikidata_bw").hover(function(){
      $(this).toggleClass('wikidata_bw wikidata_color');
    });
//console.log()
    var switcher = L.control.sceneswitcher('sceneswitcher', {
      styles: config['scenes'],
      currentStyle: permaLink.getCurrentScene(),
      permaLink: permaLink,
    }).addTo(map);

    var initialstyle = permaLink.getCurrentScene();
    var layer = Tangram.leafletLayer({
      scene: config['scenes'][initialstyle].file,
      preUpdate: preUpdate,
      postUpdate: postUpdate,
      attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | <a href="http://www.openstreetmap.org/about" target="_blank">&copy; OSM contributors</> | <a href="https://tilesmountbatten.nl/" target="_blank">Mountbatten</a>',
    });
    layer.addTo(map);


    if (typeof config['locations'] != 'undefined') {
      // Location List Control
      var llist = new L.control.locationlist(config['locations']); 
      map.addControl(llist);
    }

    // setView expects format ([lat, long], zoom)
    var map_start_location = permaLink.getCurrentMapLocation();
    map.setView(map_start_location.slice(0, 3), map_start_location[2]);
    var hash = new L.Hash(map);

    <!-- This is needed in the interaction functions -->
//    window.sidebar = sidebar;
    window.layer = layer;
    var scene = layer.scene;
    window.scene = scene;

    layer.on('init', function() {
      console.log("Initial Layer Initialized");
      //  addGUI();
      initFeatureSelection();
    });
    layer.addTo(map);

    return map;

    // What follows are the functions that have been assigned to events
    // I dont like them here, personally
    function preUpdate(will_render) {
      if (!will_render) {
        return;
      }
    }
    function postUpdate() {}

    // Feature selection
  function initFeatureSelection() {
    // Selection info shown on hover
    var selection_info_label = document.createElement('span');
    var selection_info_table = document.createElement('dl');
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
        if ((feature != null) && (selection_info_table.parentNode == null)) {
          $('.leaflet-container').css('cursor', 'help');

          var label = '';
          if (feature.properties.name != null) {
            label = feature.properties.name;
          }
          // Only if there is a label
          if (label != '') {
            selection_info_label.innerHTML = label;
            $('#infopane .sidebar-header').append(selection_info_label);
          } else if (selection_info_label.parentNode != null) {
            $('.leaflet-container').css('cursor', 'pointer');
            selection_info_label.parentNode.removeChild(selection_info_label);
          }
        } else {
          if (selection_info_label.parentNode != null) {
            selection_info_label.parentNode.removeChild(selection_info_label);
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
            selection_info_label.parentNode.removeChild(selection_info_label);
          }
          if (selection_info_table.parentNode != null) {
            selection_info_table.parentNode.removeChild(selection_info_table);
          }
          return;
        }
        var feature = selection.feature;
        var table = '';
        if (feature != null) {
          box = require('osminfobox');
          //(layer, properties, element, language)
          if (feature.properties != null) {
            table = box.getHTML('architecture', feature.properties, '#info', 'en', map);
          }

          if (table != '') {
            map.sidebarcontrols['rightsidebar'].open('infopane');
          } else if (selection_info_label.parentNode != null) {
            selection_info_table.parentNode.removeChild(selection_info_table);
            map.sidebarcontrols['leftsidebar'].disable('wikipediapane');
            map.sidebarcontrols['rightsidebar'].disable('infopane');
          }
        } else if (selection_info_label.parentNode != null) {
          selection_info_label.parentNode.removeChild(selection_info_label);
          if (selection_info_table.parentNode != null) {
            selection_info_table.parentNode.removeChild(selection_info_table);
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

  // iFrame integration
  // There is a requirejs module for this
  window.addEventListener("DOMContentLoaded", function() {

    if (window.self !== window.top) {
      //disable scroll zoom if it is iframed
      map.scrollWheelZoom.disable();
      //sending message that child frame is ready to parent window
      window.parent.postMessage("loaded", "*");
      window.addEventListener("message", function(e) {
        // Ignore the message if origin is self (this fixes a Safari bug where iframed documents posts messages at itself)
        if (e.origin === window.location.origin) return;
        switchStyles(e.data);
      }, false);
    }
  }, false);

});
