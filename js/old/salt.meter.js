'use strict';

define(['jquery', '../lib/emitter', 'app/player'], function($, emitter, player) {
    var $canvas = $('#canvas');
    var $meter;

    function increaseSaltiness() {
        player.salt += 1;
        updateSaltMeterUI();

        if (player.salt >= 100) {
            emitter.emit('salt.max.reached');
            emitter.off('timer.tick', increaseSaltiness);
        }
    }

    function updateSaltMeterUI() {
        var $bar = $('#salt-meter-inner');
        $bar.css('width', player.salt + '%');
    }

    function setup() {

        // Player starting salt level has been initialised elsewhere

        $meter = $('<div/>')
            .attr('id', 'salt-meter')
            .css('border', '1px solid black')
            .css('width', '100px')
            .css('height', '25px')
            .appendTo($canvas);

        $('<div/>')
            .attr('id', 'salt-meter-inner')
            .css('height', '100%')
            .css('background-color', 'blue')
            .appendTo($meter);

        // Set starting value
        updateSaltMeterUI();

        emitter.on('timer.tick', increaseSaltiness);
    }

    return {
        setup: setup
    }

});