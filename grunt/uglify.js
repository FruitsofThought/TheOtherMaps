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
        banner: '/*! (c) Reinier Battenberg OSM Labels lib - v 1.0 -' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      files: {
          'dist/js/require.js': ['bower_components/requirejs/require.js'],
/*          'dist/js/lib.min.js': [
            'bower_components/requirejs/requirejs-text/text.js',
            'bower_components/js-yaml/dist/js-yaml.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/requirejs-yaml/yaml.js',
            'bower_components/requirejs-plugins/requirejs-plugins.js',
            'bower_components/tangram/tangram-debug.js',
            'bower_components/polyglot/polyglot.js',
            'bower_components/leaflet/leaflet.js',
            'bower_components/leaflet-sidebar/leaflet-sidebar.js',
            'bower_components/keymaster/keymaster.js',
            'bower_components/leaflet-hash/leaflet-hash.js',
            'bower_components/wikidata-sdk/wikidata-sdk.js',
            'bower_components/handlebars/handlebars.js',
          ],
          */
          'dist/lib/requirejs/text.js': ['bower_components/requirejs-text/text.js'],
          'dist/lib/requirejs/json.js': ['bower_components/requirejs-plugins/src/json.js'],
          'dist/lib/requirejs/hbs.js': ['bower_components/require-handlebars-plugin/hbs.js'],
          'dist/lib/requirejs/hbs/handlebars.js': ['bower_components/handlebars/handlebars.js'],
          'dist/lib/requirejs/hbs/json2.js': ['bower_components/require-handlebars-plugin/hbs/json2.js'],
          'dist/lib/requirejs/hbs/underscore.js': ['bower_components/require-handlebars-plugin/hbs//underscore.js'],
          'dist/lib/requirejs/yaml.js': ['bower_components/require-yaml/yaml.js'],
          'dist/lib/js-yaml.js': ['bower_components/js-yaml/dist/js-yaml.js'],
          // We dont uglify jquery, its big and its too time consuming
       //   'dist/lib/jquery.js': ['bower_components/jquery/dist/jquery.js'],
          // DO NOT CHANGE THIS FILENAME (or change it to tangram.debug.js) else tangram will die!
          //'dist/lib/tangram.min.js': ['bower_components/tangram/dist/tangram.debug.js'],
          'dist/lib/polyglot.js': ['bower_components/polyglot/build/polyglot.js'],
          // the uglishing creates problems
//          'dist/lib/leaflet/leaflet.js': ['bower_components/leaflet/dist/leaflet.js'],
          // I need to fork, clone and do some magic to bower.js to make this work
          //          'dist/lib/leaflet/leaflet-sidebar.js': ['bower_components/sidebar-v2/js/leaflet-sidebar.js'],
          'dist/lib/leaflet/leaflet-sidebar.js': ['src/app/modules/leaflet-sidebar_mycustomversion.js'],
          'dist/lib/keymaster.js': ['bower_components/keymaster/keymaster.js'],
          'dist/lib/leaflet/leaflet-hash.js': ['bower_components/leaflet-hash/leaflet-hash.js'],
          'dist/lib/leaflet/L.VisualClick.js': ['bower_components/Leaflet.VisualClick/dist/L.VisualClick.js'],
          'dist/lib/wikidata-sdk.js': ['bower_components/wikidata-sdk/dist/wikidata-sdk.js'],
          'dist/lib/handlebars.js': ['bower_components/handlebars/handlebars.js'],
          'dist/app.js': ['src/app.js'],
          'dist/apptz.js': ['src/apptz.js'],
          'dist/app/main.js': ['src/app/main.js'],
          // And this is the reason why we have dev and prod!
          'dist/app/configdev.js': ['src/app/configdev.js'],
          'dist/app/configtz.js': ['src/app/configtz.js'],
          'dist/app/configprod.js': ['src/app/configprod.js'],
          'dist/app/modules/GlobalPolyglot.js': ['src/app/modules/GlobalPolyglot.js'],
          'dist/app/modules/Languages.js': ['src/app/modules/Languages.js'],
          'dist/app/modules/Permalink.js': ['src/app/modules/Permalink.js'],
          // These files uses Javascript 6 (ESM6 or Harmony) and uglify does not support that yet.
          // So for now, this file is copied in a copy task
//          'dist/app/modules/L.Control.SceneSwitcher.js': ['src/app/modules/L.Control.SceneSwitcher.js'],
//          'dist/app/modules/OsmInfobox.js': ['src/app/modules/OsmInfobox.js'],
          'dist/templates/helpers/t.js': ['src/templates/helpers/t.js'],

        }
    }
};
