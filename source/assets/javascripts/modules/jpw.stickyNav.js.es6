// Sticky module
// -> make an element "sticky" (fixed position) depending on scroll position
// -> can't get this to work right now -- commenting out and will come back to it later
// -----------------------------------------------------------------------------

var stickyNav = {
    settings: {
        displayClass: "is-sticky",
        currentClass: "is-active",
        viewportMargin: 4,
    },


};

function sticky(el, highlightEl, parent) {
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
                    $(this).addClass(settings.currentClass);
                    // console.log($(this).attr('href') + " is visible");
                } else {
                    $(this).removeClass(settings.currentClass);
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
        $(el).addClass(settings.displayClass);
        console.log("sticky");
    } else {
        $(el).removeClass(settings.displayClass);
    }
}

// http://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
function _checkVisible(el) {

    var _viewportMargin = ($(window).height()/settings.viewportMargin), // Viewport Height
        _scrollPos = $(window).scrollTop(), // Scroll Top
        _yPos = $(el).offset().top,
        _elH = $(el).outerHeight();

    return ((_yPos < (_viewportMargin + _scrollPos)) && (_yPos > (_scrollPos + _viewportMargin - _elH)));
}

export { settings, sticky };
