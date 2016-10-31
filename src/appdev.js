requirejs.config({
  waitSeconds: 30,
  urlArgs: "bust=v117", // + (new Date()).getTime(),
  baseUrl: '',
  optimizeAllPluginResources: true,
  enforceDefine: false, // will fail for yaml & json anyways nice for debugging
  paths: {
    jquery: 'lib/jquery',
    bowser: 'lib/bowser',
    text: 'lib/requirejs/text', //text is required
    json: 'lib/requirejs/json', //alias to plugin
    hbs: 'lib/requirejs/hbs',
    promised: 'lib/requirejs/promised',
    yaml: 'lib/requirejs/yaml', //alias to plugin
    'js-yaml': 'lib/js-yaml', //alias to plugin
    polyglot: 'lib/polyglot',
    jscookie: 'lib/js.cookie',
    lodash: 'lib/lodash',
    postal: 'lib/postal',
    leaflet: 'lib/leaflet/leaflet-src',
    leaflethash: 'lib/leaflet/leaflet-hash',
    leafletsidebar: 'lib/leaflet/leaflet-sidebar',
    leafletclickevents: 'lib/leaflet/L.VisualClick',
    leafletgeocodermapzen: 'lib/leaflet-geocoder-mapzen',
    locationlist: 'app/modules/leaflet.locationlist',
    keymaster: 'lib/keymaster',
    tipsy: 'lib/jquery.tipsy',
    handlebars: 'lib/handlebars',
    'wikidata-sdk': 'lib/wikidata-sdk',
    ourpolyglot: 'app/modules/OurPolyglot',
    permalink: 'app/modules/PermaLink',
    sceneswitcher: 'app/modules/L.Control.SceneSwitcher',
    scene: 'app/modules/Scene',
    sceneslist: 'app/modules/ScenesList',
    osminfobox: 'app/modules/OsmInfobox',
    tomMap: 'app/modules/TOMMap',
    tomTangram: 'app/modules/TOMTangram',
    tomTangramInteraction: 'app/modules/TOMTangramInteraction',
    tomLegend: 'app/modules/TOMLegend',
    tomLocationsPanel: 'app/modules/TOMLocationsPanel',
    tomWikidataLayer: 'app/modules/TOMWikidataLayer',
    tomLeftSidebar: 'app/modules/TOMLeftSidebar',
    tomRightSidebar: 'app/modules/TOMRightSidebar',
    config: 'app/configdev',
    main: 'app/main',
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
    partialsUrl: '', // default: ''
    handlebarsPath: "handlebars"
  }
});

//use plugins as if they were at
requirejs(['main']);
