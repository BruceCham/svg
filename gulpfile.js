var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
var iconSrc = 'app/svg/',
    iconDir = 'app/style/';
var runTimestamp = Math.round(Date.now()/1000);
gulp.task('default', function() {
    return gulp.src([iconSrc + '**/*.svg'])
        .pipe(plugins.iconfontCss({
            normalize: true,
            fontName: 'myfont',
            path: iconSrc + 'svg.css',
            targetPath: './svg.css',
            fontPath: './',
            cssClass: "icon"
        }))
        .pipe(plugins.iconfont({
            fontName: 'myfont',
            prependUnicode: true,
            formats: ['ttf', 'eot', 'woff', 'woff2'],
            timestamp: runTimestamp
        }))
        .on('glyphs', function(glyphs, options) {
            gulp.src(iconSrc + 'svghtml.html')
                .pipe(plugins.template({
                    fontName: 'myfont',
                    fontPath: './',
                    cssClass: "icon",
                    glyphs: glyphs
                }))
                .pipe(plugins.rename('index.html'))
                .pipe( gulp.dest(iconDir) )
        })
        .pipe(gulp.dest(iconDir));
});
