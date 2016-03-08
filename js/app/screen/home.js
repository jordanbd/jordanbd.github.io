'use strict';

define(['jquery', 'underscore', 'app/ui/templates', 'app/model/achievements'], function($, _, templates, achieveDb) {

    var sm;

    function addAchievementsToScreen() {

        var playerAchievementCodes = achieveDb.loadAchievements();
        var achievements = achieveDb.getAllAchievements();
        var numAchievements = _.size(achievements);
        var halfSize = (numAchievements % 2 == 0) ? numAchievements / 2 : Math.floor((numAchievements / 2) + 1);

        var $leftAchievements = $('#achievements-left');
        var $rightAchievements = $('#achievements-right');

        var $currentAchievementBucket = $leftAchievements;

        var count = 0;
        for (var code in achievements) {

            var achievement = achieveDb.getAchievement(code);

            var $achieve = $(templates.getTemplate('achievementTmpl')({
                title: achievement.title,
                points: achievement.points,
                body: achievement.description,
                achievedClass: $.inArray(code, playerAchievementCodes) >= 0 ? 'achievement-achieved' : ''
            }));

            $currentAchievementBucket.append($achieve);

            count++;
            if (count >= halfSize) {
                $currentAchievementBucket = $rightAchievements;
            }
        }

        // load all possible acheivements
        // split into two
        // load all achievements i've achieved
        // if achieved, yellow

    }

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
        addAchievementsToScreen();
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