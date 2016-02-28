'use strict';

define(['jquery', 'app/ui/templates', 'app/model/classes', 'app/model/player'], function($, templates, classes, player) {

    var sm;

    function buildScreen() {
        var $canvas = $('#canvas');
        var $panel = $(templates.getTemplate('selectClassTmpl')());

        var allClasses = classes.getClasses();
        for (var i = 0; i < allClasses.length; i++) {
            var characterClass = allClasses[i];

            var $opt = $(templates.getTemplate('actionOptionTmpl')({
                title: characterClass.title,
                description: characterClass.description,
                subDescription: characterClass.subDescription
            }));

            var click = function(characterClass) {
                selectClass(characterClass);
            }.bind(this, characterClass);
            $opt.one('click', click);

            $opt.appendTo($panel);
        }

        $canvas.append($panel);
    }

    function selectClass(characterClass) {

        if (typeof characterClass.name === 'function') {
            player.name = characterClass.name();
        } else {
            player.name = characterClass.name;
        }

        player.salt = characterClass.salt;
        player.money = characterClass.money;
        player.secondsRemaining = characterClass.secondsRemaining;
        player.betaChance = characterClass.betaChance;
        player.characterClassId = characterClass.identifier;
        if (characterClass.items) {
            player.items = characterClass.items;
        }

        sm.enterScreen('battle');
    }

    function enter(screenManager) {
        sm = screenManager;
        buildScreen();
        // FIXME temporary
        //selectClass(classes.getClasses()[0]);
    }

    function exit() {
        $('#canvas').html('');
    }

    return {
        enter: enter,
        exit: exit
    }

});