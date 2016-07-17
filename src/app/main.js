define(['require',
  'jquery',
  'permalink',
  'yaml',
  'handlebars',
  'hbs!templates/leftsidebar',
  'hbs!templates/rightsidebar',
  'config',
  'postal',
  'ourpolyglot',
  'sceneslist',
  'tomMap',
  'jscookie',
  'sceneswitcher',
  'tomLegend',
  'tomLocationsPanel',
  'leafletsidebar',
  'sceneswitcher',
  'locationlist',
  'keymaster',
  'tomTangram'
], function(require, $, permaLink, jsyaml, HandleBars,
  leftsidebar, rightsidebar, config, postal, OurPolyglot, scenesList, map,
  Cookies) {

  // Insert the Left Sidebar HTML
  console.log('Adding Left Sidebar');
  var html = leftsidebar();
  $('#leftsidebar').html(html);
  var leftsidebar = L.control.sidebar('leftsidebar', {
    position: 'left'
  }).addTo(map);

  // Insert the Right Sidebar HTML
  console.log('Adding Right Sidebar');
  var html = rightsidebar();
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


  console.log('Going to require ScenesList');
  //require(['sceneslist'], function(scenesList) {
  scenesList.Initialized.then(function() {
    var initialscenename = permaLink.Scene;
    var initialscene = scenesList.getScene(initialscenename);
    //  var scenefile = initialscene.tangramScene;
    var switcher = L.control.sceneswitcher('sceneswitcher', {
      scenes: scenesList,
      currentScene: initialscenename,
      channel: postal.channel(),
    }).addTo(map);


    var channel = postal.channel();
    console.log("Publishing event Initializing Scene ", initialscene);
    channel.publish("scenes.change", {
      scene: initialscene
    });

    var wikidataproperty = permaLink.WikidataProperty;
    var wikidatavalue = permaLink.WikidataValue;

    channel.publish("wikidata.change", {
      wikidataproperty: wikidataproperty,
      wikidatavalue: wikidatavalue
    });

  });


  if (!Cookies.get('firstview')) {
    Cookies.set('firstview', true);
    map.sidebarcontrols.rightsidebar.open('homepane');
  }

  return map;

  // What follows are the functions that have been assigned to events
  // I dont like them here, personally
  function preUpdate(will_render) {
    if (!will_render) {
      return;
    }
  }

  function postUpdate() {}


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
      }, false);
    }
  }, false);

});
