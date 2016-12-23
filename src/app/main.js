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
 * @module Main Application
 *
 * @file This is the application itself.
 */

define(['require',
  'jquery',
  'bowser',
  'postal',
  'jscookie',
  'config',
  'handlebars',
  'hbs!templates/osmlabel',
], function(require, $, browser, postal, Cookies, localconfig, handlebars, osmlabel) {
  var config;
  localconfig.then(function(myconfig) {
    console.log("resolved config", myconfig);
    config = myconfig;

    // if either the cookie has not been set yet or you are not using a supported browser
    console.log(browser);
    console.log(browser.compareVersions(['47', browser.version]));
    if (Cookies.get('trymybrowser') === undefined) {
      var compatible = false;
      if (browser.firefox) {
        compatible = browser.check({
          firefox: "35"
        });
      }
      if ((browser.chrome) || (browser.chromium)) {
        compatible = browser.check({
          chrome: "45"
        });
      }
      if (browser.opera) {
        compatible = browser.check({
          opera: "38"
        });
      }
      if (browser.safari) {
        compatible = browser.check({
          safari: "10"
        });
      }
      if (browser.msedge) {
        compatible = true;
        // sorry this garbage is unfixable while i work for free
        //      compatible = browser.compareVersions(['11', browser.version]) >= 0;
      }
      if (browser.msie) {
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

    // Loading partials so we can re-use them in templates
    handlebars.registerPartial('osmlabel', osmlabel);

    $('body').append(
      '<div id="leftsidebar" class="sidebar leftsidebar collapsed"></div>'
    );
    $('body').append(
      '<div id="rightsidebar" class="sidebar rightsidebar collapsed"></div>'
    );

    console.log('Going to require ScenesList');
    require(['permalink', 'promise!sceneslist'], function(permaLink, scenesList) {
      require(['tomMap', 'tomTangram', 'tomLeftSidebar', 'tomRightSidebar'], function(map) {
        var initialscenename = permaLink.Scene;
        console.log('Initial Scene Name', initialscenename);
        var initialscene = scenesList.getScene(initialscenename);
        console.log('Initial Scene', initialscene);
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
        require(["promise!tomPolyglot"], function(Polyglot) {
          console.log("Loaded Polyglot");
          Promise.resolve(Polyglot).then(function() {
            console.log("Resolved loading Polyglot");
            document.title = Polyglot.t(initialscene.name) +
              ' | ' + Polyglot.t("home.title");
          })
        });

        if (config.controls.wms) {
          require(['tomWMS']);
        }

        if ((!Cookies.get('firstview')) || (config.debug)) {
          map.sidebarcontrols.rightsidebar.open('homepane');
        }
        // Set cookie for the path of the page, and only for 7 days from now.
        Cookies.set('firstview', true, {
          expires: 7,
          path: ''
        });
      });

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
});
