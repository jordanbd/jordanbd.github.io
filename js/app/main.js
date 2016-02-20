'use strict';

define(['app/screen/manager', 'app/ui/templates'], function(screenManager, templates) {

    $(function() {
        templates.compile();
        screenManager.start();
    });

});