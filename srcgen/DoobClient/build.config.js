/**
 * This file/module contains all configuration for the build process.
 */
 module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
   build_dir: '/Users/Mix/tomeejsd/webapps/DoobClient',
   //build_dir: 'E:/DOOB/apache-tomee-plus-1.7.1/webapps/DoobClient',
   compile_dir: 'bin',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
   app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],
    
    coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee' ],
    coffeeunit: [ 'src/**/*.spec.coffee' ],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    less: 'src/less/main.less'
  },

  /**
   * This is a collection of files used during testing only.
   */
   test_files: {
    js: [
    'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
   vendor_files: {
    js: [ 
	'vendor/jquery/dist/jquery.min.js',
    'vendor/jquery/dist/jquery.min.map',
    'vendor/angular/angular.js',
    'vendor/angular-route/angular-route.js',	
    'vendor/bootstrap/dist/js/bootstrap.min.js',
    'vendor/angular-bootstrap/ui-bootstrap.min.js',
    'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',    
    'vendor/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
    'vendor/angular-ui-router/release/angular-ui-router.js',
    'vendor/angular-ui-utils/modules/route/route.js',
    'vendor/angular-resource/angular-resource.js',
    'vendor/underscore/underscore.js',
    'vendor/angular-underscore-module/angular-underscore-module.js',
    'vendor/jquery/dist/jquery.js',
    'vendor/jquery/dist/jquery.map',
    'vendor/bower-angular-placeholders/angular-placeholders.min.js',
    'vendor/angular-loading-bar/build/loading-bar.min.js', 
    'vendor/textAngular/dist/textAngular-rangy.min.js',
    'vendor/textAngular/dist/textAngular-sanitize.min.js',
    'vendor/textAngular/dist/textAngular.min.js',
    
    'vendor/angular-smart-table/dist/smart-table.min.js',

    'vendor/ng-file-upload/ng-file-upload.min.js',
	
	'vendor/moment/min/moment.min.js',
  'vendor/angular-moment/angular-moment.min.js',
  'vendor/codebox-moment-precise-range/moment-precise-range.js',
	'vendor/angular-ui-calendar/src/calendar.js',
	'vendor/fullcalendar/dist/fullcalendar.min.js',
	'vendor/fullcalendar/dist/gcal.js',
	'vendor/angular-ui-select/dist/select.js',

    'vendor/angular-dialog-service/dialogs.js',
    'vendor/angular-translate/angular-translate.js',
    'vendor/checklist-model/checklist-model.js',
	'vendor/angular-scroll-complete/angular-scroll-complete.js',
		'vendor/metisMenu/dist/metisMenu.min.js',
		'vendor/slimScroll/jquery.slimscroll.min.js',
		'resources/js/homer.js',
    'resources/js/icheck.min.js',
    'resources/js/sparkline.js',
    'vendor/angular-sweetalert/SweetAlert.min.js',
    'vendor/sweetalert/dist/sweetalert.min.js',
    'vendor/angular-animate/angular-animate.min.js',
    'vendor/angularjs-toaster/toaster.min.js',
    'vendor/angular-notify/angular-notify.js'
    /*'vendor/angular-popover-toggle/popover-toggle.js'*/
    ],
    css: [
    'vendor/angular-dialog-service/dialogs.css',
    'vendor/textAngular/src/textAngular.css',
	'vendor/fullcalendar/dist/fullcalendar.css',
	'vendor/angular-ui-select/dist/select.css',
	'vendor/metisMenu/dist/metisMenu.css',
	'vendor/animate.css/animate.css',
	'resources/fonts/pe-icon-7-stroke/css/pe-icon-7-stroke.css',
	'resources/fonts/pe-icon-7-stroke/css/helper.css',
	/*'resources/css/style.css',*/
	'vendor/font-awesome/css/font-awesome.css',
  'vendor/sweetalert/dist/sweetalert.css',
  'vendor/angularjs-toaster/toaster.min.css',
    'vendor/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css',
    'vendor/angular-notify/angular-notify.css',
    /*'vendor/bootstrap-material-design/dist/css/bootstrap-material-design.css'*/
    ],
    assets: [
    'resources/assets/green.png',
    'resources/assets/DOOB_Corporative_Logo_72.jpg',
    'vendor/material-design-icons/iconfont/MaterialIcons-Regular.eot',
    'vendor/material-design-icons/iconfont/MaterialIcons-Regular.svg',
    'vendor/material-design-icons/iconfont/MaterialIcons-Regular.ttf',
    'vendor/material-design-icons/iconfont/MaterialIcons-Regular.woff',
    'vendor/material-design-icons/iconfont/MaterialIcons-Regular.woff2',
    ],
    fonts: [
    'vendor/bootstrap/fonts/glyphicons-halflings-regular.eot',
    'vendor/bootstrap/fonts/glyphicons-halflings-regular.svg',
    'vendor/bootstrap/fonts/glyphicons-halflings-regular.ttf',
    'vendor/bootstrap/fonts/glyphicons-halflings-regular.woff',
	'vendor/bootstrap/fonts/Exo-Italic.otf',
	'vendor/bootstrap/fonts/Exo-Bold.otf',
	'vendor/bootstrap/fonts/Exo-Regular.otf',
	'vendor/bootstrap/fonts/Exo-Medium.otf',
	'resources/fonts/pe-icon-7-stroke/fonts/Pe-icon-7-stroke.eot',
	'resources/fonts/pe-icon-7-stroke/fonts/Pe-icon-7-stroke.svg',
	'resources/fonts/pe-icon-7-stroke/fonts/Pe-icon-7-stroke.ttf',
	'resources/fonts/pe-icon-7-stroke/fonts/Pe-icon-7-stroke.woff',
	'vendor/font-awesome/fonts/fontawesome-webfont.eot',
	'vendor/font-awesome/fonts/fontawesome-webfont.svg',
	'vendor/font-awesome/fonts/fontawesome-webfont.ttf',
	'vendor/font-awesome/fonts/fontawesome-webfont.woff',
    
    ]
  }
};
