'use strict';

module.exports = function ( grunt ) {
	/** 
	* Load required Grunt tasks.
	*/
	require('load-grunt-tasks')(grunt);

	/**
	* Load in our build configuration file.
	*/
	var userConfig = require( './build.config.js' );

	/**
	* configuration - Grunt
	*/
	var taskConfig = {
		/**
		*  read `package.json`
		*/
		pkg: grunt.file.readJSON("package.json"),


		/**
		* clean dirs
		*/
		clean:{
			options: { force: true },
			stuff: ['<%= build_dir %>', '<%= compile_dir %>']
		},

		/**
		* copy files
		*/
		copy: {
			build_app_assets: {
				files: [
				{ 
					src: [ '**' ],
					dest: '<%= build_dir %>/assets/',
					cwd: 'src/assets',
					expand: true
				}
				]   
			},
			build_vendor_assets: {
				files: [
				{ 
					src: [ '<%= vendor_files.assets %>' ],
					dest: '<%= build_dir %>/assets/',
					cwd: '.',
					expand: true,
					flatten: true
				}
				]   
			},
			build_appjs: {
				files: [
				{
					src: [ '<%= app_files.js %>' ],
					dest: '<%= build_dir %>/',
					cwd: '.',
					expand: true
				}
				]
			},
			build_vendorjs: {
				files: [
				{
					src: [ '<%= vendor_files.js %>' ],
					dest: '<%= build_dir %>/',
					cwd: '.',
					expand: true
				}
				]
			},
			build_fonts: {
				files: [
				{
					src: [ '<%= vendor_files.fonts %>' ],
					dest: '<%= build_dir %>/fonts/',
					cwd: '.',
					expand: true,
					flatten: true
				}
				]
			}
		},

		/**
		* concat files.
		*/
		concat: {
			build_css: {
				src: [
				'<%= vendor_files.css %>',
				'<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
				],
				/*dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'*/
				dest: '<%= build_dir %>/assets/dest.css'
			},
		},

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= build_dir %>/assets/',
					src: ['dest.css', '!*.min.css'],
					dest: '<%= build_dir %>/assets/',
					ext: '.min.css'
				}],
				options: {
					shorthandCompacting: false,
					roundingPrecision: -1
				}
			}
		},

		/**
		* 'less'- compile less
		*/
		less: {
			build: {
				files: {
					'<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.less %>'
				},
				options: {
					dumpLineNumbers: 'comments'
				}
			},
			compile: {
				files: {
					'<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.less %>'
				},
				options: {
					cleancss: true,
					compress: true
				}
			}
		},

		/**
		* `jshint` - check JS syntax
		*/
		jshint: {
			src: [ 
			'<%= app_files.js %>'
			],
			test: [
			'<%= app_files.jsunit %>'
			],
			/*gruntfile: [
			'Gruntfile.js'
			],*/
			options: {
				jshintrc: true
			},
			globals: {}
		},

		/**
		* Templates to JS
		*/
		html2js: {
			/**
			* These are the templates from `src/app`.
			*/
			app: {
				options: {
					base: 'src/app'
				},
				src: [ '<%= app_files.atpl %>' ],
				dest: '<%= build_dir %>/templates-app.js'
			},

			/**
			* These are the templates from `src/common`.
			*/
			common: {
				options: {
					base: 'src/common'
				},
				src: [ '<%= app_files.ctpl %>' ],
				dest: '<%= build_dir %>/templates-common.js'
			}
		},

		/**
		* The `index` task compiles the `index.html` file as a Grunt template. CSS
		* and JS files co-exist here but they get split apart later.
		*/
		index: {

			/**
			* During development, we don't want to have wait for compilation,
			* concatenation, minification, etc. So to avoid these steps, we simply
			* add all script files directly to the `<head>` of `index.html`. The
			* `src` property contains the list of included files.
			*/
			build: {
				dir: '<%= build_dir %>',
				src: [
				'<%= vendor_files.js %>',
				'<%= build_dir %>/src/**/*.js',
				'<%= html2js.common.dest %>',
				'<%= html2js.app.dest %>',
			//vendor_files.css have been already merged into pkg.name.css
			//So, we don't need both vendor_files.css and pkg.name-pkg.version.css
			//In addition, build task will not copy vendor_files.css to the 
			//build folder and this line would cause an error
			//'<%= vendor_files.css %>', 
			'<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
			]
			}
		},

		/**
		* Watch
		*/
		delta: {
			fls: {
				files: ['./src/**/*.js','./src/**/*.html','./src/**/*.css','./src/**/*.less', './build.config.js'],
				tasks: ['build'],
				options: {
					livereload: true
				}
			}
		}
	};

	grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

	grunt.renameTask( 'watch', 'delta' );
	grunt.registerTask( 'watch', ['build',  'delta:fls' ] );


	/**
	* The `build` task gets your app ready to run for development and testing.
	*/
	grunt.registerTask( 'build', [
		'clean', 'html2js', 'jshint', 'less:build', 
		'concat:build_css','cssmin', 'copy:build_app_assets', 'copy:build_vendor_assets',
		'copy:build_appjs', 'copy:build_vendorjs','copy:build_fonts', 'index:build',
	]);
	grunt.registerTask( 'default', [ 'build']);


	/**
	* Add assets to index.html.
	*/
	function filterForJS ( files ) {
		return files.filter( function ( file ) {
			return file.match( /\.js$/ );
		});
	}

	function filterForCSS ( files ) {
		return files.filter( function ( file ) {
			return file.match( /\.css$/ );
		});
	}

	grunt.registerMultiTask( 'index', 'Process index.html template', function () {
		var dirRE = new RegExp( '^('+grunt.config('build_dir')+'|'+grunt.config('compile_dir')+')\/', 'g' );
		var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
			return file.replace( dirRE, '' );
		});
		var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
			return file.replace( dirRE, '' );
		});

		grunt.file.copy('src/index.html', this.data.dir + '/index.html', { 
			process: function ( contents, path ) {
				return grunt.template.process( contents, {
					data: {
						scripts: jsFiles,
						styles: cssFiles,
						version: grunt.config( 'pkg.version' )
					}
				});
			}
		});
	});

};
