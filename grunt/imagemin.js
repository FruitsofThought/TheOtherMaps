module.exports = {
    all: {
        files: [{
            expand: true,
            cwd: 'src/icons/',
            src: ['images/*.{png,jpg,gif}'],
            dest: 'dist/icons/'
        }]
    }
};

