module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {// Task
            dist: {// Target
                options: {// Target options
                    compress: false,
					sourcemap: 'none'
                },
                files: {// Dictionary of files
                    'static/css/index.css': 'static/css/sass/index.scss'
                }
            }
        },
        watch: {
            css: {
                files: [
                    'static/css/sass/**/*.scss'
                ],
                tasks: ['sass'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },
        //download sdk js
        curl: {
          'static/dev/js/sdk.js': 'https://d31nhj1t453igc.cloudfront.net/sdk/sdk-v1.0.7.min.js',
        },
        //Minify JS
        uglify: {
            options: {
                mangle: false
            },
            theme: {
                files: {
                    'static/deploy/theme.min.js': [
                        'static/js/index.js',
                        'static/js/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js',
                        'static/js/plugins/jquery.validate/jquery.validate.min.js',
                        'static/js/dropzone/dropzone.min.js',
                        'static/js/plugins/bootstrap/js/bootstrap.min.js',
                        'static/js/plugins/jquery.noty-2.3.8/js/noty/packaged/jquery.noty.packaged.min.js',
                        'static/js/plugins/jquery.fancybox/source/jquery.fancybox.js',
                        'static/js/plugins/waypoint/lib/jquery.waypoints.min.js',
                        'static/js/plugins/jquery.ellipsis.js',
                        'static/js/jquery.simplemodal.js',
                        'static/js/zoom.js',
                        'static/js/handlebars-v4.0.5.js',
                        'static/js/plugins/bootstrap-modalmanager.js',
                        'static/js/plugins/bootstrap-modal.js',
                        'static/dev/js/_article-templates.js',
                        'static/dev/js/home.js',
                        'static/dev/js/user-articles.js',
                        'static/dev/js/auth.js',
                        'static/dev/js/search.js',
                        'static/dev/js/common.js',
                        'static/dev/js/account-modal.js',
                        'static/dev/js/user-profile.js',
                        'static/dev/js/login.js',
                        'static/dev/js/sdk.js'
                    ]                    
                }
            }
        },
        cachebreaker: {
            theme: {
                options: {
                    match: ['theme.min.js', 'output.min.css', 'contentbox-breakup.css']
                },
                files: {
                    src: [
                        'layouts/partials/_javascript.twig',
                        'layouts/main.twig'
                    ]
                }
            }
        },
        //Minify Css Files
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            theme: {
                files: {
                    'static/deploy/output.min.css' : [
                        'static/js/plugins/jquery.fancybox/source/jquery.fancybox.css',
                        'static/js/plugins/jquery.noty-2.3.8/demo/animate.css',
                        '../../static/sdk/js/media-player/mediaelementplayer.css',
                        'static/css/index.css'
                    ],
                    'static/deploy/print.min.css': [
                        'static/css/bootstrap-print.css',
                        'static/css/bootstrap-print-md.css'
                    ]
                }
            }
        },
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cache-breaker');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-curl');
    // Default task(s).
    grunt.registerTask('default', ['curl','uglify', 'cssmin', 'cachebreaker']);
};