module.exports = {
  prod: {
    files: [{
      expand: false,
      cwd: 'bower_components',
      src: '**/*.js',
      dest: 'dist/lib',
      ext: '.debug.js'
    }]
  },
  dev: {
    options: {
      mangle: false,
      sourceMap: true,
      beautify: true,
      banner: '/*! (c) Reinier Battenberg TOM lib - v 1.0 -' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    files: {
      'dist/js/require.js': ['bower_components/requirejs/require.js'],
      'dist/lib/bowser.js': [
        'bower_components/bowser/src/bowser.js'
      ],
      'dist/lib/requirejs/text.js': [
        'bower_components/requirejs-text/text.js'
      ],
      'dist/lib/requirejs/json.js': [
        'bower_components/requirejs-plugins/src/json.js'
      ],
      'dist/lib/requirejs/hbs.js': [
        'bower_components/require-handlebars-plugin/hbs.js'
      ],
      'dist/lib/requirejs/promised.js': [
        'bower_components/requirejs-promised/promised.js'
      ],
      'dist/lib/requirejs/requirejs-promise.js': [
        'bower_components/requirejs-promise/requirejs-promise.js'
      ],
      'dist/lib/requirejs/hbs/handlebars.js': [
        'bower_components/handlebars/handlebars.js'
      ],
      'dist/lib/requirejs/hbs/json2.js': [
        'bower_components/require-handlebars-plugin/hbs/json2.js'
      ],
      'dist/lib/requirejs/hbs/underscore.js': [
        'bower_components/require-handlebars-plugin/hbs//underscore.js'
      ],
      'dist/lib/requirejs/yaml.js': ['bower_components/require-yaml/yaml.js'],
      'dist/lib/js-yaml.js': ['bower_components/js-yaml/dist/js-yaml.js'],
      // We dont uglify jquery, its big and its too time consuming
      //   'dist/lib/jquery.js': ['bower_components/jquery/dist/jquery.js'],
      // DO NOT CHANGE THIS FILENAME (or change it to tangram.debug.js) else tangram will die!
      //'dist/lib/tangram.min.js': ['bower_components/tangram/dist/tangram.debug.js'],
      'dist/lib/polyglot.js': ['bower_components/polyglot/build/polyglot.js'],
      'dist/lib/js.cookie.js': ['bower_components/js-cookie/src/js.cookie.js'],
      'dist/lib/jquery.tipsy.js': [
        'bower_components/tipsy/src/javascripts/jquery.tipsy.js'
      ],
      // the uglishing creates problems
      //          'dist/lib/leaflet/leaflet.js': ['bower_components/leaflet/dist/leaflet.js'],
      // I need to fork, clone and do some magic to bower.js to make this work
      //          'dist/lib/leaflet/leaflet-sidebar.js': ['bower_components/sidebar-v2/js/leaflet-sidebar.js'],
      'dist/lib/leaflet/leaflet-sidebar.js': [
        'src/app/modules/leaflet-sidebar_mycustomversion.js'
      ],
      'dist/lib/keymaster.js': ['bower_components/keymaster/keymaster.js'],
      'dist/lib/leaflet/leaflet-hash.js': [
        'bower_components/leaflet-hash/leaflet-hash.js'
      ],
      'dist/lib/leaflet/L.VisualClick.js': [
        'bower_components/Leaflet.VisualClick/dist/L.VisualClick.js'
      ],
      'dist/lib/wikidata-sdk.js': [
        'bower_components/wikidata-sdk/dist/wikidata-sdk.min.js'
      ],
      'dist/lib/handlebars.js': ['bower_components/handlebars/handlebars.js'],
      'dist/app.js': ['src/app.js'],
      //      'dist/apptz.js': ['src/apptz.js'],
      //      'dist/appdev.js': ['src/appdev.js'],
      //      'dist/applocal.js': ['src/applocal.js'],
      'dist/app/main.js': ['src/app/main.js'],
      // And this is the reason why we have dev and prod!
      //      'dist/app/configdev.js': ['src/app/configdev.js'],
      //      'dist/app/configtz.js': ['src/app/configtz.js'],
      //      'dist/app/configlocal.js': ['src/app/configlocal.js'],
      //      'dist/app/configprod.js': ['src/app/configprod.js'],
      'dist/app/modules/Languages.js': ['src/app/modules/Languages.js'],
      // es6 by now:
      //'dist/app/modules/PermaLink.js': ['src/app/modules/Permalink.js'],
      // These files uses Javascript 6 (ESM6 or Harmony) and uglify does not support that yet.
      // So for now, this file is copied in a copy task
      //          'dist/app/modules/L.Control.SceneSwitcher.js': ['src/app/modules/L.Control.SceneSwitcher.js'],
      //          'dist/app/modules/OsmInfobox.js': ['src/app/modules/OsmInfobox.js'],
      'dist/templates/helpers/t.js': ['src/templates/helpers/t.js'],
      'dist/templates/helpers/debug.js': ['src/templates/helpers/debug.js'],
      'dist/templates/helpers/getosmkeyvalue.js': ['src/templates/helpers/getosmkeyvalue.js'],
    }
  }
};
