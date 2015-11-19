//= require jquery

// "Sticky" JQuery plugin
// -> make an element "sticky" (fixed position) depending on scroll position
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

            var $parent = base.options.parent != false ? $(base.options.parent) : base.$el.parent(),
                parentH = $parent.height,
                windowH = $(window).height,
                elOffset = base.$el.offset().top,
                parentOffsetBottom = $parent.offset().top + parentH,
                $scrollEl = $(base.options.scrollEl);


            // console.log(base.activeEl);
            base.toggleSticky(base.$el, elOffset);

            $scrollEl.scroll(function() {
                base.toggleSticky(base.$el, elOffset);
            });

            // reset the target element's offset when the window resizes
            $scrollEl.resize(function() {
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
        scrollEl: window,
    };

    $.fn.bivee_sticky = function(options) {
        return this.each(function() {
            (new $.bivee.sticky(this, options));
        });
    };

})(jQuery);
