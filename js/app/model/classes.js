'use strict';

define(['app/util/random'], function(random) {

    var classes = [
        {
            identifier: 'default',
            title: 'GOD',
            description: 'The developer',
            subDescription: '',
            name: function() {
                return 'Ben';
            },
            salt: 0,
            money: 9999,
            secondsRemaining: 9999,
            betaChance: 1,
            quests: ['lucio-party'],
            items: ['scrap', 'scrap', 'money-with-salt']
        },
        {
            identifier: 'default',
            title: 'A typical Blizzard fan',
            description: 'The <strong>Blizzard Fan</strong> has no friends at Blizzard, no connections and no hope at getting into Beta.',
            subDescription: 'Difficulty: Hard',
            name: function() {
                return random.randomArray(['BlizzFan84', 'TracerFanBoy63', 'WIN_son', 'TheCavalry', 'BetaPlsBlizz', 'Soldier84', 'LuckTruck']);
            },
            salt: 20,
            money: 40,
            secondsRemaining: 360,
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