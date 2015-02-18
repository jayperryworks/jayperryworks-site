"use strict";

var gulp = require("gulp");

// useful file paths
var icons = {
  src  : "source/assets/images/icons",
  dest : "source/assets/images"
};

var fileName = "spritemap.svg";

// tell me what the error is!
// -> prevent .pipe from dying on error w/ gulp-plumber
// -> and give more useful error messages
var showError = function(err) {
  $.util.beep();
  console.log(err);
};

// load plugins
var $ = require("gulp-load-plugins")();

gulp.task("default", ["icons"]);

gulp.task("icons", function() {
  return gulp.src(icons.src + "/*.svg")
             .pipe($.svgmin())
             .pipe($.svgstore({
                fileName: fileName,
                prefix: ""
             }))
             .pipe($.cheerio(function($) {
                    // add "display: none" to root svg tag
                    $('svg').attr('style', 'display:none');
                    // remove 'fill' & 'stroke' attributes from everything
                    // -> replace in CSS
                    $('svg').find('[fill]').not("[fill='currentColor']").removeAttr('fill');
                    $('svg').find('[stroke]').removeAttr('stroke');
                    $('svg').find('desc').remove();
             }))
             .pipe(gulp.dest(icons.dest + "/"));
});
