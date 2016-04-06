module.exports = {

    // Task options
    options: {
        limit: 6
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
        'copy:lang',
        'copy:scenes',
        'copy:scenesimages',
        'copy:templates',
        'copy:newjavascript',
        'copy:leaflet',
        'copy:librarycss',
        'copy:libraryjs',
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

