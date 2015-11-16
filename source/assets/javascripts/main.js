//= require jquery

// =============================================================================
// Modules
// =============================================================================

// require modules/jpw.stickyNav.js
//= require modules/jquery.bivee.sticky.js

var jpw = window.jpw || {};

// =============================================================================
// Global/init logic
// -> let's do this
// =============================================================================

jQuery(function($) {

    // make jump navs 'sticky' on scroll
    // jpw.sticky.init(".js-sticky");
    $(".js-sticky").bivee_sticky();
    $(".js-sticky").bivee_sticky({

    });
});
