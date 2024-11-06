const gulp = require("gulp");
// const babel = require("gulp-babel");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");

gulp.task("js", function (done) {
  gulp
    .src("./*.js")
    // .pipe(babel(
    //  {
    //   "presets": [
    //    [
    //     "@babel/preset-env",
    //     {
    //      "targets": {
    //       "edge": "18",
    //       "firefox": "52",
    //       "chrome": "49",
    //       "safari": "10"
    //      },
    //      "useBuiltIns": "usage",
    //      // "corejs": "3.6.5"
    //     }
    //    ]
    //   ]
    //  }
    // ))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest("dist/js"))
  done();
});

gulp.task("default", gulp.series("js"));
