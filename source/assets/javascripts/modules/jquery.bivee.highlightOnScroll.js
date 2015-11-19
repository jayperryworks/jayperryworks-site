//= require jquery

// "Highlight on Scroll" JQuery plugin
// -> make an element "active" (highlighted) when you scroll past a target
// -----------------------------------------------------------------------------

;(function($) {
    // set up Bivee namespace if it doesn't already exist
    if (!$.bivee) {
        $.bivee = {};
    };

    $.bivee.highlightOnScroll = function(el, target, options) {
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("bivee.highlightOnScroll", base);

        // The target of the highlighted item
        base.target = target;
        base.$target = $(target);

        base.init = function() {

            base.options = $.extend({},
                $.bivee.sticky.defaultOptions, options);

            var $parent = base.options.parent != false ? $(base.options.parent) : $(window);

            $parent.scroll(function() {
                base.toggleActive();
            });

            $(window).resize(function() {
                base.toggleActive();
            });
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
        };

        base.toggleActive = function() {
            if (base.checkVisible(base.$target)) {
                base.$el.addClass(base.options.activeClass);
            } else {
                base.$el.removeClass(base.options.activeClass);
            };
        }

        // Run initializer
        base.init();
    };

    $.bivee.highlightOnScroll.defaultOptions = {
        activeClass: "is-active",
        viewportMargin: 4,
        parent: false,
    };

    $.fn.bivee_highlightOnScroll = function(target, options) {
        return this.each(function() {
            (new $.bivee.highlightOnScroll(this, target, options));
        });
    };

})(jQuery);




// highlight the current nav item based on scroll position
// if (base.activeEl) {
//     $(base.activeEl).each(function() {
//         var $target = $($(this).attr("href"));

//         if (base.checkVisible($target)) {
//             $(this).addClass(base.options.activeClass);
//             console.log($(this).attr('href') + " is visible");
//         } else {
//             $(this).removeClass(base.options.activeClass);
//         };
//     });
// }
