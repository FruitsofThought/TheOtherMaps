requirejs.config({
    waitSeconds : 30,
//    urlArgs: "bust=v73"+ (new Date()).getTime(),
    baseUrl: '',
    optimizeAllPluginResources: true,
    enforceDefine: false, // will fail for yaml & json anyways nice for debugging
    paths: {
      jquery : 'lib/jquery',
      underscore : 'lib/underscore',
      text : 'lib/requirejs/text', //text is required
      json : 'lib/requirejs/json', //alias to plugin
      hbs: 'lib/requirejs/hbs',
      yaml : 'lib/requirejs/yaml', //alias to plugin
      'js-yaml' : 'lib/js-yaml', //alias to plugin
      polyglot : 'lib/polyglot',
      leaflet : 'lib/leaflet/leaflet-src',
      leaflethash : 'lib/leaflet/leaflet-hash',
      leafletsidebar : 'lib/leaflet/leaflet-sidebar',
      leafletclickevents : 'lib/leaflet/L.VisualClick',
      locationlist : 'app/modules/leaflet.locationlist',
      keymaster : 'lib/keymaster',
      handlebars : 'lib/handlebars',
      wikidata : 'lib/wikidata-sdk',
      globalpolyglot : 'app/modules/GlobalPolyglot',
      permalink : 'app/modules/Permalink',
      sceneswitcher : 'app/modules/L.Control.SceneSwitcher',
      osminfobox : 'app/modules/OsmInfobox',
      config: 'app/configprod',
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
      helpers: true,            // default: true
      templateExtension: 'hbs', // default: 'hbs'
      partialsUrl: '',           // default: ''
      handlebarsPath: "handlebars"
    }
});

//use plugins as if they were at
requirejs(['main']);
