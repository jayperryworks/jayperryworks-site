//= require jquery
//= require jquery.scrollTo/jquery.scrollTo.min.js

// =============================================================================
// Modules
// =============================================================================

//= require modules/jquery.bivee.sticky.js

var jpw = window.jpw || {};

// =============================================================================
// Global/init logic
// -> let's do this
// =============================================================================

jQuery(function($) {

    // make jump navs 'sticky' on scroll
    $(".js-sticky").bivee_sticky();

    // scroll to a target when you click a link in the jump nav
    $(".js-scroll").click(function() {
        var target = $(this).attr("href");
        $(window).scrollTo(target, 400, {
                axis:'y',
                offset: { top: -16 },
            });
    });
});
