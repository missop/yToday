
//先加载gulp
var gulp = require('gulp'),

    less = require('gulp-less'),

    cssmin = require('gulp-cssmin'),

    autoprefixer = require('gulp-autoprefixer'),

    rev = require('gulp-rev'),

    rename = require('gulp-rename'),

    imagemin = require('gulp-imagemin'),

    useref = require('gulp-useref'),

    gulpif = require('gulp-if'),

    uglify = require('gulp-uglify'),

    revCollector = require('gulp-rev-collector');

//处理css
gulp.task('css', function () {

    return gulp.src('./public/less/main.less')
        .pipe(less())
        .pipe(cssmin())
        ////为css添加-webkit-、-mz-等前缀
        .pipe(autoprefixer())
        ////添加版本号
        .pipe(rev())
        .pipe(gulp.dest('./release/public/css'))
        ////记录对应关系
        .pipe(rev.manifest())
        ////默认记录文件名称相同，为了不冲突就要重命名
        .pipe(rename('css-manifest.json'))
        .pipe(gulp.dest('./release/rev'));
});

//处理图片
gulp.task('img', function () {

    return gulp.src(['./public/images/**/*','./uploads/*'],{base:'./'})
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('./release'))
        .pipe(rev.manifest())
        .pipe(rename('img-manifest.json'))
        .pipe(gulp.dest('./release/rev'));

});

//处理js
gulp.task('useref', function () {

    return gulp.src('./main.less')
        .pipe(useref())
        //压缩js
        .pipe(gulpif('*.js',uglify()))
        .pipe(gulpif('*.js',rev()))
        .pipe(gulp.dest('./release'))
        .pipe(rev.manifest())
        .pipe(rename('js-manifest.json'))
        .pipe(gulp.dest('./release/rev'));

});

//其他
gulp.task('other', function () {

    return gulp.src(['./api/*', './public/fonts/*', './public/libs/*', './views/*.html'],{base:'./'})
        .pipe(gulp.dest('./release'));

});

//替换
gulp.task('rev',['css','img','useref'], function () {

    gulp.src(['./release/rev/*.json','./release/main.less'])
        .pipe(revCollector())
        .pipe(gulp.dest('./release'));

});

gulp.task('default',['rev','other']);