const projectFolder = "dist";

const sourceFolder = "src";
const fs = require("fs");

const path = {
  build: {
    html: `${projectFolder}/`,
    css: `${projectFolder}/css/`,
    js: `${projectFolder}/js/`,
    img: `${projectFolder}/img/`,
    fonts: `${projectFolder}/fonts/`,
    json: `${projectFolder}/json/`,
    video: `${projectFolder}/videos/`,
    gif: `${projectFolder}/img/`,
  },
  src: {
    html: [`${sourceFolder}/*.html`, `!${sourceFolder}/_*.html`],
    css: `${sourceFolder}/sass/style.scss`,
    js: `${sourceFolder}/js/script.js`,
    img: `${sourceFolder}/img/**/*.{jpg,png,svg,ico,webp}`,
    fonts: `${sourceFolder}/fonts/*.ttf`,
    json: `${sourceFolder}/json/*.json`,
    video: `${sourceFolder}/videos/*.{mp4,webm}`,
    gif: `${sourceFolder}/img/**/*.gif`,
  },
  watch: {
    html: `${sourceFolder}/**/*.html`,
    css: `${sourceFolder}/sass/**/*.scss`,
    js: `${sourceFolder}/js/**/*.js`,
    img: `${sourceFolder}/img/**/*.{jpg,png,svg,ico,webp}`,
    json: `${sourceFolder}/json/*.json`,
    video: `${sourceFolder}/videos/*.{mp4,webm}`,
    gif: `${sourceFolder}/img/**/*.gif`,
  },
  clean: `./${projectFolder}/`,
};

const { src, dest } = require("gulp");
const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const fileInclude = require("gulp-file-include");
const del = require("del");
const sass = require("gulp-sass");
const gulpAutoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const mediaQueries = require("gulp-group-css-media-queries");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const webpHtml = require("gulp-webp-html");
const webpcss = require("gulp-webpcss");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const fonter = require("gulp-fonter");
const babelify = require("babelify");
const browserify = require("gulp-browserify");
const ghPages = require("gulp-gh-pages");

function browserSyncFunc() {
  browserSync.init({
    server: {
      baseDir: `./${projectFolder}/`,
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileInclude())
    .pipe(webpHtml())
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(
      sass({
        outputStyle: "expanded",
      }),
    )
    .pipe(mediaQueries())
    .pipe(
      gulpAutoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      }),
    )
    .pipe(
      webpcss({
        webpClass: ".webp", noWebpClass: ".no-webp",
      }),
    )
    .pipe(dest(path.build.css))
    .pipe(cleanCss())
    .pipe(
      rename({
        extname: ".min.css",
      }),
    )
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
}

function js() {
  return src(path.src.js, { allowEmpty: true })
    .pipe(fileInclude())
    .pipe(browserify(
      {
        transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
      },
    ))
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      }),
    )
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70,
      }),
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 3,
        svgoPlugins: [{ removeViewBox: false }],
      }),
    )
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream());
}

function fonts() {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
}

function json() {
  return src(path.src.json)
    .pipe(dest(path.build.json));
}

function video() {
  return src(path.src.video)
    .pipe(dest(path.build.video));
}

function gif() {
  return src(path.src.gif)
    .pipe(dest(path.build.gif));
}

gulp.task("otf2ttf", () => src([`${sourceFolder}/fonts/*.otf`])
  .pipe(fonter({
    formats: ["ttf"],
  }))
  .pipe(dest(`${sourceFolder}/fonts/`)));

function cb() { }

// eslint-disable-next-line consistent-return
function fontsStyle() {
  const fileContent = fs.readFileSync(`${sourceFolder}/sass/base/_fonts.scss`);
  if (fileContent === "") {
    fs.writeFile(`${sourceFolder}/sass/base/_fonts.scss`, "", cb);
    return fs.readdir(path.build.fonts, (err, items) => {
      if (items) {
        let cFontname;
        for (let i = 0; i < items.length; i += 1) {
          const fontname = items[i].split(".");
          // eslint-disable-next-line prefer-destructuring
          cFontname = fontname[0];
          if (cFontname !== fontname) {
            fs.appendFile(`${sourceFolder}/sass/base/_fonts.scss`, `@include font("${fontname}", "${fontname}", "400", "normal");\r\n`, cb);
          }
          cFontname = fontname;
        }
      }
    });
  }
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
  gulp.watch([path.watch.json], json);
}

function clean() {
  return del(path.clean);
}

gulp.task("deploy", () => gulp.src("./dist/**/*").pipe(ghPages({
  remoteUrl: "https://github.com/Deliora90/risingstar.git",
  branch: "gp-pages",
})));

const build = gulp.series(clean,
  gulp.parallel(js, css, html, images, fonts, json, video, gif),
  fontsStyle);
const watch = gulp.parallel(build, watchFiles, browserSyncFunc);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.json = json;
exports.json = video;
exports.gif = gif;
exports.build = build;
exports.watch = watch;
exports.default = watch;
