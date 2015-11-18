//= require jquery

// "Sticky" JQuery plugin
// -> make an element "sticky" (fixed position) depending on scroll position
// -> can't get this to work right now -- commenting out and will come back to it later
// -----------------------------------------------------------------------------

;(function($) {
    // set up Bivee namespace
    if (!$.bivee) {
        $.bivee = {};
    };

    $.bivee.sticky = function(el, options) {
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("bivee.sticky", base);

        base.init = function() {
            // base.myFunctionParam = myFunctionParam;

            base.options = $.extend({},
                $.bivee.sticky.defaultOptions, options);

            var $parent = base.$el.parent(),
                parentH = $parent.height,
                windowH = $(window).height,
                elOffset = base.$el.offset().top,
                parentOffsetBottom = $parent.offset().top + parentH; // target element's offset (distance to top)
                // base.activeEl = highlightEl ? $(highlightEl) : false; // an nav element to be highlighted on scroll

            // console.log(base.activeEl);
            base.toggleSticky(base.$el, elOffset);

            $(parent).scroll(function() {
                base.toggleSticky(base.$el, elOffset);

                // highlight the current nav item based on scroll position
                if (base.activeEl) {
                    $(base.activeEl).each(function() {
                        var $target = $($(this).attr("href"));

                        if (base.checkVisible($target)) {
                            $(this).addClass(base.options.activeClass);
                            console.log($(this).attr('href') + " is visible");
                        } else {
                            $(this).removeClass(base.options.activeClass);
                        };
                    });
                }
            });

            // reset the target element's offset when the window resizes
            $(parent).resize(function() {
                base.toggleSticky(base.$el, base.$el.offset().top);
            });
        };

        base.toggleSticky = function($el, elOffset){
            var scrollTop = $(window).scrollTop(),
                scrollBottom = scrollTop + $el.height,
                elOffset = elOffset || 0;

            if (elOffset <= scrollTop) {
                $el.addClass(base.options.displayClass);
                console.log("sticky");
            } else {
                $el.removeClass(base.options.displayClass);
            }

            if (elOffset <= scrollTop) {
                $el.addClass(base.options.displayClass);
                $el.removeClass(base.options.bottomClass);
            } else {
                $el.removeClass(base.options.displayClass);

                // if (scrollBottom) {
                //     $el.addClass(base.options.bottomClass);
                // }
            }
        };

        // http://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
        base.checkVisible = function($el) {

            var viewportMargin = ($(window).height()/base.options.viewportMargin), // Viewport Height
                scrollTop = $(window).scrollTop(), // Scroll Top
                yPos = $el.offset().top,
                elH = $el.outerHeight();

            if (yPos < (viewportMargin + scrollTop) && (yPos > (scrollTop + viewportMargin - elH))) {
                return true;
            }
        }

        // Run initializer
        base.init();
    };

    $.bivee.sticky.defaultOptions = {
        displayClass: "is-sticky",
        activeClass: "is-active",
        activeEl: ".js-active",
        viewportMargin: 4,
        constrainToParent: true,
        parent: false,
    };

    $.fn.bivee_sticky = function(options) {
        return this.each(function() {
            (new $.bivee.sticky(this, options));
        });
    };

})(jQuery);


// jpw.sticky = (function(window, $) {
//     'use strict';

//     var base.options = {
//         displayClass: "is-sticky",
//         activeClass: "is-active",
//         viewportMargin: 4,
//     };

//     function init(el, options) {
//         var options = options || {};
//         // options.constrainToParent =

//         base.$el.each(function() {
//             var $parent = base.$el.parent(),
//                 parentH = $parent.height,
//                 windowH = $(window).height,
//                 elOffset = base.$el.offset().top; // target element's offset (distance to top)
//                 // base.activeEl = highlightEl ? $(highlightEl) : false; // an nav element to be highlighted on scroll

//             // console.log(base.activeEl);
//             _toggleSticky(el, elOffset);

//             $(parent).scroll(function() {
//                 _toggleSticky(el, elOffset);

//                 // highlight the current nav item based on scroll position
//                 // if (base.activeEl) {
//                 //     base.activeEl.each(function() {
//                 //         var $target = $($(this).attr("href"));

//                 //         if (base.checkVisible($target)) {
//                 //             $(this).addClass(base.options.activeClass);
//                 //             // console.log($(this).attr('href') + " is visible");
//                 //         } else {
//                 //             $(this).removeClass(base.options.activeClass);
//                 //         };
//                 //     });
//                 // }
//             });

//             // reset the target element's offset when the window resizes
//             $(parent).resize(function() {
//                 _toggleSticky(el, base.$el.offset().top);
//             });
//         });
//     };

//     function _toggleSticky(el, offset, parent) {
//         var scrollTop = $(window).scrollTop(),
//             scrollBottom = scrollTop + base.$el.height,
//             elOffset = offset || 0;

//         if (elOffset <= scrollTop) {
//             base.$el.addClass(base.options.displayClass);
//             console.log("sticky");
//         } else {
//             base.$el.removeClass(base.options.displayClass);
//         }

//         if (elOffset <= scrollTop) {
//             base.$el.addClass(base.options.displayClass);
//             base.$el.removeClass(base.options.bottomClass);
//         } else {
//             base.$el.removeClass(base.options.displayClass);

//             // if (scrollBottom) {
//             //     base.$el.addClass(base.options.bottomClass);
//             // }
//         }
//     }

//     // http://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
//     function base.checkVisible(el) {

//         var viewportMargin = ($(window).height()/base.options.viewportMargin), // Viewport Height
//             scrollTop = $(window).scrollTop(), // Scroll Top
//             yPos = base.$el.offset().top,
//             elH = base.$el.outerHeight();

//         if (yPos < (viewportMargin + scrollTop) && (yPos > (scrollTop + viewportMargin - elH))) {
//             return true;
//         }
//     }

//     // export public properties/methods
//     return {
//         init: init,
//         base.options: base.options,
//     };
// })(window, jQuery);
