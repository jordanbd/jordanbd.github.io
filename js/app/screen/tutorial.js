'use strict';

define(['jquery', 'app/ui/templates', 'app/util/browser'], function($, templates, browser) {

    var sm;
    var $canvas;

    function tutorialOK() {
        if (browser.isStorageAvailable('localStorage')) {
            window.localStorage.setItem('tutorial-done', true);
        }

        sm.enterScreen('selectClass');
    }

    function enter(screenManager) {
        sm = screenManager;
        $canvas = $('#canvas');
        var $screen = templates.getTemplate('tutorialTmpl')({});

        $(document).one('click', '#tutorial-ok', function() {
            tutorialOK();
        });

        $canvas.append($screen);

    }

    function exit() {
        $('#canvas').html('');
    }

    return {
        enter: enter,
        exit: exit
    }

});