'use strict';

define(['jquery', 'app/util/browser', 'app/screen/home', 'app/screen/battle', 'app/screen/gameover', 'app/screen/selectclass'],
function($, browser, home, battle, gameover, selectClass) {

    var screens = {
        'home': home,
        'selectClass': selectClass,
        'battle': battle,
        'gameover': gameover
    };

    var currentScreen = null;

    function start() {
        if (browser.isMobile()) {
            window.location = 'mobileWarning.html';
        }
        if (!browser.isBrowserSupported()) {
            window.location = 'browserWarning.html';
        }
        enterScreen('home');
    }

    function enterScreen(name) {
        console.log('entering screen %s', name);

        var $canvas = $('#canvas');

        var deferred = $.Deferred();
        deferred.done(function() {
            var screen = screens[name];
            currentScreen = name;

            // lol i don't know how to program
            screen.enter({
                enterScreen: enterScreen
            });
            $canvas.animate({opacity: 1}, 300, 'linear');
        });

        if (currentScreen != null) {
            if (screens[currentScreen].beforeExit) {
                screens[currentScreen].beforeExit();
            }
            $canvas.animate({opacity: 0}, 1000, 'linear', function() {
                screens[currentScreen].exit();
                deferred.resolve();
            });
        } else {
            deferred.resolve();
        }

    }

    return {
        start: start,
        enterScreen: enterScreen
    }

});