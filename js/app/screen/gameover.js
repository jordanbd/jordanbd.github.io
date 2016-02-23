'use strict';

define(['jquery', 'app/ui/templates', 'app/model/endings', 'app/model/words'], function($, templates, endings, words) {

    var sm;
    var entered = false;

    function nextEnding(ending) {
        var $canvas = $('#canvas');
        $canvas.animate({opacity: 0}, 1000, 'linear', function() {
            $canvas.html('');
            showEnding(ending);
            $canvas.animate({opacity: 1}, 300, 'linear');
        });
    }

    function showEnding(ending) {
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
                    if (ending.nextEnding) {
                        var $continue = $('#continue');
                        $continue.show();

                        var click = function (ending) {
                            nextEnding(ending);
                        }.bind(this, ending.nextEnding);
                        $continue.click(click);
                    } else {
                        $('#restart').show();
                    }
                });
            });
        }, 1000);
    }

    function enter(screenManager) {

        sm = screenManager;

        // Try to fix spam bug when you enter ending screen multiple times
        if (!entered) {
            entered = true;
        } else {
            return;
        }


        // Generate an ending
        var ending = endings.getEnding();
        showEnding(ending);
    }

    function exit() {

    }

    return {
        enter: enter,
        exit: exit
    }

});