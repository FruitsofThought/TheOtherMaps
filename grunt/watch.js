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
            'copy:css'
        ]
    },
};

