'use strict';

define(['jquery', 'app/util/browser', 'app/screen/home', 'app/screen/battle', 'app/screen/gameover', 'app/screen/selectclass', 'app/screen/tutorial', 'app/ui/modal'],
function($, browser, home, battle, gameover, selectClass, tutorial, modal) {

    var screens = {
        'home': home,
        'selectClass': selectClass,
        'battle': battle,
        'gameover': gameover,
        'tutorial': tutorial
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

    function addOverlay() {
        var $overlay = $('<div/>')
            .attr('id', 'transition-overlay')
            .addClass('ui-widget-overlay');
        $('body').append($overlay);
    }

    function removeOverlay() {
        $('#transition-overlay').remove();
    }

    function enterScreen(name) {
        console.log('entering screen %s', name);

        var $canvas = $('#canvas');
        modal.disable();

        var deferred = $.Deferred();
        deferred.done(function() {
            var screen = screens[name];
            currentScreen = name;

            modal.enable();

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
            addOverlay();
            $canvas.animate({opacity: 0}, 1000, 'linear', function() {
                screens[currentScreen].exit();
                removeOverlay();
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