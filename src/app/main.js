define(['require',
  'jquery',
  'bowser',
  'config',
  'postal',
  'jscookie',
], function(require, $, browser, config, postal, Cookies) {
  // if either the cookie has not been set yet or you are not using a supported browser
  console.log(browser);
  console.log(browser.compareVersions(['47', browser.version]));
  if (Cookies.get('trymybrowser') === undefined) {
    var compatible = false;
    if (browser.firefox) {
      compatible = browser.compareVersions(['47.0', browser.version]) >= 0;
    }
    if ((browser.chrome) || (browser.chromium)) {
      compatible = browser.compareVersions(['51.0', browser.version]) >= 0;
    }
    if (browser.opera) {
      compatible = browser.compareVersions(['38.0', browser.version]) >= 0;
    }
    if (browser.msie == true) {
      // sorry this garbage is unfixable while i work for free
      //      compatible = browser.compareVersions(['11', browser.version]) >= 0;
    }
    if (compatible == false) {
      $('body').removeClass('waiting');
      $('#map').append(
        '<div id="browsersupport"><div id="text">This application has only been tested in the latest <a href="http://www.google.com/chrome">Chrome</a> and <a href="http://www.getfirefox.com">Firefox</a> browsers. It is a good idea to use Open Source browsers anyways, so this is a good time to switch.<div id="button"><input id="tryanyway" type="button" value="I will take the risk. Let me try anyways." /></div></div></div>'
      );
      $("#tryanyway").click(function() {
        Cookies.set('trymybrowser', true);
        location.reload();
      });
      return;
    }
  }

  // require   'tomTangram',  'permalink','sceneslist',
  //  map, permaLink, scenesList

  console.log('Going to require ScenesList');
  require(['tomMap', 'permalink', 'sceneslist', 'tomTangram',
    'tomLeftSidebar', 'tomRightSidebar'
  ], function(map,
    permaLink, scenesList) {
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

    return;
  });
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
