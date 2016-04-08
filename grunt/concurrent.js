module.exports = {

  // Task options
  options: {
    limit: 3
  },

  // Dev tasks
  devFirst: [
    'clean',
    'jshint'
  ],
  devSecond: [
    'sass:dev',
    'uglify:dev',
    'copy:icons',
    'copy:html',
    'copy:fonts',
    'copy:lang',
    'copy:scenes',
    'copy:scenesimages',
    'copy:templates',
    'copy:newjavascript',
    'copy:leaflet',
    'copy:librarycss',
    'copy:libraryjs',
    'copy:tangram53',
    'cssmin',
  ],

  // Production tasks
  prodFirst: [
    'clean',
    'jshint'
  ],
  prodSecond: [
    'sass:prod',
    'uglify:prod'
  ],

  // Image tasks
  imgFirst: [
    'sprites:icons',
    'pngmin:icons'
    //        'imagemin'
  ]
};
