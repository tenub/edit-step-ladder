module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['clean', 'jshint', 'mochaTest', 'uglify', 'cleanempty']);

  grunt.initConfig({
    clean: ['dist'],
    cleanempty: {
      options: {
        noJunk: true
      },
      src: ['dist/**'],
    },
    jshint: {
      options: {
        laxcomma: true
      },
      all: ['Gruntfile.js', 'src/edit-step-ladder.js', 'test/test.js']
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false
        },
        src: ['test/test.js']
      }
    },
    uglify: {
      dist: {
        files: [{
            expand: true,
            cwd: 'src',
            src: 'edit-step-ladder.js',
            dest: 'dist',
            ext: '.min.js'
        }]
      }
    }
  });
};
