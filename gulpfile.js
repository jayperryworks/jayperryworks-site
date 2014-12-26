"use strict";
// based on generator-gulp-webapp 0.1.0

var gulp = require("gulp");

// tell me what the error is!
// -> prevent .pipe from dying on error w/ gulp-plumber
// -> and give more useful error messages
var showError = function(err) {
  $.util.beep();
  console.log(err);
};

// useful file paths
var icons = {
    src  : "source/assets/images",
    dest : "source/assets/images"
};

// load plugins
var $ = require("gulp-load-plugins")();
var cheerio = require("cheerio");

gulp.task("default", ["icons"]);

gulp.task("icons", function () {
    return gulp.src(icons.src + "/*.svg")
               .pipe($.svgmin())
               .pipe($.svgstore({
                    fileName: "spritemap.svg",
                    prefix: "",
                    transformSvg: function($svg, done) {
                        // add "display: none" to root svg tag
                        $svg.attr('style', 'display:none');
                        // remove 'fill' attributes from everything
                        $svg.find('[fill]').removeAttr('fill');
                        $svg.find('desc').remove();
                        done(null, $svg);
                    }
               }))
               .pipe(gulp.dest(icons.dest + "/"));
});
