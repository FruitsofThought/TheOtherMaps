module.exports = {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/output.css': [
            'src/css/main.css', 
            'src/css/icons.css'
          ]
        }/*
        [{
      expand: true,
      cwd: 'src/css',
      src: ['*.css', '!*.min.css'],
      dest: 'dist/css',
      ext: '.min.css'
    }]*/
      }
   
    
};



