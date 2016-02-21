'use strict';

define(['jquery', 'app/ui/templates', 'app/model/endings', 'app/model/words'], function($, templates, endings, words) {

    var sm;
    var entered = false;

    function enter(screenManager) {

        // Try to fix spam bug when you enter ending screen multiple times
        if (!entered) {
            entered = true;
        } else {
            return;
        }


        // Generate an ending
        var ending = endings.getEnding();

        sm = screenManager;
        var $canvas = $('#canvas');
        var $screen = $(templates.getTemplate('gameOverTmpl')({
            type: ending.type,
            title: ending.title,
            description: words.textReplace(ending.description)
        }));
        $canvas.append($screen);

        setTimeout(function() {
            $('.game-over-title', $canvas).animate({opacity: 1}, 3000, 'linear', function onComplete() {
                $('.game-over-description', $canvas).animate({opacity: 1}, 2000, 'linear', function lol() {
                    $('#restart').show();
                });
            });
        }, 1000);

    }

    function exit() {

    }

    return {
        enter: enter,
        exit: exit
    }

});