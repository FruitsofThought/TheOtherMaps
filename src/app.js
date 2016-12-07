var basepath = requirejs.toUrl('');
var baseUrl = '';
// basepath will look like the whole URL of this app.
// require.config.baseUrl should only be the subdir part of basepath
// otherwise handlebars partials gets confused

if ((basepath == "\.\./dist/") || (basepath == "\.\./\.\./dist/")) {
  // We are running the example or ../../TOMApps
  baseUrl = window.location.pathname + basepath;
} else {
  var baseUrls = basepath.split('/')
  baseUrls.shift();
  baseUrls.shift();
  baseUrls.shift();
  baseUrl = '/' + baseUrls.join('/');
}
// mylocation is the location we are called from. That folder *must* have
// a config.yaml file.
var loc = window.location
var mylocation = loc.origin + loc.pathname;

requirejs.config({
  urlArgs: "bust=25", // + (new Date()).getTime(), //this kills javascript debugging
  baseUrl: baseUrl,
  optimizeAllPluginResources: false,
  enforceDefine: false, // will fail for yaml & json anyways nice for debugging
  paths: {
    jquery: basepath + 'lib/jquery',
    bowser: basepath + 'lib/bowser',
    text: basepath + 'lib/requirejs/text', //text is required
    json: basepath + 'lib/requirejs/json', //alias to plugin
    hbs: basepath + 'lib/requirejs/hbs',
    promised: basepath + 'lib/requirejs/promised',
    'promise': basepath + 'lib/requirejs/requirejs-promise',
    yaml: basepath + 'lib/requirejs/yaml', //alias to plugin
    'js-yaml': basepath + 'lib/js-yaml', //alias to plugin
    polyglot: basepath + 'lib/polyglot',
    jscookie: basepath + 'lib/js.cookie',
    lodash: basepath + 'lib/lodash',
    postal: basepath + 'lib/postal',
    leaflet: basepath + 'lib/leaflet/leaflet-src',
    leaflethash: basepath + 'lib/leaflet/leaflet-hash',
    leafletsidebar: basepath + 'lib/leaflet/leaflet-sidebar',
    leafletclickevents: basepath + 'lib/leaflet/L.VisualClick',
    leafletgeocodermapzen: basepath + 'lib/leaflet-geocoder-mapzen',
    locationlist: basepath + 'app/modules/leaflet.locationlist',
    keymaster: basepath + 'lib/keymaster',
    tipsy: basepath + 'lib/jquery.tipsy',
    handlebars: basepath + 'lib/handlebars',
    'wikidata-sdk': basepath + 'lib/wikidata-sdk',
    tomPolyglot: basepath + 'app/modules/TOMPolyglot',
    permalink: basepath + 'app/modules/PermaLink',
    sceneswitcher: basepath + 'app/modules/L.Control.SceneSwitcher',
    scene: basepath + 'app/modules/Scene',
    sceneslist: basepath + 'app/modules/ScenesList',
    osminfobox: basepath + 'app/modules/OsmInfobox',
    tomMap: basepath + 'app/modules/TOMMap',
    tomWMS: basepath + 'app/modules/TOMWMS',
    tomTangram: basepath + 'app/modules/TOMTangram',
    tomTangramInteraction: basepath + 'app/modules/TOMTangramInteraction',
    tomLegend: basepath + 'app/modules/TOMLegend',
    tomLocationsPanel: basepath + 'app/modules/TOMLocationsPanel',
    tomWikidataLayer: basepath + 'app/modules/TOMWikidataLayer',
    tomWikidataLayer: basepath + 'app/modules/TOMWikidataLayer',
    tomWikidataLayer: basepath + 'app/modules/TOMWikidataLayer',
    tomLeftSidebar: basepath + 'app/modules/TOMLeftSidebar',
    tomRightSidebar: basepath + 'app/modules/TOMRightSidebar',
    config: basepath + 'app/modules/TOMConfig',
    main: basepath + 'app/main',
  },
  shim: {
    leaflet: {
      exports: 'L'
    },
    leafletclickevents: {
      deps: ['leaflet'],
      exports: 'L.Map.VisualClick'
    },
    leaflethash: {
      deps: ['leaflet'],
      exports: 'leaflethash'
    },
    leafletsidebar: {
      deps: ['leaflet'],
      exports: 'leafletsidebar'
    },
    sceneswitcher: {
      deps: ['leaflet']
    },
    locationlist: {
      deps: ['leaflet']
    },
  },
  hbs: { // optional
    helpers: true, // default: true
    templateExtension: 'hbs', // default: 'hbs'
    partialsUrl: 'templates/', // default: ''
    handlebarsPath: "handlebars"
  },
  config: {
    'config': {
      url: mylocation,
      basepath: basepath,
    }
  },
});

requirejs([basepath + 'app/main.js']);
