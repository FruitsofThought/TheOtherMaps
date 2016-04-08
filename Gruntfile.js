// based on this tutorial
// http://mattbailey.io/a-beginners-guide-to-grunt-redux.html
var pkgjson = require('./package.json');

var config = {
  pkg: pkgjson,
  app: 'src',
  dist: 'dist'
}

module.exports = function(grunt) {
  // This module has sub-tasks that need to be loaded
  grunt.loadNpmTasks('grunt-imagine');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  //require('time-grunt')(grunt);

  require('load-grunt-config')(grunt, {
    jitGrunt: true
  });
};
