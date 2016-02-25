'use strict';

define(['app/util/random'], function(random) {

    var classes = [
        {
            identifier: 'default',
            title: 'A typical Blizzard fan',
            description: 'PICK THIS CLASS TO PLAY THE ACTUAL GAME<br/>' +
                'The <strong>Blizzard Fan</strong> has no friends at Blizzard, no connections and no hope at getting into Beta.',
            subDescription: 'Difficulty: Hard',
            name: function() {
                return 'TODO';
            },
            salt: 0,
            money: 40,
            secondsRemaining: 999,
            betaChance: 0
        },
        {
            identifier: 'friend',
            title: 'Your jerk friend who only signed up for beta yesterday',
            description: 'Your friend doesn\'t like Blizzard games. He doesn\'t even own any of the free Blizzard games like Hearthstone or ' +
                'Heroes of the Storm - that\'s how dedicated to not playing Blizzard games he is. He still signed up for ' +
                'the Overwatch beta. I wonder how that will work out for him?',
            subDescription: 'Difficulty: Very Easy',
            name: function() {
                return 'Mike (Loser)'
            },
            salt: 0,
            money: 'Funemployed',
            secondsRemaining: 240,
            betaChance: 1
        }
    ];

    function getClasses() {
        return classes;
    }

    return {
        getClasses: getClasses
    }

});