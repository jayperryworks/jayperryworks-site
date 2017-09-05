//= require jquery

var jpw = window.jpw || {};

// Sticky module
// -> make an element "sticky" (fixed position) depending on scroll position
// -> can't get this to work right now -- commenting out and will come back to it later
// -----------------------------------------------------------------------------
jpw.sticky = (function(window, $) {
    'use strict';

    var settings = {
        displayClass: "is-sticky",
        currentClass: "is-active",
        viewportMargin: 4,
    };

    function init(el, options) {
        var options = options || {};
        // options.constrainToParent =

        $(el).each(function() {
            var $parent = $(el).parent(),
                parentH = $parent.height,
                windowH = $(window).height,
                elOffset = $(el).offset().top; // target element's offset (distance to top)
                // $highlight = highlightEl ? $(highlightEl) : false; // an nav element to be highlighted on scroll

            // console.log($highlight);
            _toggleSticky(el, elOffset);

            $(parent).scroll(function() {
                _toggleSticky(el, elOffset);

                // highlight the current nav item based on scroll position
                // if ($highlight) {
                //     $highlight.each(function() {
                //         var _$target = $($(this).attr("href"));

                //         if (_checkVisible(_$target)) {
                //             $(this).addClass(settings.currentClass);
                //             // console.log($(this).attr('href') + " is visible");
                //         } else {
                //             $(this).removeClass(settings.currentClass);
                //         };
                //     });
                // }
            });

            // reset the target element's offset when the window resizes
            $(parent).resize(function() {
                _toggleSticky(el, $(el).offset().top);
            });
        });
    };

    function _toggleSticky(el, offset, parent) {
        var scrollTop = $(window).scrollTop(),
            scrollBottom = scrollTop + $(el).height,
            elOffset = offset || 0;

        if (elOffset <= scrollTop) {
            $(el).addClass(settings.displayClass);
            console.log("sticky");
        } else {
            $(el).removeClass(settings.displayClass);
        }

        if (elOffset <= scrollTop) {
            $(el).addClass(settings.displayClass);
            $(el).removeClass(settings.bottomClass);
        } else {
            $(el).removeClass(settings.displayClass);

            // if (scrollBottom) {
            //     $(el).addClass(settings.bottomClass);
            // }
        }
    }

    // http://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
    function _checkVisible(el) {

        var _viewportMargin = ($(window).height()/settings.viewportMargin), // Viewport Height
            scrollTop = $(window).scrollTop(), // Scroll Top
            _yPos = $(el).offset().top,
            _elH = $(el).outerHeight();

        if (_yPos < (_viewportMargin + scrollTop) && (_yPos > (scrollTop + _viewportMargin - _elH))) {
            return true;
        }
    }

    // export public properties/methods
    return {
        init: init,
        settings: settings,
    };
})(window, jQuery);
