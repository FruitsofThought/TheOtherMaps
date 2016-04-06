module.exports = {
    prod: {
        files: [{
            expand: false,
            cwd: 'src/_lib',
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
          'dist/js/require.js': ['src/_lib/requirejs/require.js'],
/*          'dist/js/lib.min.js': [
            'src/_lib/requirejs/requirejs-text/text.js',
            'src/_lib/js-yaml/dist/js-yaml.js',
            'src/_lib/jquery/dist/jquery.js',
            'src/_lib/requirejs-yaml/yaml.js',
            'src/_lib/requirejs-plugins/requirejs-plugins.js',
            'src/_lib/tangram/tangram-debug.js',
            'src/_lib/polyglot/polyglot.js',
            'src/_lib/leaflet/leaflet.js',
            'src/_lib/leaflet-sidebar/leaflet-sidebar.js',
            'src/_lib/keymaster/keymaster.js',
            'src/_lib/leaflet-hash/leaflet-hash.js',
            'src/_lib/wikidata-sdk/wikidata-sdk.js',
            'src/_lib/handlebars/handlebars.js',
          ],
          */
          'dist/lib/requirejs/text.js': ['src/_lib/requirejs-text/text.js'],
          'dist/lib/requirejs/json.js': ['src/_lib/requirejs-plugins/src/json.js'],
          'dist/lib/requirejs/hbs.js': ['src/_lib/require-handlebars-plugin/hbs.js'],
          'dist/lib/requirejs/hbs/handlebars.js': ['src/_lib/handlebars/handlebars.js'],
          'dist/lib/requirejs/hbs/json2.js': ['src/_lib/require-handlebars-plugin/hbs/json2.js'],
          'dist/lib/requirejs/hbs/underscore.js': ['src/_lib/require-handlebars-plugin/hbs//underscore.js'],
          'dist/lib/requirejs/yaml.js': ['src/_lib/require-yaml/yaml.js'],
          'dist/lib/js-yaml.js': ['src/_lib/js-yaml/dist/js-yaml.js'],
          // We dont uglify jquery, its big and its too time consuming
       //   'dist/lib/jquery.js': ['src/_lib/jquery/dist/jquery.js'],
          // DO NOT CHANGE THIS FILENAME (or change it to tangram.debug.js) else tangram will die!
          //'dist/lib/tangram.min.js': ['src/_lib/tangram/dist/tangram.debug.js'],
          'dist/lib/polyglot.js': ['src/_lib/polyglot/build/polyglot.js'],
          // the uglishing creates problems
//          'dist/lib/leaflet/leaflet.js': ['src/_lib/leaflet/dist/leaflet.js'],
          // I need to fork, clone and do some magic to bower.js to make this work
          //          'dist/lib/leaflet/leaflet-sidebar.js': ['src/_lib/sidebar-v2/js/leaflet-sidebar.js'],
          'dist/lib/leaflet/leaflet-sidebar.js': ['src/app/modules/leaflet-sidebar_mycustomversion.js'],
          'dist/lib/keymaster.js': ['src/_lib/keymaster/keymaster.js'],
          'dist/lib/leaflet/leaflet-hash.js': ['src/_lib/leaflet-hash/leaflet-hash.js'],
          'dist/lib/leaflet/L.VisualClick.js': ['src/_lib/Leaflet.VisualClick/dist/L.VisualClick.js'],
          'dist/lib/wikidata-sdk.js': ['src/_lib/wikidata-sdk/dist/wikidata-sdk.js'],
          'dist/lib/handlebars.js': ['src/_lib/handlebars/handlebars.js'],
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
