module.exports = {
    html: {
      files: [{
        expand: true,
        flatten: true,
        src: ['src/index.html',
              'src/tanzania.html',
              'src/favicon.ico'],
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
    librarycss: {
      files: [{
        expand: true,
        flatten: true,
        src: ['src/_lib/leaflet/dist/leaflet.css',
            'src/_lib/sidebar-v2/css/leaflet-sidebar.css',
            'src/_lib/Leaflet.VisualClick/dist/L.VisualClick.css',
            'src/app/modules/leaflet.locationlist.css'
            ],
        dest: 'dist/css/'
      }]
    },
    libraryjs: {
      files: [{
        expand: true,
        flatten: true,
        src: ['src/_lib/underscore/underscore.js',
            'src/_lib/jquery/dist/jquery.js',
            'src/_lib/tangram/dist/tangram.min.js'
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
        flatten: true,
        src: 'src/scenes/*',
        dest: 'dist/scenes/'
      }]
    },
    scenesimages: {
      files: [{
        expand: true,
        flatten: true,
        src: 'src/scenes/images/*',
        dest: 'dist/scenes/images/'
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
              'src/app/modules/Scenes.js'
             ],
        dest: 'dist/app/modules/'
      }]
    },
    leaflet: {
      files: [{
        expand: true,
        flatten: true,
        src: 'src/_lib/leaflet/dist/leaflet-src.js',
        dest: 'dist/lib/leaflet/'
      }]
    }
};
