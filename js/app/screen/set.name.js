'use strict';

define(['jquery', 'underscore'], function($, _) {

    function enter() {
        console.debug('hi');
    }

    function exit() {
        // screenmanager.show('battle');
    }

    return {
        enter: enter,
        exit: exit
    }

});