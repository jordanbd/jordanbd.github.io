'use strict';

define(['jquery', 'emitter', 'app/ui/templates', 'app/model/player'], function($, emitter, templates, player) {

    var $timerElement;
    var interval;
    var stopped = false;
    var counter = 0;

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
        emitter.on('player-timer-tick', updateUI);
    }

    function update() {
        //player.secondsRemaining--;
        //player.changeSecondsElapsed(1);
        //if (player.secondsRemaining < 0) {
        //    player.secondsRemaining = 0;
        //}
        counter++;
        emitter.emit('timer-tick');
        if (counter % 5 == 0) {
            emitter.emit('timer-tick5');
        }
        if (counter % 10 == 0) {
            emitter.emit('timer-tick10');
        }
        updateUI();
    }

    function start() {
        if (stopped) {
            return;
        }
        // HACK!!!!!!!!!!!!!!!!!!!!!!
        // Had to add this in after I changed the way the timer worked. The game expects an immediate timer-tick10
        emitter.emit('timer-tick10');
        //// Capture start ticks- ONLY do this for 10 second increment, not 5
        //if (player.secondsRemaining % 10 == 0) {
        //    emitter.emit('timer-tick10');
        //}

        interval = setInterval(update, 1000);
        updateUI();
        //console.log('timer started');
    }

    function pause() {
        if (stopped) {
            return;
        }
        clearInterval(interval);
        //console.log('timer paused');
    }

    function stop() {
        clearInterval(interval);
        stopped = true;
        //console.log('timer stopped');
    }

    return {
        setup: setup,
        start: start,
        pause: pause,
        stop: stop
    }

});