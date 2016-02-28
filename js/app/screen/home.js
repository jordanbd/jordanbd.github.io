'use strict';

define(['jquery', 'underscore', 'app/model/statistics'], function($, _, statistics) {

    var sm;

    function buildScreen() {
        var $templateHtml = $('#template-home').html();

        // Compile template
        var renderedTemplate = _.template($templateHtml);

        // Bind start button
        $(document).one('click', '#start', function() {
            sm.enterScreen('selectClass');
        });


        // Add to screen
        $('#canvas').html(renderedTemplate);
    }

    function enter(screenManager) {
        sm = screenManager;
        buildScreen();

    }

    function exit() {
        $('#canvas').html("");
    }

    return {
        enter: enter,
        exit: exit
    }

});