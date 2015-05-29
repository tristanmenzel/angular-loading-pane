var gulp = require('gulp');

var concat = require('gulp-concat');
var del = require('del');
var es = require('event-stream');
var expect = require('gulp-expect-file');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var ngHtml2Js = require('gulp-ng-html2js');
var ngAnnotate = require('gulp-ng-annotate');
var pleeease = require('gulp-pleeease');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');

var mapsLocation = './maps/';

function dist() {
    return gulp.dest('./dist/');
}

function web() {
    return gulp.dest('./web/');
}

gulp.task('clean', function (cb) {
    return del(['web/**/*', 'dist/**/*'],
        {force: true},
        cb);
});


gulp.task('js', ['clean'], function () {
    return gulp.src([
        'src/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
        .pipe(concat('loading-pane.js'))
        .pipe(ngAnnotate())
        .pipe(dist());


});

gulp.task('views', ['clean'], function () {
    return gulp.src('src/*.tpl.html')
        .pipe(ngHtml2Js({moduleName: 'loadingPane'}))
        .pipe(concat("loading-pane-views.js"))
        .pipe(dist());
});

gulp.task('bundle', ['js', 'views'], function () {
    return gulp.src([
        'dist/loading-pane.js',
        'dist/loading-pane-views.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('loading-pane.min.js'))
        // Note: ugilfy + sourcemaps is bugged (so you'll need to comment this out as needed).
        .pipe(uglify())
        .pipe(sourcemaps.write(mapsLocation))
        .pipe(dist());
});

gulp.task('sass', ['clean'], function () {

    return gulp.src([
        'src/*.scss'])
        .pipe(sass())
        .pipe(dist())
        .pipe(sourcemaps.init())
        .pipe(pleeease())
        .pipe(concat('loading-pane.min.css'))
        .pipe(sourcemaps.write(mapsLocation))
        .pipe(dist());
});

gulp.task('vendor', ['clean'], function () {

    // Note: Order is important here so don't (do what I did) and change the order...
    var vendor = [
        'bower_components/angular/angular.js'
    ];

    return gulp.src(vendor)
        .pipe(expect(vendor))
        .pipe(sourcemaps.init())
        .pipe(concat("vendor.min.js"))
        // Note: ugilfy + sourcemaps is bugged (so you'll need to comment this out as needed).
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps/'))
        .pipe(web());
});
gulp.task('html', ['bundle', 'vendor', 'sass'], function () {
    return gulp.src('app/index.html')
        .pipe(inject(
            gulp.src([
                'web/vendor.min.js',
                'dist/loading-pane.min.js',
                'dist/loading-pane.min.css'
            ], {read: false}),
            {ignorePath: 'web/', addRootSlash: false, relative: true}
        ))
        .pipe(web())
        .pipe(notify({
            onLast: true,
            message: 'Build complete'
        }));
});


gulp.task('default', ['html'], function () {
    // place code for your default task here
});