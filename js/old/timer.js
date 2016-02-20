'use strict';

define(['jquery', '../lib/emitter', 'app/logger'], function($, emitter, logger) {

    var $canvas = $('#canvas');
    var $clock = $('<div/>')
        .attr('id', 'clock')
        .appendTo($canvas);

    var endTime;
    var interval;

    function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes*60000);
    }

    function getTimeRemaining(endTime){
        var t = Date.parse(endTime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setup(gameLength) {
        var now = new Date();
        endTime = addMinutes(now, gameLength);
        logger.debug('Setting up timer with length of %O minutes. End time is %O', gameLength, endTime);
    }

    function start() {
        interval = setInterval(updateUI, 1000);
    }

    function stop() {
        clearInterval(interval);
    }

    function pause() {

    }

    function updateUI() {
        var remaining = getTimeRemaining(endTime);
        $clock.text('minutes: ' + remaining.minutes + ', seconds: ' + remaining.seconds);
        emitter.emit('timer.tick');
        if (remaining.seconds % 5 == 0) {
            emitter.emit('timer.tick5');
        }
        if (remaining.total <= 0) {
            logger.debug('Timer has ended');
            stop();
            emitter.emit('timer.end');
        }
    }

    return {
        setup: setup,
        start: start
    }

});