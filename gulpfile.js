/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');

//Include Plugins
var del = require('del');
var jshint = require('gulp-jshint');
var useref = require('gulp-useref');
var lazypipe = require('lazypipe');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nano = require('gulp-cssnano');
var runSequence = require('gulp-run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var notify = require('gulp-notify');//提示信息
var gulpNgConfig = require('gulp-ng-config');//提示信息
var browserSync = require('browser-sync').create();
var cache = require('gulp-cached');
var reload = browserSync.reload;

var jsFilePath = [
  'app/scripts/*.js',
  'app/scripts/*/*.js',
  'app/app.js',
  'app/pages/**/*.js',
  'app/pages/**/**/*.js',
  'app/pages/**/**/**/*.js'];

var htmlFilePath = [
  'app/pages/**/*.html',
  'app/pages/**/**/*.html',
  'app/pages/**/**/**/*.html',
  'app/pages/**/**/**/**/*.html'];

var libDevFilePath = [
  'app/lib/**/*.*',
  'app/lib/**/**/*.*',
  'app/lib/**/**/**/*.*'];

var libPublishFilePath = [
  'app/lib/**/css/ionic.min.css',
  // 'app/lib/**/dist/csshake.css',
  'app/lib/**/fonts/*.*',
  'app/lib/**/js/ionic.bundle.min.js',
  'app/lib/**/rollups/md5.js',
  'app/lib/**/rollups/aes.js',
  'app/lib/**/components/mode-ecb.js',
  'app/lib/**/dist/jquery.min.js',
  'app/lib/**/dist/ng-cordova.js',
  'app/lib/**/ionic-img-cache.min.js',
  // 'app/lib/**/SweetAlert.js',
  'app/lib/**/dist/sweetalert.min.js',
  'app/lib/**/themes/google/google.css',
  'app/lib/**/dist/sweetalert.css',
  'app/lib/**/ngSweetAlert.js',
  'app/lib/**/imgcache.js'];

var imgFilePath = [
  'app/img/**/*.png',
  'app/img/**/**/*.*',
  'app/img/**/**/**/*.png',
  'app/img/*.gif'];

var configDEVPath = [
  'publish/TEST/config.xml'];

var configUATPath = [
  'publish/UAT/config.xml'];

var configPRODPath = [
  'publish/PROD/config.xml'];


var pluginDEVPath = [
  'publish/TEST/plugins/*.*',
  'publish/TEST/plugins/**/*.*',
  'publish/TEST/plugins/**/**/*.*',
  'publish/TEST/plugins/**/**/**/*.*',
  'publish/TEST/plugins/**/**/**/**/*.*',
  'publish/TEST/plugins/**/**/**/**/**/*.*'];
var pluginPRODPath = [
  'publish/PROD/plugins/*.*',
  'publish/PROD/plugins/**/*.*',
  'publish/PROD/plugins/**/**/*.*',
  'publish/PROD/plugins/**/**/**/*.*',
  'publish/PROD/plugins/**/**/**/**/*.*',
  'publish/PROD/plugins/**/**/**/**/**/*.*'];

//清除自动生成的目录文件
gulp.task('clean', function () {
  return gulp.src(['www/build/*','app/scripts/baseConfig.js', 'config.xml'
    /*,'plugins/com.handmobile.cordovaplugin.hotpatch/*', 'plugins/hand-im-plugin-device/*'*/]).pipe(clean());
});

gulp.task('clean-code', function () {
  return gulp.src(['www/build/css/*','www/build/img/*','www/build/pages/*','www/build/app.bundle.js']).pipe(clean());
});

gulp.task('clean-bundle-js', function () {
  return gulp.src(['www/build/app.bundle.js']).pipe(clean());
});





//语法检查
gulp.task('lint', function () {
  return gulp.src(jsFilePath)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//复制页面到运行目录
gulp.task('pagesHtml', function () {
  return gulp.src(htmlFilePath)
    .pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    .pipe(sourcemaps.write('.'))
    .pipe(cache('pagesHtml'))
    .pipe(gulp.dest('www/build/pages'))
    .pipe(reload({stream:true}));

});

//
gulp.task('rootHtml', function () {
  return gulp.src('src/*.html')
    .pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www'));
});

//新建复制页面任务
gulp.task('html', [/*'rootHtml',*/ 'pagesHtml']);

//复制开发环境的依赖库文件
gulp.task('copy-dev-libs', function () {
  return gulp.src(libDevFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/lib'));
});

//复制发布环境的依赖库文件
gulp.task('copy-publish-libs', function () {
  return gulp.src(libPublishFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/lib'));
});

//复制图片文件
gulp.task('copy-img', function () {
  return gulp.src(imgFilePath)
    .pipe(gulp.dest('www/build/img'));
});

//复制开发环境 config.xml
gulp.task('copy-dev-config', function () {
  return gulp.src(configDEVPath)
    .pipe(gulp.dest(''));
});

//复制测试环境 config.xml
gulp.task('copy-uat-config', function () {
  return gulp.src(configUATPath)
    .pipe(gulp.dest(''));
});

//复制发布环境 config.xml
gulp.task('copy-prod-config', function () {
  return gulp.src(configPRODPath)
    .pipe(gulp.dest(''));
});


/*
 gulp.task('copy-dev-plugin', function () {
 return gulp.src(pluginDEVPath)
 .pipe(gulp.dest('plugins'));
 });
 gulp.task('copy-prod-plugin', function () {
 return gulp.src(pluginPRODPath)
 .pipe(gulp.dest('plugins'));
 });
 */
//定义开发环境的依赖库文件任务
gulp.task('copy-dev-lib', function (callback) {
  runSequence('copy-dev-libs', 'copy-img', callback);
});

//定义发布环境的依赖库文件任务
gulp.task('copy-publish-lib', function (callback) {
  runSequence('copy-publish-libs', 'copy-img', callback);
});

//合并压缩css文件
gulp.task('sass', function () {
  return gulp.src(['app/theme/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('www/build/css'))
    // .pipe(notify({ message: 'Styles task complete' }))
    .pipe(reload({stream:true}));
});


//生成开发环境环境配置文件
gulp.task('config-dev', function () {
  gulp.src('app/config/devConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

//生成测试环境环境配置文件
gulp.task('config-uat', function () {
  gulp.src('app/config/uatConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

//生成发布环境环境配置文件
gulp.task('config-prod', function () {
  gulp.src('app/config/prodConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});



//生成iOS发布环境环境配置文件
gulp.task('config-prod', function () {
  gulp.src('app/config/prodConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});



//压缩css
gulp.task('css', function () {
  return gulp.src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('www/css'))  // write source file for debug
    .pipe(nano({reduceIdents: false}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '.'}))
    .pipe(gulp.dest('www/css'));
});

//合并压缩丑化Js
gulp.task('scripts', function () {
  return gulp.src(jsFilePath)
    .pipe(concat('app.bundle.js'))
    // .pipe(notify({ message: 'Js task complete' }))
    .pipe(gulp.dest('www/build'))
    .pipe(browserSync.stream());
  // write source file for debug
  //.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
  //.pipe(uglify())    //压缩
  //.pipe(gulp.dest('www/build'));  //输出
});

//浏览器重载
gulp.task('js-watch',['scripts'],browserSync.reload);
//
gulp.task('copy-prod', function () {
  return gulp.src([
    'src/**/*',
    '!src/index.html',
    '!src/**/*.ts',
    '!src/**/*.less',
    '!src/**/*.sass',
    '!src/**/*.styl',
    '!src/css/*',
    '!src/**/*.md',
    '!src/scripts/*'])
    .pipe(gulp.dest('www'));
});

//自动观察代码变化
gulp.task('watch', function () {
  gulp.watch(['app/**/*'], ["run-dev"]);
  console.log("----watch file change -----");
});

//手动更新www/build代码
gulp.task('rebuild', function (callback) {
  runSequence('clean-code', ['copy-img', 'sass', 'scripts', 'html'], callback);
});

//生成开发环境代码目录
gulp.task('run-dev', function (callback) {
  runSequence('clean', 'config-dev', /*'lint',*/ 'copy-dev-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

//生成测试环境代码目录
gulp.task('run-uat', function (callback) {
  runSequence('clean', 'config-uat', /*'lint',*/ 'copy-uat-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

//生成发布环境代码目录
gulp.task('run-prod', function (callback) {
  runSequence('clean', 'config-prod', /*'lint',*/ 'copy-prod-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

//生成发布环境代码目录
gulp.task('run-ios-prod', function (callback) {
  runSequence('clean', 'config-ios-appStore-prod', /*'lint',*/ 'copy-ios-appStore-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

gulp.task('serve', ['sass', 'scripts'], function() {
  browserSync.init({
    server: "./www"
  });

  gulp.watch("app/pages/**/*.scss", ['sass']);
  gulp.watch(htmlFilePath,['pagesHtml']);
  // gulp.watch(htmlFilePath).on('change', browserSync.reload);
  gulp.watch(jsFilePath, ['scripts']);


});
//默认任务
// gulp.task('default', ['run-dev']);
