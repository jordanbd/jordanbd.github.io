'use strict';

define(['jquery', 'app/screen/home', 'app/screen/set.name', 'app/screen/battle', 'app/screen/gameover'], function($, home, setName, battle, gameover) {

    var screens = {
        'home': home,
        'setName': setName,
        'battle': battle,
        'gameover': gameover
    };

    var currentScreen = null;

    function start() {
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