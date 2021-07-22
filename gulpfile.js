let project_folder = require("path").basename(__dirname);
let source_folder = "src";
let fs = require('fs');

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
        json: project_folder + "/json/"
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/sass/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf",
        json: source_folder + "/json/*.json"
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/sass/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,ico,webp}",
        json: source_folder + "/json/*.json"
    },
    clean: "./" + project_folder + "/",
};

let { src, dest } = require('gulp');
let gulp = require('gulp');
let browser_sync = require('browser-sync').create();
let file_include = require('gulp-file-include');
let del = require('del');
let sass = require('gulp-sass');
let gulp_autoprefixer = require('gulp-autoprefixer');
let clean_css = require('gulp-clean-css');
let rename = require('gulp-rename');
let media_queries = require('gulp-group-css-media-queries');
let uglify = require('gulp-uglify-es').default;
let imagemin = require('gulp-imagemin');
let webp = require('gulp-webp');
let webp_html = require('gulp-webp-html');
let webpcss = require("gulp-webpcss");
let ttf2woff = require('gulp-ttf2woff');
let ttf2woff2 = require('gulp-ttf2woff2');
let fonter = require('gulp-fonter');

function browserSync(params) {
    browser_sync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    });
}

function html() {
    return src(path.src.html)
        .pipe(file_include())
        .pipe(webp_html())
        .pipe(dest(path.build.html))
        .pipe(browser_sync.stream());
}

function css() {
    return src(path.src.css)
        .pipe(
            sass({
                outputStyle: "expanded"
            })
        )
        .pipe(media_queries())
        .pipe(
            gulp_autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(
            webpcss({
                webpClass: '.webp', noWebpClass: '.no-webp'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browser_sync.stream());
}

function js() {
    return src(path.src.js, { allowEmpty: true })
        .pipe(file_include())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browser_sync.stream());
}

function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 3,
                svgoPlugins: [{ removeViewBox: false }]
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browser_sync.stream());
}

function fonts(params) {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}

function json(){
    return src(path.src.json)
        .pipe(dest(path.build.json));
}

gulp.task('otf2ttf', function () {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'));
});

function fontsStyle(params) {
    let file_content = fs.readFileSync(source_folder + '/sass/base/_fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/sass/base/_fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/sass/base/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() { }

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.json], json);
}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts, json), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.json = json;
exports.build = build;
exports.watch = watch;
exports.default = watch;



