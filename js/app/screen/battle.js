'use strict';

define(['jquery',
    'jquery-ui',
    'underscore',
    'emitter',
    'app/ui/templates',
    'app/ui/actions',
    'app/ui/news',
    'app/ui/character',
    'app/ui/modal',
    'app/ui/timer'],

function($, ui, _, emitter, templates, actions, news, character, modal, timer) {

    var sm;
    var $header;

    function buildScreen() {

        var $canvas = $('#canvas');

        $header = $(templates.getTemplate('battleHeaderTmpl')());
        $canvas.append($header);

        timer.setup($('.panel-timer'));
        character.setup($('.panel-character-stats'));
        news.setup();
        actions.setup();

        timer.start();
    }

    function enter(screenManager) {
        sm = screenManager;
        buildScreen();
        emitter.on('victory', function() {
            sm.enterScreen('gameover');
        });
        emitter.on('defeat', function() {
            sm.enterScreen('gameover');
        });
    }

    function exit() {
        $('#canvas').html('');
    }

    return {
        enter: enter,
        exit: exit
    }

});