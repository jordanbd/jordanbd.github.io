'use strict';

define(['jquery', 'app/model/player', 'emitter'], function($, player, emitter) {

    var key = null;
    var apiUrl = 'http://localhost:8080/rpg/';

    function loadKey() {
        console.debug('Loading key');
        $.ajax({
            url: apiUrl + 'key',
            success: function(keyResponse) {
                key = keyResponse;
                console.debug('Loaded key %s', key);
            }
        })
    }

    function saveResults() {
        console.debug('saving results');
        $.ajax({
            type: 'POST',
            url: apiUrl + 'save',
            data: {
                key: key,
                data: JSON.stringify(player)
            }
        });
    }

    loadKey();

    emitter.on('victory', saveResults);
    emitter.on('defeat', saveResults); // fixme dont even use this?

});