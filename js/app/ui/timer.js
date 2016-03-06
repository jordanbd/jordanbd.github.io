'use strict';

define(['jquery', 'emitter', 'app/ui/templates', 'app/model/player'], function($, emitter, templates, player) {

    var $timerElement;
    var interval;
    var stopped = false;
    var pauseBlinkInterval = null;

    function str_pad_left(string,pad,length) {
        return (new Array(length+1).join(pad)+string).slice(-length);
    }

    function createUI($parent) {
        $timerElement = $(templates.getTemplate('timerTmpl')({
        }));
        $parent.append($timerElement);
    }

    function updateUI() {


        var minutes = Math.floor(player.secondsRemaining / 60);
        var seconds = player.secondsRemaining - minutes * 60;
        var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);

        $('.clock', $timerElement).text(finalTime);
    }

    function setup($parent) {
        createUI($parent);
    }

    function update() {
        player.secondsRemaining--;
        player.changeSecondsElapsed(1);
        if (player.secondsRemaining < 0) {
            player.secondsRemaining = 0;
        }
        emitter.emit('timer-tick');
        if (player.secondsRemaining % 5 == 0) {
            emitter.emit('timer-tick5');
        }
        if (player.secondsRemaining % 10 == 0) {
            emitter.emit('timer-tick10');
        }
        updateUI();

        if (player.secondsRemaining == 0) {
            stop();
            emitter.emit('defeat');
        }
    }

    function start() {
        if (stopped) {
            return;
        }
        // Capture start ticks- ONLY do this for 10 second increment, not 5
        if (player.secondsRemaining % 10 == 0) {
            emitter.emit('timer-tick10');
        }

        if (pauseBlinkInterval != null) {
            clearInterval(pauseBlinkInterval);
        }
        interval = setInterval(update, 1000);
        updateUI();
        console.log('timer started');
    }

    function blink() {
        var pauseText = 'paused';
        var $clock = $('.clock', $timerElement);
        if ($clock.text() == pauseText) {
            updateUI(); // back to digital display
        } else {
            $clock.text(pauseText);
        }
    }

    function pause() {
        if (stopped) {
            return;
        }
        clearInterval(interval);
        pauseBlinkInterval = setInterval(blink, 1000);
        console.log('timer paused');
    }

    function stop() {
        clearInterval(interval);
        stopped = true;
        console.log('timer stopped');
    }

    return {
        setup: setup,
        start: start,
        pause: pause,
        stop: stop
    }

});