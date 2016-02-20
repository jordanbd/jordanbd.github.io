'use strict';

define([
    '../lib/emitter',
    'app/events',
    'app/logger',
    'app/player',
    'app/timer',
    'app/salt.meter',
    'app/actions'],

function(emitter, events, logger, player, timer, saltMeter, actions) {

    function playNextEvent() {
        var event = events.getNextEvent();
        if (event != null) {
            logger.debug('Event received: %O', event);

            if (event.onRun) event.onRun();
            logger.logEvent(event);
        }
    }

    function start() {

        actions.setup();

        //saltMeter.setup();
        //
        //timer.setup(5);
        //timer.start();
        //
        //emitter.on('timer.tick5', playNextEvent);
    }

    function testReddit() {
        logger.logEvent(events.getEvent(1));
        logger.logEvent(events.getEvent(3));
        logger.logEvent(events.getEvent(3));
    }

    return {
        start: start,
        playNextEvent: playNextEvent,
        testReddit: testReddit
    }

});