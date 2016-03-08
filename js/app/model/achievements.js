'use strict';

define(['app/util/browser', 'app/model/player', 'emitter'], function(browser, player, emitter) {

    var achievements = {
        'soldier76-success': {
            title: 'Soldier: 76 and the robbery',
            description: 'You helped Soldier: 76 regain his eyesight and stop a robbery.',
            points: 20,
            hasAchieved: function() {
                return player.data['soldier76-robbery-achievement'];
            }
        },
        'soldier76-murder': {
            title: 'Soldier: 76 and simple geometry',
            description: 'You accidentally shot Soldier: 76.',
            points: 10,
            hasAchieved: function() {
                return player.data['soldier76-shot-achievement'];
            }
        },
        //'winston': {
        //    title: 'Winston the greedy gorilla',
        //    description: 'Bought too much peanut butter for the magical talking gorilla',
        //    points: 5,
        //    hasAchieved: function() {
        //        return player.data['winston-achievement'];
        //    }
        //},
        //'blizzard-pizza-fail': {
        //    title: 'Serious gate security',
        //    description: 'Tried (and failed) to send the Overwatch CMs pizza',
        //    points: 5,
        //    hasAchieved: function() {
        //        return player.data['blizzard-pizza-fail-achievement'];
        //    }
        //},
        'blizzard-pizza-success': {
            title: 'Identity theft',
            description: 'Successfully got pizza delivered to the Overwatch CMs.',
            points: 10,
            hasAchieved: function() {
                return player.data['blizzard-pizza-success-achievement'];
            }
        },
        //'blizzard-beta-inviter': {
        //    title: 'Beta is back on the menu, boys!',
        //    description: 'Repaired the machine that sends beta invites.',
        //    points: 10,
        //    hasAchieved: function() {
        //        return player.data['blizzard-invite-machine-complete'];
        //    }
        //},
        'spammer-gun': {
            title: 'Perhaps I was a little too aggressive',
            description: 'Stopped the reddit spammer using violence.',
            points: 5,
            hasAchieved: function() {
                return player.data['reddit-spammer-violence-achievement'];
            }
        },
        'spammer-banned': {
            title: '... or see yourself become the villain',
            description: 'Became the salty reddit spammer.',
            points: 5,
            hasAchieved: function() {
                return player.data['self-spammer-banned'];
            }
        },
        'titan': {
            title: 'Project Prometheus',
            description: 'Find the source of Overwatch.',
            points: 10,
            hasAchieved: function() {
                return player.data['virus'];
            }
        }
    };

    /**
     * returns array of new achievement codes raised
     */
    function testForAchievements() {

        var newAchievements = [];
        for (var code in achievements) {

            if (player.hasAchievement(code)) {
                continue;
            }

            var achievement = achievements[code];
            if (achievement.hasAchieved()) {
                if (achievement.apply) {
                    achievement.apply();
                }
                newAchievements.push(code);
            }

        }
        return newAchievements;

    }

    function getAchievement(code) {
        return achievements[code];
    }

    function getAllAchievements() {
        return achievements;
    }

    function loadAchievements() {
        if (browser.isStorageAvailable('localStorage')) {
            console.info('Loading achievements from Local Storage');
            var result = JSON.parse(window.localStorage.getItem('overrpg-achievements'));
            if (result == null) {
                return [];
            } else {
                return result;
            }
        } else {
            console.info('Local Storage not available, achievements have not been fetched from storage.');
            return [];
        }
    }

    function storeAchievements() {
        if (browser.isStorageAvailable('localStorage')) {
            window.localStorage.setItem('overrpg-achievements', JSON.stringify(player.achievements));
            console.info('Stored achievements');
        }
    }

    function gameOverStoreAchievements() {
        var newAchievements = testForAchievements();
        for (var i = 0; i < newAchievements.length; i++) {
            player.achievements.push(newAchievements[i]);
        }
        storeAchievements();
    }

    emitter.on('victory', gameOverStoreAchievements);
    emitter.on('defeat', gameOverStoreAchievements); // fixme dont even use this?

    return {
        loadAchievements: loadAchievements,
        storeAchievements: storeAchievements,
        testForAchievements: testForAchievements,
        getAchievement: getAchievement,
        getAllAchievements: getAllAchievements
    }

});