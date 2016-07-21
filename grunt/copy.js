module.exports = {
  html: {
    files: [{
      expand: true,
      flatten: true,
      src: ['src/index.html',
        'src/tanzania.html',
        'src/develop.html',
        'src/local.html',
        'src/favicon.ico'
      ],
      dest: 'dist/'
    }]
  },
  css: {
    files: [{
      expand: true,
      flatten: true,
      src: 'src/css/*',
      dest: 'dist/css/'
    }]
  },
  fonts: {
    files: [{
      expand: true,
      flatten: true,
      src: 'bower_components/font-awesome/fonts/*',
      dest: 'dist/fonts/'
    }]
  },
  librarycss: {
    files: [{
      expand: true,
      flatten: true,
      src: ['bower_components/leaflet/dist/leaflet.css',
        'bower_components/sidebar-v2/css/leaflet-sidebar.css',
        'bower_components/Leaflet.VisualClick/dist/L.VisualClick.css',
        'bower_components/font-awesome/css/font-awesome.min.css',
        'src/app/modules/leaflet.locationlist.css',
        'bower_components/PACE/themes/black/pace-theme-center-simple.css'
      ],
      dest: 'dist/css/'
    }]
  },
  libraryjs: {
    files: [{
      expand: true,
      flatten: true,
      src: ['bower_components/underscore/underscore.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/tangram/dist/tangram.min.js',
        'bower_components/tangram/dist/tangram.debug.js',
        'bower_components/lodash/lodash.js',
        'bower_components/postal.js/lib/postal.js',
        'bower_components/PACE/pace.min.js'
      ],
      dest: 'dist/lib/'
    }]
  },
  icons: {
    files: [{
      expand: true,
      flatten: true,
      src: 'src/icons/sprite.png',
      dest: 'dist/icons/'
    }]
  },
  images: {
    files: [{
      expand: true,
      flatten: true,
      src: 'bower_components/tipsy/src/images/tipsy.gif',
      dest: 'dist/images/'
    }]
  },
  lang: {
    files: [{
      expand: true,
      flatten: true,
      src: 'src/lang/*',
      dest: 'dist/lang/'
    }]
  },
  scenes: {
    files: [{
      expand: true,
      flatten: false,
      cwd: 'src/scenes/',
      src: '**',
      dest: 'dist/scenes/'
    }]
  },
  templates: {
    files: [{
      expand: true,
      flatten: true,
      src: 'src/templates/*',
      dest: 'dist/templates/'
    }]
  },
  newjavascript: {
    files: [{
      expand: true,
      flatten: true,
      src: ['src/app/modules/L.Control.SceneSwitcher.js',
        'src/app/modules/OsmInfobox.js',
        'src/app/modules/leaflet.locationlist.js',
        'src/app/modules/PermaLink.js',
        'src/app/modules/Scene.js',
        'src/app/modules/ScenesList.js',
        'src/app/modules/OurPolyglot.js',
        'src/app/modules/TOMMap.js',
        'src/app/modules/TOMLegend.js',
        'src/app/modules/TOMTangram.js',
        'src/app/modules/TOMTangramInteraction.js',
        'src/app/modules/TOMLocationsPanel.js',
        'src/app/modules/TOMWikidataLayer.js',
        'src/app/modules/TOMLeftSidebar.js',
        'src/app/modules/TOMRightSidebar.js'
      ],
      dest: 'dist/app/modules/'
    }]
  },
  leaflet: {
    files: [{
      expand: true,
      flatten: true,
      src: 'bower_components/leaflet/dist/leaflet-src.js',
      dest: 'dist/lib/leaflet/'
    }]
  },
  leafletimages: {
    files: [{
      expand: true,
      flatten: true,
      src: 'bower_components/leaflet/dist/images/*',
      dest: 'dist/lib/leaflet/images/'
    }]
  }
};
