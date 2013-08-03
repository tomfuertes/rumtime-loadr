/*global module:false*/
module.exports = function (grunt) {
    "use strict";

    require('matchdep')
        .filterDev('grunt-*')
        .forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: [
            '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ',
            '<%= grunt.template.today("yyyy-mm-dd") %>\n',
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>',
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;',
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
        ].join(""),
        html_banner: [
            '<!-- <%= pkg.homepage %> -->',
            '<script data-version="v<%= pkg.version %>">'
        ].join(""),
        html_footer: '</script>',
        // Task configuration.
        concat: {
            options: {
                // banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/{,*/}*.js'],
                dest: 'dist/<%= pkg.name %>.v<%= pkg.version %>.js'
            },
            wrap: {
                options: {
                    banner: '<%= html_banner %>',
                    footer: '<%= html_footer %>'
                },
                src: '<%= uglify.dist.dest %>',
                dest: '<%= uglify.dist.dest %>.html'
            }
        },
        uglify: {
            options: {
                // banner: '<%= banner %>'
            },
            dist: {
                src: 'dist/rumtime-loadr.v0.0.0.js', // '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.v<%= pkg.version %>.min.js'
            }
        },
        jshint: {
            options: grunt.file.readJSON('.jshintrc'),
            lib_test: {
                src: ['lib/{,*/}*.js']
            }
        },
        qunit: {
            files: ['tests/test.html']
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'qunit']
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: "JST"
                },
                files: {
                    "path/to/result.js": "path/to/source.hbs"
                }
            }
        }
    });



    // Default task.
    grunt.registerTask('default', ['jshint', 'qunit', 'concat:dist', 'uglify', 'concat:wrap']);

    // Specific tasks
    grunt.registerTask('test', ['qunit']);

    grunt.registerTask('hint', ['jshint']);

};