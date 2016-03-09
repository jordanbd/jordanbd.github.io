'use strict';

define(['jquery', 'underscore', 'app/ui/templates', 'app/model/achievements', 'app/util/browser'], function($, _, templates, achieveDb, browser) {

    var sm;

    function addAchievementsToScreen() {

        var playerAchievementCodes = achieveDb.loadAchievements();
        var achievements = achieveDb.getAllAchievements();

        var $achievements = $('#achievements');

        var totalPoints = 0;
        var achievedPoints = 0;
        for (var code in achievements) {

            var achievement = achieveDb.getAchievement(code);

            var achieved = $.inArray(code, playerAchievementCodes) >= 0;
            totalPoints += achievement.points;
            achievedPoints += achieved ? achievement.points : 0;

            var $achieve = $(templates.getTemplate('achievementTmpl')({
                title: achievement.title,
                points: achievement.points,
                body: achievement.description,
                achievedClass: achieved ? 'achievement-achieved' : ''
            }));

            $achievements.append($achieve);

            $('#points-achieved').text(achievedPoints);
            $('#points-total').text(totalPoints);
        }

    }

    function buildScreen() {
        var $templateHtml = $('#template-home').html();

        // Compile template
        var renderedTemplate = _.template($templateHtml);

        // Bind start button
        $(document).one('click', '#start', function() {
            if (browser.isStorageAvailable('localStorage')) {
                var tutorialDone = window.localStorage.getItem('tutorial-done');
                if (!tutorialDone) {
                    sm.enterScreen('tutorial');
                } else {
                    sm.enterScreen('selectClass');
                }
            } else {
                sm.enterScreen('tutorial');
            }
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