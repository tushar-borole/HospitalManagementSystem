var args = require('yargs').argv,
    path = require('path'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    gulpsync = $.sync(gulp),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    PluginError = $.util.PluginError;

// production mode (see build task)
var isProduction = false;
// styles sourcemaps
var useSourceMaps = false;

// Switch to sass mode.
// Example:
//    gulp --usesass
var useSass = args.usesass;

// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!' + hidden_files;

// MAIN PATHS
var paths = {
    app: '../app/',
    markup: 'jade/',
    styles: 'less/',
    scripts: 'js/'
}

// if sass -> switch to sass folder
if (useSass) {
    log('Using SASS stylesheets...');
    paths.styles = 'sass/';
}

// VENDOR CONFIG
var vendor = {
    app: {
        source: require('./vendor.json'),
        dest: '../vendor'
    }
};

// SOURCES CONFIG
var source = {
    scripts: {
        app: [paths.scripts + 'app.init.js',
            paths.scripts + 'modules/*.js',
            paths.scripts + 'custom/**/*.js'
        ],
        demo: paths.scripts + 'modules/demo/*.js'
    },
    templates: {
        app: {
            files: [paths.markup + 'index.jade'],
            watch: [paths.markup + 'index.jade', paths.markup + hidden_files]
        },
        partials: {
            layout: [paths.markup + '_*.*'],
            views: [paths.markup + 'views/**/_*.*'],
            pages: [paths.markup + 'pages/**/_*.*']
        },
        views: {
            files: [paths.markup + 'views/**/*.jade'],
            watch: [paths.markup + 'views/**/*.jade']
        },
        pages: {
            files: [paths.markup + 'pages/*.jade'],
            watch: [paths.markup + 'pages/*.jade']
        }
    },
    styles: {
        app: [paths.styles + '*.*'],
        themes: [paths.styles + 'themes/*', ignored_files],
        watch: [paths.styles + '**/*', '!' + paths.styles + 'themes/*']
    }
};

// BUILD TARGET CONFIG
var build = {
    scripts: {
        app: {
            main: 'app.js',
            dir: paths.app + 'js'
        },
        demo: paths.app + 'js/demo'
    },
    styles: paths.app + 'css',
    templates: {
        views: paths.app,
        pages: paths.app
    }
};

// PLUGINS OPTIONS

var prettifyOpts = {
    indent_char: ' ',
    indent_size: 3,
    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u', 'pre', 'code']
};

var vendorUglifyOpts = {
    mangle: {
        except: ['$super'] // rickshaw requires this
    }
};

var compassOpts = {
    project: path.join(__dirname, '../'),
    css: 'app/css',
    sass: 'master/sass/',
    image: 'app/img'
};

var compassOptsThemes = {
    project: path.join(__dirname, '../'),
    css: 'app/css',
    sass: 'master/sass/themes/', // themes in a subfolders
    image: 'app/img'
};

var cssnanoOpts = {
    safe: true,
    discardUnused: false, // no remove @font-face
    reduceIdents: false // no change on @keyframes names
}

//---------------
// TASKS
//---------------


// JS APP
gulp.task('scripts:app', function() {
    log('Building scripts..');
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.scripts.app)
        .pipe($.jsvalidate())
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe($.concat(build.scripts.app.main))
        .on("error", handleError)
        .pipe($.if(isProduction, $.uglify({
            preserveComments: 'some'
        })))
        .on("error", handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.scripts.app.dir))
        .pipe(reload({
            stream: true
        }));
});

// VENDOR BUILD
// copy file from bower folder into the app vendor folder
gulp.task('vendor', function() {
    log('Copying vendor assets..');

    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src(vendor.app.source, {
            base: 'bower_components'
        })
        .pipe($.expectFile(vendor.app.source))
        .pipe(jsFilter)
        .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe(cssFilter.restore())
        .pipe(gulp.dest(vendor.app.dest));

});

// SCRIPTS DEMO
// copy file from demo folder into the app folder
gulp.task('scripts:demo', function() {

    return gulp.src(source.scripts.demo)
        .pipe(gulp.dest(build.scripts.demo))
        .pipe(reload({
            stream: true
        }));

});

// APP LESS
gulp.task('styles:app', function() {
    log('Building application styles..');
    return gulp.src(source.styles.app)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe(useSass ? $.compass(compassOpts) : $.less())
        .on("error", handleError)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

// APP RTL
gulp.task('styles:app:rtl', function() {
    log('Building application RTL styles..');
    return gulp.src(source.styles.app)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe(useSass ? $.compass(compassOpts) : $.less())
        .on("error", handleError)
        .pipe($.rtlcss())
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe($.rename(function(path) {
            path.basename += "-rtl";
            return path;
        }))
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

// LESS THEMES
gulp.task('styles:themes', function() {
    log('Building application theme styles..');
    return gulp.src(source.styles.themes)
        .pipe(useSass ? $.compass(compassOptsThemes) : $.less())
        .on("error", handleError)
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});


// JADE PAGES
gulp.task('templates:pages', templatePagesTask());
gulp.task('templates:pages:forced', templatePagesTask(true));

// JADE VIEWS
gulp.task('templates:views', templatesViewTask());
gulp.task('templates:views:forced', templatesViewTask(true));

//---------------
// WATCH
//---------------

// Rerun the task when a file changes
gulp.task('watch', function() {
    log('Watching source files..');

    gulp.watch(source.scripts.app, ['scripts:app']);
    gulp.watch(source.scripts.demo, ['scripts:demo']);
    gulp.watch(source.styles.watch, ['styles:app', 'styles:app:rtl']);
    gulp.watch(source.styles.themes, ['styles:themes']);
    gulp.watch(source.templates.pages.watch, ['templates:pages']);
    gulp.watch(source.templates.views.watch, ['templates:views']);
    // Jade partials (forces to rebuild all templates)
    gulp.watch(source.templates.partials.layout, ['templates:views:forced', 'templates:pages:forced']);
    gulp.watch(source.templates.partials.views, ['templates:views:forced']);
    gulp.watch(source.templates.partials.pages, ['templates:pages:forced']);

});

// Serve files with auto reaload
gulp.task('browsersync', function() {
    log('Starting BrowserSync..');

    browserSync({
        notify: false,
        server: {
            baseDir: '..'
        }
    });

});

//---------------
// MAIN TASKS
//---------------

// build for production (minify)
gulp.task('build', gulpsync.sync([
    'prod',
    'vendor',
    'assets'
]));

gulp.task('prod', function() {
    log('Starting production build...');
    isProduction = true;
});

// Server for development
gulp.task('serve', gulpsync.sync([
    'default',
    'browsersync'
]), done);

// Server for production
gulp.task('serve-prod', gulpsync.sync([
    'build',
    'browsersync'
]), done);

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function() {
    useSourceMaps = true;
});

// default (no minify)
gulp.task('default', gulpsync.sync([
    'vendor',
    'assets',
    'watch'
]));

gulp.task('assets', [
    'scripts:app',
    'scripts:demo',
    'styles:app',
    'styles:app:rtl',
    'styles:themes',
    'templates:pages',
    'templates:views'
]);


/////////////////////

function done(){
  log('************');
  log('* All Done * You can start editing your code, BrowserSync will update your browser after any change..');
  log('************');
}

// Error handler
function handleError(err) {
    log(err.toString());
    this.emit('end');
}

// log to console using
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}

// Generate tasks to compile pages templates
// forced: doesn't take care of changed files
function templatePagesTask(forced) {
    return function() {
        log('Building pages..');
        return gulp.src(source.templates.pages.files)
            .pipe($.if(!forced, $.changed(build.templates.pages, {
                extension: '.html'
            })))
            .pipe($.filter(function(file) {
                return !/[\/\\]_/.test(file.path) && !/[\/\\]_/.test(file.relative) && !/^_/.test(file.relative);
            }))
            .pipe($.jade())
            .on("error", handleError)
            .pipe($.htmlPrettify(prettifyOpts))
            .pipe(gulp.dest(build.templates.pages))
            .pipe(reload({
                stream: true
            }));
    };
}

// Generate tasks to compile view templates
// forced: doesn't take care of changed files
function templatesViewTask(forced) {
    return function() {
        log('Building views..');
        return gulp.src(source.templates.views.files)
            .pipe($.if(!forced, $.changed(build.templates.views, {
                extension: '.html'
            })))
            .pipe($.filter(function(file) {
                return !/[\/\\]_/.test(file.path) && !/[\/\\]_/.test(file.relative) && !/^_/.test(file.relative);
            }))
            .pipe($.jade({
                locals: require('./sidebar.json')
            }))
            .on("error", handleError)
            .pipe($.htmlPrettify(prettifyOpts))
            .pipe(gulp.dest(build.templates.views))
            .pipe(reload({
                stream: true
            }));
    };
}