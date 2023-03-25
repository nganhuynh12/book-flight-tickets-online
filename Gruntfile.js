module.exports = (grunt) => {
  grunt.initConfig({
    uglify: {
      all: {
        files: {
          'public/javascripts/minify.min.js': ['public/javascripts/**/*.js'],
        },
      },
    },
    cssmin: {
      combine: {
        files: {
          'public/stylesheets/minify.css': ['public/stylesheets/**/*.css'],
        },
      },
      minify: {
        src: 'public/stylesheets/minify.css',
        dest: 'public/stylesheets/minify.min.css',
      },
    },
    less: {
      development: {
        options: {
          customFunctions: {
            static(lessObject, name) {
              return `url("${require('./lib/static').map(name.value)}")`;
            },
          },
        },
        files: { 'public/css/main.css': 'less/main.less' },
      },
    },
    hashres: {
      options: {
        fileNameFormat: '${name}.${hash}.${ext}',
      },
      all: {
        src: [
          'public/javascripts/minify.min.js',
          'public/stylesheets/minify.min.css',
        ],
        dest: ['config/config.js'],
      },
    },
  });
  [
    'grunt-contrib-less',
    'grunt-contrib-cssmin',
    'grunt-contrib-uglify',
    'grunt-hashres',
  ].forEach((task) => grunt.loadNpmTasks(task));

  grunt.registerTask('static', ['less', 'cssmin', 'uglify', 'hashres']);
};
