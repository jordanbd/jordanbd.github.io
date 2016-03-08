'use strict';

define([], function() {

    function isMobile() {
        return ( location.search.indexOf( 'ignorebrowser=true' ) < 0 && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( navigator.userAgent ) );
    }

    function isBrowserSupported() {
        return ( location.search.indexOf( 'ignorebrowser=true' ) >= 0 || ( !oldIE ) );
    }

    function isStorageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
        }
    }

    return {
        isMobile: isMobile,
        isBrowserSupported: isBrowserSupported,
        isStorageAvailable: isStorageAvailable
    }
});