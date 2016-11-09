module.exports = {

  // Task options
  options: {
    limit: 12
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
    'copy:templates',
    'copy:newjavascript',
    'copy:leaflet',
    'copy:librarycss',
    'copy:libraryjs',
    'copy:images',
    'cssmin',
    'copy:leafletimages',
    'copy:leafletgeocoderimages'
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
