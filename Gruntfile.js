module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
                dist: {
                    src: [
                        '*.js'
                    ],
                    dest: 'production.js',
                }
            },
        uglify: {
            build: {
                src: 'production.js',
                dest: 'production.min.js'
            }
        },
        imagemin: {
                dynamic: {
                    files: [{
                        expand: true,
                        cwd: 'SVG/',
                        src: ['*.svg'],
                        dest: 'SVG/'
                    }]
                }
            },
            watch: {
                scripts: {
                    files: ['*.js'],
                    tasks: ['concat', 'uglify'],
                    options: {
                        spawn: false,
                    },
                } 
            }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'watch']);

};