'use strict';

define(['jquery', 'app/ui/templates', 'app/model/events', 'app/util/random', 'emitter', 'app/model/words'], function($, templates, events, random, emitter, words) {

    var $ele;
    var $eleText;

    function showNewTickerItem() {
        var event = events.getNextEvent();
        if (event == null) {
            return;
        }
        if (event.apply) {
            event.apply();
        }
        $eleText.html('');

        var flavourText = random.randomArray(event.flavourText);
        var text = null;
        if (typeof flavourText === 'string') {
            text = flavourText;
        } else {
            text = flavourText.user + ' posts on ' + (event.type == 'reddit' ? 'Reddit' : 'Twitter') + ', ' +
                    '"' + flavourText.text + '".'
        }

        var $event = $('<div/>')
            .css('opacity', 0)
            .html(words.textReplace(text))
            .appendTo($eleText);

        $event.animate({opacity: 1}, 1000, 'linear', function() {
            setTimeout(function() {
                $event.animate({opacity: 0}, 1000, 'linear', function() {
                    $event.remove();
                });
            }, 5000);
        });


    }


    function setup() {
        $ele = $(templates.getTemplate('newsTmpl')({

        }));

        $ele.appendTo($('#canvas'));
        $eleText = $('.panel-news', $ele);

        emitter.on('timer-tick10', showNewTickerItem);
    }



    return {
        setup: setup
    }

});