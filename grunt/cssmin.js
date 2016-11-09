module.exports = {
  options: {
    shorthandCompacting: false,
    roundingPrecision: -1
  },
  target: {
    files: {
      'dist/css/output.css': [
        'src/css/main.css',
        'src/css/icons.css',
        'bower_components/tipsy/src/stylesheets/tipsy.css',
        'bower_components/leaflet-geocoder-mapzen/src/leaflet-geocoder-mapzen.css',
        'bower_components/leaflet/dist/leaflet.css',
        'bower_components/sidebar-v2/css/leaflet-sidebar.css',
        'bower_components/Leaflet.VisualClick/dist/L.VisualClick.css',
        'bower_components/font-awesome/css/font-awesome.min.css'
      ]
    },
  },
  /*
          [{
        expand: true,
        cwd: 'src/css',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css',
        ext: '.min.css'
      }]*/



};
