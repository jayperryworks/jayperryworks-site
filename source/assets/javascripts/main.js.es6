//= require jquery/dist/jquery.min.js

// namespace for this site's custom code
var jpw = {};

// =============================================================================
// Modules
// =============================================================================

// SVG sprites
// -> Load the inline spritemap via AJAX to take advantage of caching
// -> https://css-tricks.com/ajaxing-svg-sprite/
// -----------------------------------------------------------------------------
jpw.sprites = (function($){
    'use strict';

    var exports = {};

    exports.init = function(file) {
        if (Modernizr.inlinesvg) {
            // if the browser supports inline SVG...
            $.get(file, function(data) {
                // create a div at the very top of the body...
                var div = document.createElement("div");
                // ... and inject the svg definitions
                div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
                document.body.insertBefore(div, document.body.childNodes[0]);

                console.log("yay sprites!");
            });
        }
    }

    return exports;
})(jQuery);

// Sticky module
// -> make an element "sticky" (fixed position) depending on scroll position
// -> can't get this to work right now -- commenting out and will come back to it later
// -----------------------------------------------------------------------------
jpw.sticky = (function($) {
    'use strict';

    var exports = {
        displayClass: "is-sticky",
        currentClass: "is-active",
        viewportMargin: 4,
    };

    exports.init = function(el, highlightEl, parent) {
        var _parent = parent ? parent : window; // the parent container; defaults to the window
        var _parentH = $(_parent).height;
        var _yPosInit = $(el).offset().top; // target element's offset (distance to top)
        var _$highlightEl = highlightEl ? $(highlightEl) : false; // an nav element to be highlighted on scroll

        // console.log(_$highlightEl);
        _toggleSticky(el, _yPosInit);

        $(_parent).scroll(function() {
            _toggleSticky(el, _yPosInit);

            // highlight the current nav item based on scroll position
            if (_$highlightEl) {
                _$highlightEl.each(function() {
                    var _$target = $($(this).attr("href"));

                    if (_checkVisible(_$target)) {
                        $(this).addClass(exports.currentClass);
                        // console.log($(this).attr('href') + " is visible");
                    } else {
                        $(this).removeClass(exports.currentClass);
                    };
                });
            }
        });

        // reset the target element's offset when the window resizes
        $(_parent).resize(function() {
            _toggleSticky(el, $(el).offset().top);
        });
    };

    function _toggleSticky(el, offset) {
        var _scrollPos = $(window).scrollTop(),
            _yPosInit = offset ? offset : 0;

        if (_yPosInit <= _scrollPos) {
            $(el).addClass(exports.displayClass);
            console.log("sticky");
        } else {
            $(el).removeClass(exports.displayClass);
        }
    }

    // http://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
    function _checkVisible(el) {

        var _viewportMargin = ($(window).height()/exports.viewportMargin), // Viewport Height
            _scrollPos = $(window).scrollTop(), // Scroll Top
            _yPos = $(el).offset().top,
            _elH = $(el).outerHeight();

        return ((_yPos < (_viewportMargin + _scrollPos)) && (_yPos > (_scrollPos + _viewportMargin - _elH)));
    }

    return exports;
})(jQuery);


// =============================================================================
// Global/init logic
// -> let's do this
// =============================================================================


jQuery(function($) {

    // make jump navs 'sticky' on scroll
    jpw.sticky.init(".js-sticky", ".js-highlight");
});
