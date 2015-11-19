//= require jquery
//= require jquery.scrollTo/jquery.scrollTo.min.js

// =============================================================================
// Modules
// =============================================================================

//= require modules/jquery.bivee.sticky.js
//= require modules/jquery.bivee.highlightOnScroll.js

// =============================================================================
// Global/init logic
// -> let's do this
// =============================================================================

var jpw = window.jpw || {};

jQuery(function($) {

    // make jump navs 'sticky' on scroll
    $(".js-sticky").bivee_sticky();

    $(".js-active").bivee_highlightOnScroll($(".js-active").attr("href"));

    // scroll to a target when you click a link in the jump nav
    $(".js-scroll").click(function() {
        var target = $(this).attr("href");
        $(window).scrollTo(target, 400, {
                axis:'y',
                offset: { top: -16 },
            });
    });
});
