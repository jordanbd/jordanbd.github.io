'use strict';

define([], function() {

    function isMobile() {
        return ( location.search.indexOf( 'ignorebrowser=true' ) < 0 && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( navigator.userAgent ) );
    }

    function isBrowserSupported() {
        return ( location.search.indexOf( 'ignorebrowser=true' ) >= 0 || ( !oldIE ) );
    }

    return {
        isMobile: isMobile,
        isBrowserSupported: isBrowserSupported
    }
});