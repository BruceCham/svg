var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
var iconSrc = 'app/svg/',
    iconDir = 'app/style/';
gulp.task('iconfont', function() {
    return gulp.src([iconSrc + '**/*.svg'])
        .pipe(plugins.iconfontCss({
            normalize: true,
            fontName: 'myfont',
            path: iconSrc + 'svg.less',
            targetPath: './svg.css',
            fontPath: './',
            cssClass: "icon"
        }))
        .pipe(plugins.iconfont({
            fontName: 'myfont'
        }))
        .on('glyphs', function(glyphs, options) {
            gulp.src(iconSrc + 'svghtml.html')
                .pipe(plugins.template({
                    fontName: 'myfont',
                    fontPath: './',
                    cssClass: "icon",
                    glyphs: glyphs
                }))
                .pipe( gulp.dest(iconDir) )
        })
        .pipe(gulp.dest(iconDir));
});
