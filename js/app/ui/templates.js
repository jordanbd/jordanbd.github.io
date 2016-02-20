'use strict';

define(['jquery', 'underscore'], function($, _) {

    var templates = {
    };

    function compile() {
        console.debug('compiling templates');

        templates['modalTmpl'] = _.template($('#template-modal').html());
        templates['actionsTmpl'] = _.template($('#template-battle-actions').html());
        templates['actionOptionTmpl'] = _.template($('#template-battle-action-option').html());
        templates['timerTmpl'] = _.template($('#template-timer').html());
        templates['characterStatsTmpl'] = _.template($('#template-character-stats').html());
        templates['battleHeaderTmpl'] = _.template($('#template-battle-header').html());
        templates['gameOverTmpl'] = _.template($('#template-gameover').html());
        templates['shopItemTmpl'] = _.template($('#template-battle-action-shop-item').html());
        templates['newsTmpl'] = _.template($('#template-news').html());

        console.debug('templates compiled');
    }

    function getTemplate(name) {
        return templates[name];
    }

    return {
        compile: compile,
        getTemplate: getTemplate
    }

});