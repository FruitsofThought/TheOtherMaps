module.exports = {
  options: {
    spawn: false,
    livereload: true
  },

  scripts: {
    files: [
      'src/app//modules/*.js',
      'src/app/*.js',
      'src/js/*.js',
      'src/*.js',
      'src/templates/helpers/*.js',
    ],
    tasks: [
      'jshint',
      'uglify:dev',
      'copy:newjavascript',
      'copy:leaflet'
    ]
  },
  html: {
    files: [
      'src/*.html'
    ],
    tasks: [
      'copy:html'
    ]
  },
  styles: {
    files: [
      'src/css/*.css'
    ],
    tasks: [
      'cssmin',
      'copy:css'
    ]
  },
  templates: {
    files: [
      'src/templates/*.hbs'
    ],
    tasks: [
      'copy:templates'
    ]
  },
  scenes: {
    files: [
      'src/scenes/*',
      'src/scenes/startdate/*'
    ],
    tasks: [
      'copy:scenes'
    ]
  },
};
